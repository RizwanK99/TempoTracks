import React, { useState, useEffect } from "react";
import { Modal, Portal, Button, PaperProvider, FAB } from 'react-native-paper';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import PageHeading from "../components/Workouts/PageHeading";
import SectionHeading from "../components/Workouts/SectionHeading";
import PressableCardBanner from "../components/Workouts/PressableCardBanner";
import PressableCard from "../components/Workouts/PressableCard";
import { getUsersWorkouts } from "../api/Workouts";
import AsyncStorage from "@react-native-async-storage/async-storage";
const recommendedWorkoutImage = require("../assets/recommended-workout.webp");
const createWorkoutImage = require("../assets/create-workout.png");
const weightLiftingFocusImage = require("../assets/weight-focus-training.webp");
const weightLossFocusImage = require("../assets/weight-loss-focus.png");
const cardioFocusImage = require("../assets/cardio-focus.png");
const bulkingFocusImage = require("../assets/bulking-focus.png");
const workoutProgressImage = require("../assets/workout-trends.png");

async function retrieveData(user, setUser) {
  try {
    const value = await AsyncStorage.getItem("user_data");
    if (value !== null) {
      let userData = JSON.parse(value);
      await setUser(userData);
    }
  } catch (error) {
    console.log("Error retreiving user data", error);
  }
}

const WorkoutsPage = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [workouts, setWorkouts] = useState([]);

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  useEffect(() => {
    async function fetchData() {
      await retrieveData(user, setUser);
      setWorkouts(await getUsersWorkouts(user.user_id, null));
    }
    fetchData();
  }, [user.user_id]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#181a1c" }}>
        <FAB.Group
          style={{ paddingBottom: 3, position: 'absolute' }}
          open={open}
          variant="surface"
          icon={open ? 'lightning-bolt' : 'headphones'}
          label={open ? 'Start A New Workout' : ''}
          actions={[
            {
              icon: 'bookmark',
              label: 'My Workouts',
              onPress: () => navigation.navigate("WorkoutListPage"),
            },
            {
              icon: 'plus',
              label: 'Create New Workout',
              onPress: () => navigation.navigate("CreateWorkout"),
            },
            {
              icon: 'chart-timeline-variant',
              label: 'Workout Trends',
              onPress: () => navigation.navigate("WorkoutTrends"),
            }
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
              navigation.navigate("WorkoutInProgress", { undefined })
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
