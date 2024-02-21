import React, { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useTheme, Button } from "react-native-paper";
import { useGetWorkoutById } from "../api/WorkoutsNew.ts";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface StatProps {
  value: string;
  label: string;
  units: string;
  icon: string;
}

const Stat: React.FC<StatProps> = ({ value, label, units, icon }) => {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: "column", gap: 4 }}>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={theme.colors.foregroundMuted}
        />
        <Text style={{ color: theme.colors.text, fontSize: 20 }}>{label}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        <Text style={{ color: theme.colors.text, fontSize: 28 }}>{value}</Text>
        <Text style={{ color: theme.colors.text, fontSize: 18, marginTop: 2 }}>
          {units}
        </Text>
      </View>
    </View>
  );
};

function formatTime(totalSeconds: number): { value: number; unit: string } {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) {
    return { value: seconds, unit: "secs" };
  } else {
    return { value: minutes, unit: "mins" };
  }
}

const WorkoutSummaryPage = ({ navigation, route }) => {
  const theme = useTheme();
  const { workoutId, duration, calories, bpm, distance } = route.params;
  const { value: formattedDuration, unit } = formatTime(duration);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          padding: 16,
          gap: 24,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
              fontWeight: "bold",
              fontSize: 26,
            }}
          >
            Summary
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.card,
            gap: 24,
            padding: 16,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 4,
          }}
        >
          <Stat label="Duration" value={formattedDuration} units={unit} />
          <Stat label="Calories Burnt" value={calories} units="cals" />
          <Stat label="Distance" value={distance} units="km" />
        </View>
        <View style={{ marginTop: "80%", alignSelf: "center", width: "100%" }}>
          <Button
            onPress={() => navigation.navigate("Workouts")}
            style={{
              borderRadius: 4,
              paddingVertical: 4,
              width: "100%",
              backgroundColor: theme.colors.primary,
              border: "none",
            }}
            textColor={theme.colors.primaryForeground}
            labelStyle={{ fontSize: 20, fontWeight: "bold" }}
            contentStyle={{ color: theme.colors.text }}
          >
            Exit
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutSummaryPage;
