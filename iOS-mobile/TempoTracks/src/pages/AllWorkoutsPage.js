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
import { WorkoutObject } from "../components/Workouts/WorkoutObject";
import { getUsersWorkouts } from "../api/Workouts";
import { useEffect, useState } from "react";

const AllWorkoutsPage = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]);
  // const [exercise, setExercise] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setWorkouts(await getUsersWorkouts(2));
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, padding: 16 }}>
          <View>
            <PageHeading title={"All Your Workouts"} />
          </View>

          <View style={{ flex: 1 }}>
            <ScrollView horizontal={false} style={styles.box}>
              {workouts?.userWorkouts?.map(
                w =>
                  <View
                    key={w.workout_id}
                    style={{
                      alignItems: "center",
                      width: "100%",
                      height: "auto",
                      paddingTop: 8,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "rgba(230,230,230,1)",
                        borderRadius: 15,
                        padding: 15,
                        width: "95%",
                        height: "95%",
                      }}
                    >
                      <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                        {w.workout_name}
                      </Text>
                      <Text>{"Duration: " + w.time_duration + " min"}</Text>
                      <Text>{"Calories: " + w.total_energy_burned + " cal"}</Text>
                    </View>
                  </View>
              )}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  box: {
    backgroundColor: "rgba(213,218,223,1)",
    borderRadius: 10,
    width: "95%",
    height: "100%",
    alignSelf: "center",
  },
});
export default AllWorkoutsPage;
