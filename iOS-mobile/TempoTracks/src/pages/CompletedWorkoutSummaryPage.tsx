import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Text, ActivityIndicator, Appbar, Divider } from "react-native-paper";
import { useAppTheme } from "../provider/PaperProvider";
import { useGetWorkoutById } from "../api/WorkoutsNew";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function formatTime(totalSeconds: number | undefined): {
  value: number;
  unit: string;
} {
  if (totalSeconds === undefined) {
    return { value: 0, unit: "" };
  }
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) {
    return { value: seconds, unit: "secs" };
  } else {
    return { value: minutes, unit: "mins" };
  }
}

const WorkoutEndSummaryPage = ({ route, navigation }) => {
  const { workoutId } = route.params;
  const theme = useAppTheme();

  const { data: completedWorkout, isPending: loadingWorkout } =
    useGetWorkoutById(workoutId);

  if (loadingWorkout && !completedWorkout) {
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

  const workoutIcons: { [key: string]: string } = {
    Biking: "bike",
    Walking: "walk",
    Running: "run",
    HIIT: "timer",
  };

  const getIconName = (workoutType: string) => {
    return workoutIcons[workoutType];
  };

  const { value: formattedDuration, unit } = formatTime(
    completedWorkout?.total_duration
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header
        mode="small"
        statusBarHeight={0}
        elevated
        style={{ backgroundColor: theme.colors.background }}
      >
        <Appbar.BackAction
          onPress={() => navigation.navigate("WorkoutHistoryPage")}
        />
        <Appbar.Content title="Workout Details" />
      </Appbar.Header>
      {completedWorkout && (
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
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                color: theme.colors.text,
              }}
            >
              {completedWorkout?.workout_name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 4,
                paddingBottom: 4,
                marginBottom: -12,
              }}
            >
              <MaterialCommunityIcons
                name={getIconName(completedWorkout?.workout_type) as any}
                size={14}
                color={theme.colors.foregroundMuted}
              />
              <Text
                style={{
                  color: theme.colors.foregroundMuted,
                  fontSize: 14,
                }}
              >
                {completedWorkout?.workout_type}
              </Text>
            </View>
            {completedWorkout.time_end && (
              <Text
                style={{
                  color: theme.colors.foregroundMuted,
                  marginTop: 4,
                  paddingBottom: 8,
                  fontStyle: "italic",
                  fontSize: 12,
                }}
              >
                Completed:{" "}
                {new Date(completedWorkout.time_end).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </Text>
            )}
            <Divider />
            <View style={{ marginTop: 8, flexDirection: "row" }}>
              <View style={{ flexDirection: "column", gap: 8, width: "50%" }}>
                <Stat
                  label="Total Time"
                  value={formattedDuration}
                  units={unit}
                />
                <Divider />
                <Stat
                  label="Distance"
                  value={completedWorkout.total_distance}
                  units="KM"
                />
                <Divider />
                <Stat
                  label="Avg. Pace"
                  value={
                    completedWorkout.total_duration > 0
                      ? completedWorkout.total_distance /
                        completedWorkout.total_duration
                      : 0
                  }
                  units="/KM"
                />
              </View>
              <View style={{ flexDirection: "column", gap: 8, width: "50%" }}>
                <Stat
                  label="Total Calories"
                  value={completedWorkout.total_energy_burned}
                  units="cals"
                />
                <Divider />
                <Stat
                  label="Avg. Heart Rate"
                  value={
                    completedWorkout.average_heart_rate
                      ? completedWorkout.average_heart_rate
                      : 0
                  }
                  units="BPM"
                />
                <Divider />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

interface StatProps {
  label: string;
  value: string | number;
  units: string;
  icon?: string;
}

const Stat: React.FC<StatProps> = ({ value, label, units, icon }) => {
  const theme = useAppTheme();
  return (
    <View style={{ flexDirection: "column", gap: 4 }}>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <MaterialCommunityIcons
          name={icon as any}
          size={24}
          color={theme.colors.foregroundMuted}
        />
        <Text
          style={{ color: theme.colors.text, fontSize: 16, fontWeight: "bold" }}
        >
          {label}
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        <Text style={{ color: theme.colors.text, fontSize: 26 }}>{value}</Text>
        <Text style={{ color: theme.colors.text, fontSize: 16, marginTop: 2 }}>
          {units}
        </Text>
      </View>
    </View>
  );
};

export default WorkoutEndSummaryPage;
