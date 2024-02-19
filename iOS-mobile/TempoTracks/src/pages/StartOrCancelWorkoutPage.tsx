import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";
import { useCreateWorkout } from "../api/WorkoutsNew";
import { CountDownTimer } from "../components/Workouts/CountDownTimer";
import { useQuery } from "@tanstack/react-query";

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
        template_id: templateId,
        workout_name: name,
        workout_type: type,
        playlist_id: playlistId,
        status: "IN_PROGRESS",
        is_paused: false,
      });
    }
  }, [isCountingDown]);

  const handleProgressComplete = () => {
    setIsCountingDown(false);
  };

  useEffect(() => {
    if (createdWorkout && !isCountingDown) {
      navigation.navigate("WorkoutInProgress", {
        workoutId: createdWorkout[0].workout_id,
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
