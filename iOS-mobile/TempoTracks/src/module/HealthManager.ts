import { NativeModules } from "react-native";

export const HealthManager = {
  requestAuthorization: () => {
    return NativeModules.HealthManager.requestAuthorization();
  },
  getWorkoutData: (timeFrame: string) => {
    let validTimeFrames = ["Day", "Week", "Month", "Year"];
    if (!validTimeFrames.includes(timeFrame)) {
      throw new Error("Invalid time frame");
    } else {
      return NativeModules.HealthManager.getWorkoutData(timeFrame);
    }
  },
};
