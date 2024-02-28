import { GestureHandlerRootView } from "react-native-gesture-handler";

export const GestureHandlerProvider = ({ children }) => {
  return <GestureHandlerRootView>{children}</GestureHandlerRootView>;
};
