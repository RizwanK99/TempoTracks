import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import CustomBarChart from "../components/Charts/CustomBarChart";
import { AntDesign } from "@expo/vector-icons";
import Highlights from "../components/Workouts/Highlights";
import { useTheme } from "@emotion/react";
import PressableCardBanner from "../components/Workouts/PressableCardBanner";
import SectionHeading from "../components/Workouts/SectionHeading";

const createWorkoutImage = require("../assets/create-workout.png");

const WorkoutTrendsPage = ({ navigation }) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Workouts")}>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 8,
            marginTop: 8,
            alignItems: "center",
          }}
        >
          <>
            <AntDesign name="left" size={20} color="#007AFF" />
            <Text style={{ color: "#007AFF", fontSize: 16 }}>Back</Text>
          </>
        </View>
      </TouchableWithoutFeedback>
      <ScrollView>
        <View style={{ marginTop: 28 }}>
          <SectionHeading title={"Your Workout History"} />
        </View>
        <View style={{ marginTop: 16 }}>
          <PressableCardBanner
            title={"Your Past Workouts"}
            subtitle={
              "View your workout history and trends."
              // workouts.length === 0
              //   ? "Create your perfect workout."
              //   : workouts.length + " created"
            }
            imageUri={createWorkoutImage}
            onPress={() => navigation.navigate("WorkoutHistoryPage")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomBarChart />
        </View>
        <View style={{ backgroundColor: theme.colors.background }}>
          <Highlights />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutTrendsPage;
