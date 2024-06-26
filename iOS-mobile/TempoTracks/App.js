import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";
import { ToastProvider } from "react-native-toast-notifications";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

// Main Screens
import HomePage from "./src/pages/HomePage";
import ProfilePage from "./src/pages/ProfilePage";
import SettingsPage from "./src/pages/SettingsPage";
import SignInPage from "./src/pages/SignInPage";
import LaunchPage from "./src/pages/LaunchPage";
import RegisterPage from "./src/pages/RegisterPage";

// Music Screens
import { MusicPage } from "./src/pages/MusicPage";

// Workout Screens
import IndividualWorkoutTemplatePage from "./src/pages/IndividualWorkoutTemplatePage";
import StartOrCancelWorkoutPage from "./src/pages/StartOrCancelWorkoutPage";
import CreateWorkoutPage from "./src/pages/CreateWorkoutPage";
import WorkoutInProgressPage from "./src/pages/WorkoutInProgressPage";
import WorkoutHistoryPage from "./src/pages/WorkoutHistoryPage";
import WorkoutListPage from "./src/pages/WorkoutListPage";
import CompletedWorkoutSummaryPage from "./src/pages/CompletedWorkoutSummaryPage";
import WorkoutSummaryPage from "./src/pages/WorkoutSummaryPage";
import WorkoutTrendsPage from "./src/pages/WorkoutTrendsPage";

import { supabase } from "./src/lib/supabase";
import { QueryProvider } from "./src/provider/QueryClientProvider";
import { PaperProviderWrapper } from "./src/provider/PaperProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PlaylistView } from "./src/components/Music/Playlist/PlaylistView";
import { useCreateWorkout } from "./src/api/WorkoutsNew";

//Watch Manager
import {
  IS_WATCH_ENABLED,
  WatchManager,
  EventListener,
} from "./src/module/WatchManager";
import { saved_user_data } from "./src/api/Globals";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getIsLoggedIn = () => {
  return false;
};

function Root() {
  if (IS_WATCH_ENABLED) {
    const navigation = useNavigation();
    const [eventData, setEventData] = useState(null);
    const { mutateAsync: createWorkout } = useCreateWorkout();

    useEffect(() => {
      const unsubscribe = EventListener.subscribe("createWorkout", (data) => {
        setEventData(data);
      });

      return unsubscribe;
    }, []);

    useEffect(() => {
      if (!eventData) return;

      let workout = "";

      try {
        workout = JSON.parse(eventData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }

      const startWorkout = async (workout) => {
        let createdWorkout = await createWorkout({
          // change this once we make hook for auth
          user_id: saved_user_data.user_id,
          template_id: workout.id,
          workout_name: workout.name,
          workout_type: workout.type,
          playlist_id: workout.playlist_id,
          status: "IN_PROGRESS",
          is_paused: false,
          total_duration: 0,
        });

        print(createdWorkout[0]);

        WatchManager.updateWorkoutId(
          createdWorkout[0].workout_id,
          createdWorkout[0].template_id
        );

        navigation.navigate("WorkoutsStack", {
          screen: "WorkoutInProgress",
          params: {
            workoutId: createdWorkout[0].workout_id,
          },
        });
      };

      startWorkout(workout);

      setEventData(null);
    }, [eventData]);
  }

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
            iconName = "home";
          } else if (route.name === "SettingsStack") {
            iconName = "cog";
          } else if (route.name === "MusicStack") {
            iconName = "headphones";
          } else if (route.name === "WorkoutsStack") {
            iconName = "dumbbell";
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
  // I see the issue just not sure scope of fix, seems to be fine
  LogBox.ignoreLogs([
    "Found screens with the same name nested",
    "@supabase/gotrue-js",
    "No storage option exists to persist",
  ]);
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
        <ToastProvider
          successIcon={<AntDesign name="checkcircle" size={18} color="white" />}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
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
          </GestureHandlerRootView>
        </ToastProvider>
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
      initialRouteName="MusicPage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MusicPage" component={MusicPage} />
      <Stack.Screen name="PlaylistViewPage" component={PlaylistView} />
    </Stack.Navigator>
  );
}

function WorkoutsStack() {
  return (
    <Stack.Navigator
      initialRouteName="WorkoutListPage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CreateWorkout" component={CreateWorkoutPage} />
      <Stack.Screen
        name="WorkoutInProgress"
        component={WorkoutInProgressPage}
      />
      <Stack.Screen name="WorkoutHistoryPage" component={WorkoutHistoryPage} />
      <Stack.Screen name="WorkoutListPage" component={WorkoutListPage} />
      <Stack.Screen
        name="CompletedWorkoutSummary"
        component={CompletedWorkoutSummaryPage}
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
      <Stack.Screen name="WorkoutTrendsPage" component={WorkoutTrendsPage} />
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
