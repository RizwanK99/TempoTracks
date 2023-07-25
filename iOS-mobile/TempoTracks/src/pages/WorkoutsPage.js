import * as React from "react";
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

const WorkoutsPage = ({ navigation }) => {
  const recommendedWorkoutImage = require("../assets/recommended-workout.webp");
  const createWorkoutImage = require("../assets/create-workout.png");
  const weightLiftingFocusImage = require("../assets/weight-focus-training.webp");
  const weightLossFocusImage = require("../assets/weight-loss-focus.png");
  const cardioFocusImage = require("../assets/cardio-focus.png");
  const bulkingFocusImage = require("../assets/bulking-focus.png");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, padding: 16 }}>
          <View>
            <PageHeading title={"Workouts"} />
          </View>
          <View style={{ marginTop: 24 }}>
            <SectionHeading title={"Quick Starter"} />
          </View>
          <View style={{ marginTop: 16 }}>
            <PressableCardBanner
              title={"Try a new workout"}
              subtitle={"Based on your preferences."}
              imageUri={recommendedWorkoutImage}
              onPress={() => navigation.navigate("IndividualWorkout")}
            />
          </View>
          <View style={{ marginTop: 28 }}>
            <SectionHeading title={"Custom Made"} />
          </View>
          <View style={{ marginTop: 16 }}>
            <PressableCardBanner
              title={"Designed By You"}
              subtitle={"Create your perfect workout."}
              imageUri={createWorkoutImage}
              onPress={() => navigation.navigate("CreateWorkout")}
            />
          </View>
          <View style={{ marginTop: 28 }}>
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
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity style={styles.button}>
              <Text style={{ fontWeight: "bold" }}>All Workouts</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    width: 350,
    marginTop: 16,
    borderRadius: 8,
  },
});
export default WorkoutsPage;
