import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

import { Appbar, SegmentedButtons } from 'react-native-paper';
import CustomBarChart from "../components/Charts/CustomBarChart";
import { AntDesign } from "@expo/vector-icons";
import Highlights from "../components/Workouts/Highlights";
import { useTheme } from "@emotion/react";
import PressableCardBanner from "../components/Workouts/PressableCardBanner";
import SectionHeading from "../components/Workouts/SectionHeading";

const createWorkoutImage = require("../assets/create-workout.png");

const WorkoutTrendsPage = ({ navigation }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState('');
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
      <Appbar.Header mode="small" statusBarHeight={0} elevated="true" style={{ backgroundColor: theme.colors.background}}>
        <Appbar.BackAction onPress={() => navigation.navigate("Workouts")} />
        <Appbar.Content title="Trends" />
        <Appbar.Action icon="history" onPress={() => navigation.navigate("WorkoutHistoryPage")} />
      </Appbar.Header>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <CustomBarChart />
        </View>
        <View style={{ backgroundColor: theme.colors.background }}>
          <Highlights />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutTrendsPage;
