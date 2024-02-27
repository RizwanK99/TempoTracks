import { NativeModules } from "react-native";

export const HealthManager = {
  requestAuthorization: () => {
    return NativeModules.HealthManager.requestAuthorization();
  },
  testFunction: () => {
    return NativeModules.HealthManager.testFunction();
  },
};
