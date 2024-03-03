import React from "react";
import { useAppTheme } from "../provider/PaperProvider";
import { SafeAreaView } from "react-native";
import { Appbar } from "react-native-paper";

const WorkoutTrendsPage = ({ navigation }) => {
  const theme = useAppTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header
        mode="small"
        statusBarHeight={0}
        elevated
        style={{ backgroundColor: theme.colors.background }}
      >
        <Appbar.BackAction
          onPress={() => navigation.navigate("WorkoutListPage")}
        />
        <Appbar.Content title="Workout Trends" />
      </Appbar.Header>
    </SafeAreaView>
  );
};

export default WorkoutTrendsPage;
