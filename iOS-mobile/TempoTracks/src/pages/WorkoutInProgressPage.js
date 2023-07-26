import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import CountdownTimer from "../components/Workouts/CountDownTimer";
import CustomButton from "../components/Button/CustomButton";
import CustomDialog from "../components/Workouts/CustomDialog";

const WorkoutInProgressPage = ({ navigation }) => {
  const countdownDuration = 5;
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [isEndConfirmationVisible, setIsEndConfirmationVisible] =
    useState(false);
  const handleCountdownComplete = () => {
    setTimeout(() => {
      setIsCountingDown(false);
    }, 500);
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
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 12 }}>
          <View>
            <Text>Workout in Progress page</Text>
          </View>
          <View>
            <CustomButton
              handlePress={() => {
                setIsEndConfirmationVisible(true);
              }}
              label="End Workout"
              backgroundColor="#222222"
            />
          </View>
          {isEndConfirmationVisible && (
            <CustomDialog
              visible={isEndConfirmationVisible}
              onCancel={() =>
                setIsEndConfirmationVisible(!isEndConfirmationVisible)
              }
              onConfirm={() => navigation.navigate("Workouts")}
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
