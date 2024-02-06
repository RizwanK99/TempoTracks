import { WorkoutData } from "./types";
import {
  startWorkout,
  endWorkout,
  clearWorkoutData,
} from "./asyncStorageHelpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WorkoutData from "./types";

const startWorkout = async (workoutId: string) => {
  const startTimestamp = new Date();
  const data: WorkoutData = {
    workoutId,
    workoutStart: startTimestamp,
    workoutEnd: null,
  };

  await AsyncStorage.setItem(workoutId, JSON.stringify(data));
};

const endWorkout = async (workoutId: string) => {
  const endTimestamp = new Date();
  const existingData = await AsyncStorage.getItem(workoutId);

  if (existingData) {
    const data: WorkoutData = JSON.parse(existingData);
    workoutData.workoutEnd = endTimestamp;
    await AsyncStorage.mergeItem(workoutId, JSON.stringify(workoutData));

    return workoutData;
  } else {
    throw new Error(`Workout with ID ${workoutId} not found.`);
  }
};

const clearWorkoutData = async (workoutId: string) => {
  await AsyncStorage.removeItem(workoutId);
};

export { startWorkout, endWorkout, clearWorkoutData };
