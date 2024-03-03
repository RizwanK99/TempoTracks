import React from "react";
import { View, Text, SafeAreaView, ScrollView, Button } from "react-native";
import { useGetWorkoutTemplateById } from "../api/WorkoutTemplate.ts";
import { Divider, ActivityIndicator } from "react-native-paper";
import { StyledText } from "../components/Workouts/CreateWorkoutTemplateForm";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Checkbox } from "../components/Inputs/Checkbox";
import { Button as PaperButton } from "react-native-paper";
import { useAppTheme } from "../provider/PaperProvider.tsx";
import { BarChartPropsType } from "react-native-gifted-charts";
import { IntensityVsTimeGraph } from "../components/Workouts/IntensityVsTimeGraph.tsx";

function copyListNTimes<T>(list: T[], n: number): T[] {
  return Array.from({ length: n }, () => [...list]).flat();
}

const IndividualWorkoutTemplatePage = ({ route, navigation }) => {
  const theme = useAppTheme();
  const { templateId } = route.params;
  const { data: template, isPending: loadingTemplate } =
    useGetWorkoutTemplateById(templateId);

  if (loadingTemplate || !template) {
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

  const barData: BarChartPropsType["data"] = [];
  const compiledIntervalsForGraph = copyListNTimes(
    template.workout_intervals,
    template.num_sets
  );
  for (let i = 0; i < compiledIntervalsForGraph.length; i++) {
    barData.push({
      value: compiledIntervalsForGraph[i].workout_intensities.tempo,
      barWidth: compiledIntervalsForGraph[i].active,
      frontColor: theme.colors.bar,
      label: compiledIntervalsForGraph[i].active.toString(),
      spacing: 0,
      barBorderTopLeftRadius: 8,
      barBorderTopRightRadius: 8,
      labelTextStyle: { color: theme.colors.foregroundMuted },
    });
    barData.push({
      value: 0.25,
      barWidth: compiledIntervalsForGraph[i].rest,
      label: compiledIntervalsForGraph[i].rest.toString(),
      frontColor: theme.colors.barContrast,
      spacing: 0,
      barBorderTopLeftRadius: 8,
      barBorderTopRightRadius: 8,
      labelTextStyle: { color: theme.colors.foregroundMuted },
    });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: theme.colors.background,
        gap: 24,
      }}
    >
      <Header navigation={navigation} label={template.name} />
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView style={{ paddingHorizontal: 16 }}>
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
            <View>
              <StyledText text={template.name} fontSize={24} />
            </View>
            <Text style={{ color: theme.colors.foregroundMuted }}>
              {template.description}
            </Text>
            {template.last_completed && (
              <Text
                style={{
                  color: theme.colors.foregroundMuted,
                  fontSize: 12,
                  fontStyle: "italic",
                }}
              >
                Last completed:{" "}
                {new Date(template.last_completed).toLocaleString("en-US", {
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
            <View
              style={{
                flexDirection: "row",
                gap: 48,
                marginTop: 8,
              }}
            >
              <Column
                label="Type"
                value={template.type}
                icon={getIconName(template.type)}
              />
              <Column
                label="Duration"
                value={
                  Number(template.expected_duration) % 60 !== 0
                    ? (Number(template.expected_duration) / 60).toFixed(1)
                    : Number(template.expected_duration) / 60
                }
                units={
                  Number(template.expected_duration) / 60 === 1 ? "min" : "mins"
                }
              />
              <Column label="Sets" value={template.num_sets} units="sets" />
            </View>
            <View style={{ marginTop: 16, marginBottom: 4, gap: 8 }}>
              <Text style={{ color: theme.colors.text }}>Set Breakdown</Text>
              <View>
                {template.workout_intervals.map((interval, index) => (
                  <Checkbox
                    id={index}
                    key={index}
                    disabled
                    title={interval.label}
                    index={index + 1}
                    subTitle={`${interval.active} secs active, ${interval.rest} secs rest`}
                  />
                ))}
              </View>
            </View>
            <View style={{ marginTop: 4 }}>
              <Text
                style={{
                  color: theme.colors.text,
                  marginBottom: 16,
                  fontSize: 16,
                }}
              >
                Intervals
              </Text>
              <View style={{ marginTop: 4, marginBottom: 16 }}>
                <IntensityVsTimeGraph barData={barData} />
              </View>
            </View>
            <View
              style={{
                marginTop: 16,
                marginBottom: 8,
                flexDirection: "row",
                gap: 8,
              }}
            >
              <PaperButton
                style={{
                  borderRadius: 8,
                  paddingVertical: 4,
                  width: "100%",
                  backgroundColor: theme.colors.primary,
                }}
                textColor={theme.colors.primaryForeground}
                labelStyle={{ fontSize: 20, fontWeight: "bold" }}
                onPress={() => {
                  navigation.navigate("StartOrCancelWorkoutPage", {
                    templateId: templateId,
                    name: template.name,
                    type: template.type,
                    playlistId: template.playlist_id,
                  });
                }}
              >
                Start
              </PaperButton>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const Column = ({
  label,
  units,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  units?: string;
  icon?: string;
}) => {
  const theme = useAppTheme();
  return (
    <View style={{ flexDirection: "column", gap: 4 }}>
      <Text style={{ color: theme.colors.text }}>{label}</Text>
      <View style={{ flexDirection: "row", gap: 4 }}>
        {icon && (
          <MaterialCommunityIcons
            name={icon as any}
            size={14}
            color={theme.colors.foregroundMuted}
          />
        )}
        <Text style={{ color: theme.colors.foregroundMuted }}>
          {value} {units}
        </Text>
      </View>
    </View>
  );
};

const Header = ({ navigation, label }) => {
  const theme = useAppTheme();
  return (
    <View
      style={{
        alignItems: "flex-start",
        flexDirection: "row",
      }}
    >
      <Button onPress={() => navigation.goBack()} title="Back" />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 8,
          marginRight: 50,
        }}
      >
        <Text
          style={{ fontSize: 20, fontWeight: "bold", color: theme.colors.text }}
        >
          Workout Details
        </Text>
      </View>
    </View>
  );
};

export default IndividualWorkoutTemplatePage;
