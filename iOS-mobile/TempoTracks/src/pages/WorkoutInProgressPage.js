import React, { useState } from "react";
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

const WorkoutInProgressPage = ({ navigation, route }) => {
  const { workoutId } = route.params;
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
                <CustomButton
                  handlePress={() => {
                    setIsEndConfirmationVisible(true);
                  }}
                  label="Pause Workout"
                  backgroundColor="#09BC8A"
                />
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
