import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";
import { useCreateWorkout } from "../api/WorkoutsNew";
import { CountDownTimer } from "../components/Workouts/CountDownTimer";
import { useQuery } from "@tanstack/react-query";

// Watch Manager
import { WatchManager } from "../module/WatchManager";

const StartOrCancelWorkoutPage = ({ route, navigation }) => {
  const theme = useTheme();
  const { templateId, name, type, playlistId } = route.params;
  const { mutate: createWorkout } = useCreateWorkout();
  const [starting, setStarting] = useState<boolean>(false);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(true);
  const [workout, setWorkout] = useState(null);
  const {
    status,
    data: createdWorkout,
    error,
  } = useQuery({
    queryKey: ["createdWorkout", { id: templateId }],
  });

  const handleIconPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (!isCountingDown) {
      createWorkout({
        // change this once we make hook for auth
        // user_id: 1,
        template_id: templateId,
        workout_name: name,
        workout_type: type,
        playlist_id: playlistId,
        status: "IN_PROGRESS",
        is_paused: false,
        total_duration: 0,
      });
    }
  }, [isCountingDown]);

  const handleProgressComplete = () => {
    setIsCountingDown(false);
  };

  useEffect(() => {
    if (createdWorkout && !isCountingDown) {
      //WatchManager.updateWorkoutId(createdWorkout[0].workout_id, createdWorkout[0].template_id);

      navigation.navigate("WorkoutInProgress", {
        workoutId: createdWorkout[0].workout_id,
        playlistId: createdWorkout[0].playlist_id,
        templateId: createdWorkout[0].template_id,
      });
    }
  }, [createdWorkout]);

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
      {isCountingDown ? (
        <CountDownTimer
          handleIconPress={() => handleIconPress()}
          handleProgressComplete={() => handleProgressComplete()}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default StartOrCancelWorkoutPage;
