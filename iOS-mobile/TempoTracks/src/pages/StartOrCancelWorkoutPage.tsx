import React from "react";
import { SafeAreaView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useCreateWorkout } from "../api/WorkoutsNew";
import { CountDownTimer } from "../components/Workouts/CountDownTimer";

// Watch Manager
import { WatchManager } from "../module/WatchManager";
import { useGetWorkoutTemplateById } from "../api/WorkoutTemplate";
import { calculateSongQueue } from "../utils/calculateSongQueue";
import { useSetAsyncStorageItem } from "../api/AsyncStorage";
import { useSongs } from "../api/Music";
import { MusicManager } from "../module/MusicManager";

const StartOrCancelWorkoutPage = ({ route, navigation }) => {
  const theme = useTheme();

  const { templateId } = route.params;
  const { mutateAsync: createWorkout } = useCreateWorkout();
  const { data: template, isPending } = useGetWorkoutTemplateById(templateId);
  // const { data: songs } = useSongs();
  const { mutateAsync: saveSongQueueToStorage } =
    useSetAsyncStorageItem("music_queue");

  if (isPending || !template) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: theme.colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const handleIconPress = () => {
    navigation.goBack();
  };

  const handleProgressComplete = async () => {
    console.log("Progress complete!");
    const createdWorkout = await createWorkout({
      // change this once we make hook for auth
      user_id: "c51056f2-c58f-4994-99e0-32c36ef3758b",
      template_id: templateId,
      workout_name: template.name,
      workout_type: template.type,
      playlist_id: template.playlist_id,
      status: "IN_PROGRESS",
      is_paused: false,
      total_duration: 0,
    });

    if (!createdWorkout) {
      console.log("Error creating workout!");
      return;
    }

    // Create the song queue for the workout
    console.log(
      "Songs before queue",
      template.playlists?.songs?.map((s) => s.title),
      template.workout_intervals
    );

    const songQueue = calculateSongQueue({
      intervals: template.workout_intervals,
      numberOfSets: template.num_sets,
      songs: template.playlists?.songs ?? [],
    });

    console.log(
      "songQueue",
      songQueue.map((s) => s.title)
    );
    await saveSongQueueToStorage(songQueue);

    // add songs to the queue and play
    await MusicManager.addSongsToQueue(songQueue.map((s) => s.apple_music_id));
    await MusicManager.play();

    console.log(
      "interval length vs queue length",
      template.expected_duration,
      songQueue.reduce(
        (acc, cur) => acc + Math.round(cur.duration_ms / 1000),
        0
      )
    );

    WatchManager.updateWorkoutId(
      createdWorkout.workout_id,
      createdWorkout.template_id
    );

    navigation.navigate("WorkoutInProgress", {
      workoutId: createdWorkout.workout_id,
      playlistId: createdWorkout.playlist_id,
      templateId: createdWorkout.template_id,
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 24,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CountDownTimer
        handleIconPress={() => handleIconPress()}
        handleProgressComplete={() => handleProgressComplete()}
      />
    </SafeAreaView>
  );
};

export default StartOrCancelWorkoutPage;
