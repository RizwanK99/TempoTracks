import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeProvider } from "@emotion/react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Main Screens
import HomePage from "./src/pages/HomePage";
import ProfilePage from "./src/pages/ProfilePage";
import SettingsPage from "./src/pages/SettingsPage";
import WorkoutsPage from "./src/pages/WorkoutsPage";
import SignInPage from "./src/pages/SignInPage";
import LaunchPage from "./src/pages/LaunchPage";
import RegisterPage from "./src/pages/RegisterPage";

// Music Screens
import MusicLibraryPage from "./src/pages/MusicLibraryPage";
import MusicHomePage from "./src/pages/MusicHomePage";
import MusicPage from "./src/pages/MusicPage";

// Workout Screens
import IndividualWorkoutTemplatePage from "./src/pages/IndividualWorkoutTemplatePage";
import StartOrCancelWorkoutPage from "./src/pages/StartOrCancelWorkoutPage";
import CreateWorkoutPage from "./src/pages/CreateWorkoutPage";
import WorkoutInProgressPage from "./src/pages/WorkoutInProgressPage";
import WorkoutTrendsPage from "./src/pages/WorkoutTrendsPage";
import WorkoutHistoryPage from "./src/pages/WorkoutHistoryPage";
import UserPreferenceWorkoutPage from "./src/pages/UserPreferenceWorkoutPage";
import WorkoutListPage from "./src/pages/WorkoutListPage";
import WorkoutEndSummaryPage from "./src/pages/WorkoutEndSummaryPage";
import WorkoutSummaryPage from "./src/pages/WorkoutSummaryPage";

import { supabase } from "./src/lib/supabase";
import { QueryProvider } from "./src/provider/QueryClientProvider";
import { PaperProviderWrapper } from "./src/provider/PaperProvider";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getIsLoggedIn = () => {
  return false;
};

function Root() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        tabBarActiveTintColor: "#74b3ce",
        tabBarInactiveTintColor: "#ffffff",
        tabBarActiveBackgroundColor: "#000000",
        tabBarInactiveBackgroundColor: "#000000",
        tabBarStyle: { borderTopWidth: 0, backgroundColor: "black" },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeStack") {
            iconName = focused ? "home-circle" : "home-circle-outline";
          } else if (route.name === "SettingsStack") {
            iconName = focused
              ? "account-settings"
              : "account-settings-outline";
          } else if (route.name === "MusicStack") {
            iconName = focused ? "music" : "music-note";
          } else if (route.name === "WorkoutsStack") {
            iconName = focused ? "dumbbell" : "dumbbell";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          title: "TempoTracks Home",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MusicStack"
        component={MusicStack}
        options={{
          tabBarLabel: "Music",
          title: "Music",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="WorkoutsStack"
        component={WorkoutsStack}
        options={{
          tabBarLabel: "Workouts",
          title: null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          tabBarLabel: "Settings",
          title: "Setting",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  const isLoggedIn = getIsLoggedIn();

  return (
    <QueryProvider>
      <PaperProviderWrapper>
        <NavigationContainer>
          <Stack.Navigator>
            {isLoggedIn ? (
              <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Root" component={Root} />
              </Stack.Group>
            ) : (
              <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Launch" component={LaunchStack} />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProviderWrapper>
    </QueryProvider>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Profile" component={ProfilePage} />
      <Stack.Screen name="CreateWorkout" component={CreateWorkoutPage} />
      <Stack.Screen name="Workouts" component={WorkoutsPage} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Settings" component={SettingsPage} />
    </Stack.Navigator>
  );
}

function MusicStack() {
  return (
    <Stack.Navigator
      initialRouteName="MusicHomePage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MusicHomePage" component={MusicHomePage} />
      <Stack.Screen name="MusicLibraryPage" component={MusicLibraryPage} />
      <Stack.Screen name="MusicPage" component={MusicPage} />
    </Stack.Navigator>
  );
}

function WorkoutsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Workouts"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Workouts" component={WorkoutsPage} />
      <Stack.Screen name="CreateWorkout" component={CreateWorkoutPage} />
      <Stack.Screen
        name="WorkoutInProgress"
        component={WorkoutInProgressPage}
      />
      <Stack.Screen name="WorkoutTrends" component={WorkoutTrendsPage} />
      <Stack.Screen name="WorkoutHistoryPage" component={WorkoutHistoryPage} />
      <Stack.Screen name="WorkoutListPage" component={WorkoutListPage} />
      <Stack.Screen
        name="UserPreferenceWorkout"
        component={UserPreferenceWorkoutPage}
      />
      <Stack.Screen
        name="WorkoutEndSummary"
        component={WorkoutEndSummaryPage}
      />
      <Stack.Screen
        name="IndividualWorkoutTemplatePage"
        component={IndividualWorkoutTemplatePage}
      />
      <Stack.Screen
        name="StartOrCancelWorkoutPage"
        component={StartOrCancelWorkoutPage}
      />
      <Stack.Screen name="WorkoutSummaryPage" component={WorkoutSummaryPage} />
    </Stack.Navigator>
  );
}

function LaunchStack() {
  return (
    <Stack.Navigator
      initialRouteName="Launch"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Launch" component={LaunchPage} />
      <Stack.Screen name="SignIn" component={SignInPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="Root" component={Root} />
    </Stack.Navigator>
  );
}

export default App;
