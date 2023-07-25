// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from "react";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import HomePage from "./src/pages/HomePage";
// import SettingsPage from "./src/pages/SettingsPage";
// import WorkoutsPage from "./src/pages/WorkoutsPage";
// import MusicPage from "./src/pages/MusicPage";
// import SignInPage from "./src/pages/SignInPage";
// import LaunchPage from "./src/pages/LaunchPage";
// import IndividualWorkoutPage from "./src/pages/IndividualWorkoutPage";
// import CreateWorkoutPage from "./src/pages/CreateWorkoutPage";
import PocPage from "./src/pages/PocPage";

import { NativeModules } from 'react-native'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getIsLoggedIn = () => {
  return true;
};

// function Root() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerStyle: { backgroundColor: "#09BC8A" },
//         headerTintColor: "#fff",
//         headerTitleStyle: { fontWeight: "bold" },
//         tabBarActiveTintColor: "#74b3ce",
//         tabBarInactiveTintColor: "#172a3a",
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
//           if (route.name === "HomeStack") {
//             iconName = focused ? "home-circle" : "home-circle-outline";
//           } else if (route.name === "SettingsStack") {
//             iconName = focused
//               ? "account-settings"
//               : "account-settings-outline";
//           } else if (route.name === "MusicStack") {
//             iconName = focused ? "music" : "music-note";
//           } else if (route.name === "WorkoutsStack") {
//             iconName = focused ? "dumbbell" : "dumbbell";
//           }
//           return (
//             <MaterialCommunityIcons name={iconName} size={size} color={color} />
//           );
//         },
//       })}
//     >
//       <Tab.Screen
//         name="HomeStack"
//         component={HomeStack}
//         options={{
//           tabBarLabel: "Home",
//           title: "TempoTracks Home",
//         }}
//       />
//       <Tab.Screen
//         name="MusicStack"
//         component={MusicStack}
//         options={{
//           tabBarLabel: "Music",
//           title: "Music",
//         }}
//       />
//       <Tab.Screen
//         name="WorkoutsStack"
//         component={WorkoutsStack}
//         options={{
//           tabBarLabel: "Workouts",
//           title: null,
//         }}
//       />
//       <Tab.Screen
//         name="SettingsStack"
//         component={SettingsStack}
//         options={{
//           tabBarLabel: "Settings",
//           title: "Setting",
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

function App() {
  const isLoggedIn = getIsLoggedIn();

  console.log('counter is', NativeModules.Counter)

  return <PocPage/>
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       {isLoggedIn ? (
  //         <Stack.Group screenOptions={{ headerShown: false }}>
  //           <Stack.Screen name="Root" component={Root} />
  //         </Stack.Group>
  //       ) : (
  //         <Stack.Group screenOptions={{ headerShown: false }}>
  //           <Stack.Screen name="Launch" component={LaunchStack} />
  //         </Stack.Group>
  //       )}
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}

// function HomeStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Home"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Home" component={HomePage} />
//     </Stack.Navigator>
//   );
// }

// function SettingsStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Settings"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Settings" component={SettingsPage} />
//     </Stack.Navigator>
//   );
// }

// function MusicStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Music"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Music" component={MusicPage} />
//     </Stack.Navigator>
//   );
// }

// function WorkoutsStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Workouts"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Workouts" component={WorkoutsPage} />
//       <Stack.Screen
//         name="IndividualWorkout"
//         component={IndividualWorkoutPage}
//       />
//       <Stack.Screen name="CreateWorkout" component={CreateWorkoutPage} />
//     </Stack.Navigator>
//   );
// }

// function LaunchStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Launch"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Launch" component={LaunchPage} />
//       <Stack.Screen name="SignIn" component={SignInPage} />
//       <Stack.Screen name="Root" component={Root} />
//     </Stack.Navigator>
//   );
// }

export default App;
