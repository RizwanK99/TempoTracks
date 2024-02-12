import React, { useState, useEffect } from "react";
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
  useEffect(() => {
    async function fetchData() {
      await retrieveData(user, setUser);
      setWorkouts(await getUsersWorkouts(user.user_id, null));
    }
    fetchData();
  }, [user.user_id]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView>
        {/* QUICK STARTER */}
        <View style={{ flex: 1, padding: 16 }}>
          <View>
            <PageHeading title={"Workouts"} />
          </View>
          <View style={{ marginTop: 24 }}>
            <SectionHeading title={"Start A Workout"} />
          </View>
          <View style={{ marginTop: 16 }}>
            <PressableCardBanner
              title={"Let's Go!"}
              subtitle={"Select from your custom list of workouts."}
              imageUri={recommendedWorkoutImage}
              onPress={() => navigation.navigate("WorkoutInProgress", { undefined })}
            />
          </View>
          {/* CREATE WORKOUT */}
          <View style={{ marginTop: 28 }}>
            <SectionHeading title={"Custom Made"} />
          </View>
          <View style={{ marginTop: 16 }}>
            <PressableCardBanner
              title={"Create A Workout"}
              subtitle={
                "Create your perfect workout."
                // workouts.length === 0
                //   ? "Create your perfect workout."
                //   : workouts.length + " created"
              }
              imageUri={createWorkoutImage}
              onPress={() => navigation.navigate("CreateWorkout")}
            />
          </View>
          <View style={{ marginTop: 16 }}>
            <PressableCardBanner
              title={"View Your Creations"}
              subtitle={
                "Edit or view you previously created workouts."
                // workouts.length === 0
                //   ? "Create your perfect workout."
                //   : workouts.length + " created"
              }
              imageUri={createWorkoutImage}
              onPress={() => navigation.navigate("WorkoutListPage")}
            />
          </View>

          {/* WORKOUT HISTORY */}
          <View style={{ marginTop: 28 }}>
            <SectionHeading title={"Progress"} />
          </View>
          <View style={{ marginTop: 16 }}>
            <PressableCardBanner
              title={"Track Your Progress"}
              subtitle={"View your workout history."}
              imageUri={workoutProgressImage}
              onPress={() => navigation.navigate("WorkoutTrends")}
            />
          </View>
          {/* FOCUS */}
          {/* <View style={{ marginTop: 28 }}>
            <SectionHeading title={"Focus"} />
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                marginTop: 16,
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <PressableCard
                title={"Cardio Training"}
                imageUrl={cardioFocusImage}
              />
              <PressableCard
                title={"Weight Lifting"}
                imageUrl={weightLiftingFocusImage}
              />
            </View>
            <View
              style={{
                marginTop: 16,
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <PressableCard
                title={"Weight Loss"}
                imageUrl={weightLossFocusImage}
              />
              <PressableCard title={"Bulking"} imageUrl={bulkingFocusImage} />
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AllWorkouts")}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>All Workouts</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
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
