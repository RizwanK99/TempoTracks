import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useTheme, IconButton } from "react-native-paper";
import { Button as PaperButton } from "react-native-paper";
import {
  usePauseWorkout,
  useResumeWorkout,
  useEndWorkout,
} from "../api/WorkoutsNew.ts";

const WorkoutInProgressPage = ({ navigation, route }) => {
  const theme = useTheme();
  const { workoutId } = route.params;
  const { mutate: pauseWorkout } = usePauseWorkout();
  const { mutate: resumeWorkout } = useResumeWorkout();
  const { mutate: endWorkout } = useEndWorkout();
  const [paused, setPaused] = useState<boolean>(false);
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
              endWorkout(workoutId);
              navigation.navigate("WorkoutSummaryPage", {
                workoutId: workoutId,
              });
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
