import React from "react";
import { SafeAreaView, Text } from "react-native";
import { useTheme } from "react-native-paper";

const WorkoutInProgressPage = ({ navigation, route }) => {
  const theme = useTheme();
  const { workoutId } = route.params;
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
      <Text style={{ color: theme.colors.primary, fontSize: 28 }}>
        {workoutId}
      </Text>
    </SafeAreaView>
  );
};

export default WorkoutInProgressPage;
