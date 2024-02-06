import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import CountdownTimer from "../components/Workouts/CountDownTimer";
import CustomButton from "../components/Button/CustomButton";
import CustomDialog from "../components/Workouts/CustomDialog";
import PageHeading from "../components/Workouts/PageHeading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  updateWorkoutStart,
  updateWorkoutEnd,
  pauseWorkout,
  unpauseWorkout,
  getWorkoutById,
} from "../api/Workouts";
import useTimingEngine from "../hooks/useTimingEngine.ts";

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

const WorkoutInProgressPage = ({ navigation, route }) => {
  const { workoutId } = route.params;
  const countdownDuration = 5;

  const { startTimer, stopTimer } = useTimingEngine();
  const [user, setUser] = useState({});
  const [workoutEnded, setWorkoutEnded] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [isEndConfirmationVisible, setIsEndConfirmationVisible] =
    useState(false);
  const [paused, setPaused] = useState(false);

  const startTime = new Date();

  const handleCountdownComplete = () => {
    setTimeout(() => {
      setIsCountingDown(false);
    }, 500);
  };

  useEffect(() => {
    async function postWorkoutStart() {
      await updateWorkoutStart(workoutId, startTime);
    }
    postWorkoutStart();
    startTimer();
  }, []);

  const handleWorkoutEnd = async () => {
    stopTimer();
    await updateWorkoutEnd(workoutId);
    navigation.navigate("Workouts");
  };

  const handlePauseWorkout = async () => {
    setPaused(true);
    stopTimer();
    await pauseWorkout(workoutId);
  };

  const handleUnpauseWorkout = async () => {
    setPaused(false);
    stopTimer();
    await unpauseWorkout(workoutId);
  };

  return (
    <>
      {isCountingDown ? (
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              flex: 1,
              marginTop: 16,
              marginBottom: 2,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 32 }}>
              Starting Workout
            </Text>
          </View>
          <View>
            <CountdownTimer
              duration={countdownDuration}
              onComplete={handleCountdownComplete}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 14,
              marginBottom: 14,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Workouts");
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "#FFF",
                    paddingHorizontal: 38,
                  }}
                >
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={{ flex: 1, paddingHorizontal: 12, backgroundColor: "black" }}
        >
          <View style={{ padding: 16 }}>
            <PageHeading title="Workout In Progress" />
          </View>
          <ScrollView>
            <View style={{ marginTop: 10 }}>
              {/* Most cancer routing to get this id, fix in future */}
              <Text style={{ color: "white" }}>
                {"Workout ID: " + workoutId}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingHorizontal: 16,
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "45%" }}>
                {!paused && (
                  <CustomButton
                    handlePress={() => {
                      handlePauseWorkout();
                    }}
                    label="Pause Workout"
                    backgroundColor="#09BC8A"
                  />
                )}
                {paused && (
                  <CustomButton
                    handlePress={() => {
                      handleUnpauseWorkout();
                    }}
                    label="Resume Workout"
                    backgroundColor="#09BC8A"
                  />
                )}
              </View>
              <View style={{ width: "45%" }}>
                <CustomButton
                  handlePress={() => {
                    setIsEndConfirmationVisible(true);
                  }}
                  label="End Workout"
                  backgroundColor="#09BC8A"
                />
              </View>
            </View>
          </ScrollView>
          {isEndConfirmationVisible && (
            <CustomDialog
              visible={isEndConfirmationVisible}
              onCancel={() =>
                setIsEndConfirmationVisible(!isEndConfirmationVisible)
              }
              // TODO: Call update workout to set the end time
              onConfirm={handleWorkoutEnd}
              dialogTitle={"Confirm Workout End"}
              dialogMessage={"Are you sure you want to end your workout?"}
            />
          )}
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    border: "2px solid #222222",
    backgroundColor: "#222222",
    width: "100%",
    height: 60,
    alignitems: "flex-end",
  },
});

export default WorkoutInProgressPage;
