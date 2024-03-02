import { NativeModules } from "react-native";

export const HealthManager = {
  requestAuthorization: () => {
    return NativeModules.HealthManager.requestAuthorization();
  },
  getWorkoutData: (timeFrame: String) => {
    return NativeModules.HealthManager.getWorkoutData(timeFrame);
  },
};
