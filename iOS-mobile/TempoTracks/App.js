// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';

import
 MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import WorkoutsPage from './pages/WorkoutsPage';
import MusicPage from './pages/MusicPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}
        >
        <Stack.Screen
          name="Home"
          component={HomePage} />
        <Stack.Screen
          name="Workouts"
          component={WorkoutsPage} />
      </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Settings"
        component={SettingsPage} />
      <Stack.Screen
        name="Music"
        component={MusicPage} />
    </Stack.Navigator>
  );
}

function MusicStack() {
  return (
    <Stack.Navigator
      initialRouteName="Music"
      screenOptions={{headerShown: false}}>
          <Stack.Screen
          name="Music"
          component={MusicPage} />
    </Stack.Navigator>
  );
}

function WorkoutsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Workouts"
      screenOptions={{headerShown: false}}>
          <Stack.Screen
          name="Workouts"
          component={WorkoutsPage} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Feed"
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: '#09BC8A' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarActiveTintColor: '#74b3ce',
          tabBarInactiveTintColor: '#172a3a',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeStack') {
              iconName = focused
                ? 'home-circle'
                : 'home-circle-outline';
            } else if (route.name === 'SettingsStack') {
              iconName = focused
                ? 'account-settings'
                : 'account-settings-outline';
            } else if (route.name === 'MusicStack') {
              iconName = focused ? 'music' : 'music-note';
            } else if (route.name === 'WorkoutsStack') {
              iconName = focused ? 'dumbbell' : 'dumbbell';
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        })}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            title: 'Home',
          }}  />
        <Tab.Screen
          name="MusicStack"
          component={MusicStack}
          options={{
            tabBarLabel: 'Music',
            title: 'Music'
          }} />
          <Tab.Screen
          name="WorkoutsStack"
          component={WorkoutsStack}
          options={{
            tabBarLabel: 'Workouts',
            title: 'Workouts'
          }} />
              <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            tabBarLabel: 'Settings',
            title: 'Setting'
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;