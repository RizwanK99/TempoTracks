import React from "react";
import { SafeAreaView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useCreateWorkout } from "../api/WorkoutsNew";
import { CountDownTimer } from "../components/Workouts/CountDownTimer";

// Watch Manager
import { useGetWorkoutTemplateById } from "../api/WorkoutTemplate";
import { calculateSongQueue } from "../utils/calculateSongQueue";
import { useSetAsyncStorageItem } from "../api/AsyncStorage";
import { useSongs } from "../api/Music";
import { MusicManager } from "../module/MusicManager";
import { mapBpmToPlaybackRate } from "../utils/formatWorkoutIntervals";
import { useQuery } from "@tanstack/react-query";
import { saved_user_data } from "../api/Globals";
// Watch Manager
import { IS_WATCH_ENABLED, WatchManager } from "../module/WatchManager";

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
      user_id: saved_user_data.user_id,
      template_id: templateId,
      workout_name: template.name,
      workout_type: template.type,
      playlist_id: template.playlist_id,
      status: "IN_PROGRESS",
      is_paused: false,
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

    // add songs to the queue and play
    try {
      const songQueue = calculateSongQueue({
        intervals: template.workout_intervals,
        numberOfSets: template.num_sets,
        songs: template.playlists?.songs ?? [],
      });

      await saveSongQueueToStorage(songQueue);
      if (IS_WATCH_ENABLED) {
        await MusicManager.addSongsToQueue(
          songQueue.map((s) => s.apple_music_id)
        );
        await MusicManager.play();

        WatchManager.updateWorkoutId(
          createdWorkout.workout_id,
          createdWorkout.template_id
        );
      }
    } catch (e) {
      console.log("Error adding songs to queue", e);
    }

    console.log("Navigating to workout in progress");

    setTimeout(() => {
      // set playback rate
      if (template.workout_intervals.length > 0) {
        const interval = template.workout_intervals[0];
        MusicManager.changePlaybackRate(
          mapBpmToPlaybackRate(
            Math.round(
              (interval.workout_intensities.bpm_lower_threshold +
                interval.workout_intensities.bpm_upper_threshold) /
                2
            ),
            false
          )
        );
      }
    }, 1000);

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
