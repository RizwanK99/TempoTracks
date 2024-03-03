import { NativeModules } from "react-native";

export const HealthManager = {
  requestAuthorization: () => {
    return NativeModules.HealthManager.requestAuthorization();
  },
  getWorkoutData: (timeFrame: "Day" | "Week" | "Month" | "Year") => {
    return NativeModules.HealthManager.getWorkoutData(timeFrame);
  },
};
