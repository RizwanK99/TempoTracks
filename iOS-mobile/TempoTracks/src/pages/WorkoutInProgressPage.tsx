import React, { useState, useMemo } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useTheme, IconButton } from "react-native-paper";
import { Button as PaperButton } from "react-native-paper";
import {
  usePauseWorkout,
  useResumeWorkout,
  useEndWorkout,
} from "../api/WorkoutsNew.ts";
import { useStopwatch } from "react-timer-hook";

interface TimeProps {
  value: string;
  unit: string;
  showColon?: boolean;
}

const Time: React.FC<TimeProps> = ({ value, unit, showColon = true }) => {
  const theme = useTheme();
  return (
    <Text style={{ color: theme.colors.primary, fontSize: 52 }} key={unit}>
      {showColon && ":"}
      {value < 10 ? `0${value}` : value}
    </Text>
  );
};

const WorkoutInProgressPage = ({ navigation, route }) => {
  const theme = useTheme();
  const { workoutId } = route.params;
  const { mutate: pauseWorkout } = usePauseWorkout();
  const { mutate: resumeWorkout } = useResumeWorkout();
  const { mutate: endWorkout } = useEndWorkout();
  const [paused, setPaused] = useState<boolean>(false);
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  // Needed since calling reset after mutation
  const duration = useMemo(() => {
    return totalSeconds;
  }, [totalSeconds]);

  const handleWorkoutEnd = () => {
    endWorkout({ workoutId, duration });
    reset();
    navigation.navigate("WorkoutSummaryPage", {
      workoutId: workoutId,
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 24,
        gap: 8,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: theme.colors.text, fontSize: 24 }}>Total Time</Text>
      <View
        style={{
          flexDirection: "row",
          padding: 8,
          alignSelf: "center",
        }}
      >
        <Time unit="hours" value={hours} showColon={false} />
        <Time unit="minutes" value={minutes} />
        <Time unit="seconds" value={seconds} />
      </View>
      <View style={{ flexDirection: "row", gap: 32 }}>
        <View
          style={{
            flexDirection: "column",
            width: "28%",
            alignItems: "center",
            gap: 8,
          }}
        >
          <PaperButton
            style={{
              borderRadius: 24,
              width: "100%",
              height: 48,
              backgroundColor: theme.colors.redPrimaryForeground,
              opacity: 0.8,
              border: "none",
            }}
            textColor={theme.colors.redPrimary}
            labelStyle={{
              fontSize: 36,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              marginLeft: 4,
              marginTop: 24,
            }}
            contentStyle={{ color: theme.colors.text }}
            icon="stop"
            onPress={() => {
              handleWorkoutEnd();
            }}
          />
          <Text style={{ color: theme.colors.text, fontSize: 22 }}>Stop</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            width: "28%",
            alignItems: "center",
            gap: 8,
          }}
        >
          {!paused ? (
            <>
              <PaperButton
                style={{
                  borderRadius: 24,
                  width: "100%",
                  height: 48,
                  backgroundColor: theme.colors.primaryForeground,
                  border: "none",
                }}
                textColor={theme.colors.primary}
                labelStyle={{
                  fontSize: 36,
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  marginLeft: 4,
                  marginTop: 24,
                }}
                contentStyle={{ color: theme.colors.text }}
                icon="pause"
                onPress={() => {
                  pauseWorkout(workoutId);
                  pause();
                  setPaused(true);
                }}
              />
              <Text style={{ color: theme.colors.text, fontSize: 22 }}>
                Pause
              </Text>
            </>
          ) : (
            <>
              <PaperButton
                style={{
                  borderRadius: 24,
                  width: "100%",
                  height: 48,
                  backgroundColor: theme.colors.primaryForeground,
                  border: "none",
                }}
                textColor={theme.colors.primary}
                labelStyle={{
                  fontSize: 36,
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  marginLeft: 4,
                  marginTop: 24,
                }}
                contentStyle={{ color: theme.colors.text }}
                icon="play"
                onPress={() => {
                  resumeWorkout(workoutId);
                  start();
                  setPaused(false);
                }}
              />
              <Text style={{ color: theme.colors.text, fontSize: 22 }}>
                Resume
              </Text>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutInProgressPage;
