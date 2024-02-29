import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";
import { Button, Divider } from "react-native-paper";
import { useGetWorkoutById } from "../api/WorkoutsNew.ts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LineChart } from "react-native-gifted-charts";
import { useAppTheme } from "../provider/PaperProvider.tsx";

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
  const theme = useAppTheme();
  const { workoutId, duration, calories, bpm, distance } = route.params;
  const { value: formattedDuration, unit } = formatTime(duration);
  const { data: completedWorkout, isPending } = useGetWorkoutById(workoutId);
  const [workoutStart, setWorkoutStart] = useState<string | null>();
  const [workoutEnd, setWorkoutEnd] = useState<string | null>();
  const [currentTime, setCurrentTime] = useState<string | null>();
  useEffect(() => {
    if (
      !isPending &&
      completedWorkout?.time_start &&
      completedWorkout.time_end
    ) {
      setWorkoutStart(
        new Date(completedWorkout.time_start).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      setWorkoutEnd(
        new Date(completedWorkout.time_end).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }
  }, [isPending]);

  const lineData = [
    {
      value: 100,
      dataPointText: "0",
      //   label: workoutStart,
      label: "8:53 AM",
      labelTextStyle: {
        width: 80,
        color: theme.colors.foregroundMuted,
        fontSize: 12,
        marginLeft: -5,
      },
    },
    { value: 150, dataPointText: "1" },
    { value: 170, dataPointText: "2" },
    { value: 140, dataPointText: "3" },
    { value: 160, dataPointText: "4" },
    { value: 180, dataPointText: "5" },
    {
      value: 130,
      dataPointText: "6",
      label: "8:54 AM",
      labelTextStyle: {
        width: 80,
        color: theme.colors.foregroundMuted,
        fontSize: 12,
        marginLeft: -5,
      },
    },
    { value: 155, dataPointText: "7" },
    { value: 175, dataPointText: "8" },
    { value: 120, dataPointText: "9" },
    { value: 145, dataPointText: "10" },
    { value: 165, dataPointText: "11" },
    {
      value: 105,
      dataPointText: "12",
      label: "8:55 AM",
      labelTextStyle: {
        width: 80,
        color: theme.colors.foregroundMuted,
        fontSize: 12,
        marginLeft: -5,
      },
    },
    { value: 155, dataPointText: "13" },
    { value: 175, dataPointText: "14" },
    { value: 125, dataPointText: "15" },
    { value: 150, dataPointText: "16" },
    { value: 170, dataPointText: "17" },
    {
      value: 110,
      dataPointText: "18",
      label: "8:56 AM",
      labelTextStyle: {
        width: 80,
        color: theme.colors.foregroundMuted,
        fontSize: 12,
        marginLeft: -5,
      },
    },
    { value: 160, dataPointText: "19" },
    { value: 180, dataPointText: "20" },
    { value: 135, dataPointText: "21" },
    { value: 165, dataPointText: "22" },
    { value: 185, dataPointText: "23" },
    {
      value: 115,
      dataPointText: "24",
      label: "8:57 AM",
      labelTextStyle: {
        width: 80,
        color: theme.colors.foregroundMuted,
        fontSize: 12,
        marginLeft: -5,
      },
    },
    { value: 155, dataPointText: "25" },
    { value: 175, dataPointText: "26" },
    { value: 130, dataPointText: "27" },
    { value: 160, dataPointText: "28" },
    { value: 180, dataPointText: "29" },
    {
      value: 120,
      dataPointText: "30",
      label: "8:58 AM",
      labelTextStyle: {
        width: 80,
        color: theme.colors.foregroundMuted,
        fontSize: 12,
        marginLeft: -5,
      },
    },
    { value: 150, dataPointText: "31" },
    { value: 170, dataPointText: "32" },
    { value: 110, dataPointText: "33" },
    { value: 160, dataPointText: "34" },
    { value: 180, dataPointText: "35" },
    {
      value: 125,
      dataPointText: "36",
      label: "8:59 AM",
      labelTextStyle: {
        width: 80,
        color: theme.colors.foregroundMuted,
        fontSize: 12,
        marginLeft: -5,
      },
    },
    { value: 155, dataPointText: "37" },
    { value: 175, dataPointText: "38" },
    { value: 135, dataPointText: "39" },
    { value: 165, dataPointText: "40" },
    { value: 185, dataPointText: "41" },
    {
      value: 120,
      dataPointText: "42",
      label: "9:00 AM",
      labelTextStyle: {
        width: 80,
        color: theme.colors.foregroundMuted,
        fontSize: 12,
        marginLeft: -5,
      },
    },
    { value: 150, dataPointText: "43" },
    { value: 170, dataPointText: "44" },
    { value: 115, dataPointText: "45" },
    { value: 160, dataPointText: "46" },
    { value: 180, dataPointText: "47" },
    {
      value: 130,
      dataPointText: "48",
      label: workoutEnd ?? "Workout End",
      labelTextStyle: {
        width: 80,
        color: theme.colors.foregroundMuted,
        fontSize: 12,
        marginLeft: -5,
      },
    },
    { value: 155, dataPointText: "49" },
    { value: 175, dataPointText: "50" },
  ];

  const findMinimumHeartRate = (): number => {
    const heartRates = lineData.map((data) => data.value);
    const minHeartRate = Math.min(...heartRates);

    return minHeartRate;
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <View
        style={{
          padding: 16,
          gap: 16,
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
        <ScrollView>
          <View style={{ gap: 16, flex: 1 }}>
            {/* Stats summary - make into component */}
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Workout Details
            </Text>
            <View
              style={{
                backgroundColor: theme.colors.card,
                padding: 16,
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: 4,
                flexDirection: "row",
              }}
            >
              <View style={{ flexDirection: "column", gap: 8, width: "50%" }}>
                <Stat
                  label="Total Time"
                  value={formattedDuration}
                  units={unit}
                />
                <Divider />
                <Stat label="Distance" value={distance} units="MI" />
                <Divider />
                <Stat label="Avg. Pace" value={`5'32"`} units="/MI" />
              </View>
              <View style={{ flexDirection: "column", gap: 8, width: "50%" }}>
                <Stat label="Total Calories" value={calories} units="cals" />
                <Divider />
                <Stat label="Avg. Heart Rate" value={"168"} units="BPM" />
                <Divider />
              </View>
            </View>
            {/* Heart rate map */}
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Heart Rate
            </Text>
            <View
              style={{
                backgroundColor: theme.colors.card,
                padding: 16,
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: 4,
                width: "100%",
                gap: 16,
              }}
            >
              <LineChart
                isAnimated
                trimYAxisAtTop
                initialSpacing={0}
                data={lineData}
                spacing={30}
                textShiftY={-8}
                textShiftX={-10}
                textFontSize={12}
                thickness={2}
                hideRules
                xAxisLength={275}
                hideDataPoints
                yAxisTextStyle={{
                  color: theme.colors.foregroundMuted,
                  fontSize: 12,
                }}
                showVerticalLines
                xAxisLabelsVerticalShift={8}
                yAxisOffset={findMinimumHeartRate()}
                xAxisColor={theme.colors.foregroundMuted}
                yAxisColor={theme.colors.foregroundMuted}
                verticalLinesColor={theme.colors.border}
                color={theme.colors.redPrimary}
                // areaChart
                // startFillColor={theme.colors.redPrimary}
                // startOpacity={0.8}
                // endOpacity={0.2}
              />
            </View>
            <View
              style={{
                marginTop: "2%",
                marginBottom: 48,
                alignSelf: "center",
                width: "100%",
              }}
            >
              <Button
                onPress={() => navigation.navigate("Workouts")}
                style={{
                  borderRadius: 4,
                  paddingVertical: 4,
                  width: "100%",
                  backgroundColor: theme.colors.primary,
                }}
                textColor={theme.colors.primaryForeground}
                labelStyle={{ fontSize: 20, fontWeight: "bold" }}
              >
                Exit
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutSummaryPage;
