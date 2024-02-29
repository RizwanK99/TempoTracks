import React from "react";
import { FAB } from "react-native-paper";
import { StyleSheet, SafeAreaView } from "react-native";

const WorkoutsPage = ({ navigation }) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#181a1c" }}>
      <FAB.Group
        visible
        style={{ paddingBottom: 3, position: "absolute" }}
        open={open}
        variant="surface"
        icon={open ? "timer" : "headphones"}
        label={open ? "Start A New Workout" : ""}
        actions={[
          {
            icon: "bookmark",
            label: "My Workouts",
            onPress: () => navigation.navigate("WorkoutListPage"),
          },
          {
            icon: "plus",
            label: "Create New Workout",
            onPress: () => navigation.navigate("CreateWorkout"),
          },
          {
            icon: "chart-timeline-variant",
            label: "Workout Trends",
            onPress: () => navigation.navigate("WorkoutTrends"),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
            navigation.navigate("WorkoutInProgress", { undefined });
          }
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#09BC8A",
    padding: 10,
    width: 350,
    height: 40,
    marginTop: 16,
    borderRadius: 8,
  },
});
export default WorkoutsPage;
