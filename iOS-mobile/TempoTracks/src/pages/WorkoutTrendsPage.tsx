import React from "react";
import { useAppTheme } from "../provider/PaperProvider";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Divider,
  Text,
  DataTable,
} from "react-native-paper";
import { useGetCompletedWorkouts } from "../api/WorkoutsNew";
import { saved_user_data } from "../api/Globals";
import { Tables } from "../lib/db.types";

interface Stats {
  type: string;
  averageDuration: number;
  averageDistance: number;
  averageCalories: number;
  totalCount: number;
}

function calculateStats(
  workouts: Tables<"workouts">[] | undefined | null
): Stats[] {
  if (!workouts) {
    return [];
  }
  const statsMap: Map<
    string,
    {
      totalDuration: number;
      totalCalories: number;
      totalDistance: number;
      count: number;
    }
  > = new Map();

  for (const workout of workouts) {
    const {
      workout_type,
      total_duration,
      total_energy_burned,
      total_distance,
    } = workout;
    if (!statsMap.has(workout_type)) {
      statsMap.set(workout_type, {
        totalDuration: 0,
        totalCalories: 0,
        totalDistance: 0,
        count: 0,
      });
    }
    const currentStats = statsMap.get(workout_type)!;
    currentStats.totalDuration += total_duration;
    currentStats.totalCalories += total_energy_burned;
    currentStats.totalDistance += total_distance;
    currentStats.count++;
  }

  const stats: Stats[] = [];
  statsMap.forEach((value, key) => {
    const averageDuration = value.totalDuration / value.count;
    const averageCalories = value.totalCalories / value.count;
    const averageDistance = value.totalDistance / value.count;
    stats.push({
      type: key,
      averageDuration,
      averageCalories,
      averageDistance,
      totalCount: value.count,
    });
  });

  return stats;
}

const WorkoutTrendsPage = ({ navigation }) => {
  const theme = useAppTheme();
  const { data: completedWorkouts, isPending: loadingCompletedWorkouts } =
    useGetCompletedWorkouts(saved_user_data.user_id);

  if (loadingCompletedWorkouts) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 12,
          backgroundColor: theme.colors.background,
          gap: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  const totalCalories = completedWorkouts?.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.total_energy_burned,
    0
  );

  const totalDuration = completedWorkouts?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.total_duration,
    0
  );

  const totalDistance = completedWorkouts?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.total_distance,
    0
  );

  const averageCalories =
    totalCalories && completedWorkouts
      ? totalCalories / completedWorkouts?.length
      : 0;

  const averageDuration =
    totalDuration && completedWorkouts
      ? totalDuration / completedWorkouts?.length
      : 0;

  const averageDistance =
    totalDistance && completedWorkouts
      ? totalDistance / completedWorkouts?.length
      : 0;

  const stats = calculateStats(completedWorkouts);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header
        mode="small"
        statusBarHeight={0}
        elevated
        style={{ backgroundColor: theme.colors.background }}
      >
        <Appbar.BackAction
          onPress={() => navigation.navigate("WorkoutListPage")}
        />
        <Appbar.Content title="Workout Trends" />
      </Appbar.Header>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            gap: 8,
            borderWidth: 1,
            borderColor: theme.colors.border,
            padding: 16,
            borderRadius: 4,
            backgroundColor: theme.colors.card,
            marginBottom: 16,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 4 }}>
            Overview
          </Text>
          <Divider />
          <Text
            style={{ color: theme.colors.foregroundMuted }}
          >{`Completed Workouts: ${completedWorkouts?.length}`}</Text>
          <Text
            style={{ color: theme.colors.foregroundMuted }}
          >{`Average Duration: ${averageDuration.toFixed(1)} mins`}</Text>
          <Text
            style={{ color: theme.colors.foregroundMuted }}
          >{`Average Distance: ${averageDistance} km`}</Text>
          <Text
            style={{ color: theme.colors.foregroundMuted }}
          >{`Average Calories: ${averageCalories} kCals`}</Text>
          <Text style={{ marginTop: 16, marginBottom: -8, fontWeight: "bold" }}>
            Averages by Type
          </Text>
          <DataTable>
            <DataTable.Header style={{ gap: 10 }}>
              <DataTable.Title style={{ marginLeft: -4, marginRight: -4 }}>
                Type
              </DataTable.Title>
              <DataTable.Title>Count</DataTable.Title>
              <DataTable.Title>Duration</DataTable.Title>
              <DataTable.Title>Distance</DataTable.Title>
              <DataTable.Title>Calories</DataTable.Title>
            </DataTable.Header>
            {stats.map((item) => (
              <DataTable.Row key={item.type}>
                <DataTable.Cell>
                  <Text
                    style={{
                      color: theme.colors.foregroundMuted,
                      fontSize: 14,
                    }}
                  >
                    {item.type}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ marginLeft: 16 }}>
                  <Text
                    style={{
                      color: theme.colors.foregroundMuted,
                      fontSize: 14,
                    }}
                  >
                    {item.totalCount}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text
                    style={{
                      color: theme.colors.foregroundMuted,
                      fontSize: 14,
                    }}
                  >
                    {item.averageDuration}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text
                    style={{
                      color: theme.colors.foregroundMuted,
                      fontSize: 14,
                    }}
                  >
                    {item.averageDistance}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text
                    style={{
                      color: theme.colors.foregroundMuted,
                      fontSize: 14,
                    }}
                  >
                    {item.averageCalories}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutTrendsPage;
