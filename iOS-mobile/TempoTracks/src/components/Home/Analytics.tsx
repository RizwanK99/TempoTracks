import * as React from "react";
import { View, Dimensions, SafeAreaView } from "react-native";

import {
  Button,
  Divider,
  Menu,
  Card,
  ActivityIndicator,
} from "react-native-paper";

import { LineChart } from "react-native-gifted-charts";
import { useAppTheme } from "../../provider/PaperProvider";
import { useGetCompletedWorkouts } from "../../api/WorkoutsNew";
import { saved_user_data } from "../../api/Globals";

type StatFilter = "bpm" | "calories" | "duration";

interface StatMenuItem {
  type: StatFilter;
  label: string;
  icon: string;
}

const statMenuItems: StatMenuItem[] = [
  { type: "bpm", label: "Avg. BPM", icon: "heart" },
  { type: "calories", label: "Avg. Calories", icon: "fire" },
  { type: "duration", label: "Avg. Duration", icon: "timer" },
];

export const Analytics = () => {
  const theme = useAppTheme();
  const [timeFilter, setTimeFilter] = React.useState(false);
  const [statFilter, setStatFilter] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState<StatMenuItem>(
    statMenuItems[0]
  );

  const openTimeMenu = () => setTimeFilter(true);
  const closeTimeMenu = () => setTimeFilter(false);

  const openStatMenu = () => setStatFilter(true);
  const closeStatMenu = () => setStatFilter(false);

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

  let yvalues = completedWorkouts?.map((item) => item.average_heart_rate);

  if (activeFilter.type === "calories") {
    yvalues = completedWorkouts?.map((item) => item.total_energy_burned);
  }

  if (activeFilter.type === "duration") {
    yvalues = completedWorkouts?.map((item) =>
      Number((item.total_duration / 60).toFixed(0))
    );
  }

  const lineData = yvalues?.map((item) => ({
    value: item === null ? 0 : item,
    dataPointText: item === null ? "0" : item.toFixed(0),
    textColor: theme.colors.text,
    dataPointRadius: 3,
  }));

  const findMinimumYValue = (): number => {
    let min = 0;
    if (lineData) {
      const data = lineData.map((data) => data.value);
      min = Math.min(...data);
    }

    return min;
  };

  return (
    <Card style={{ padding: 8 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Menu
          visible={statFilter}
          style={{ flex: 1, elevation: 5 }}
          onDismiss={closeStatMenu}
          anchor={
            <Button icon={activeFilter.icon} onPress={openStatMenu}>
              {activeFilter.label}
            </Button>
          }
        >
          {statMenuItems.map((item) => (
            <Menu.Item
              key={item.type}
              title={item.label}
              leadingIcon={item.icon}
              onPress={() => {
                setActiveFilter(item);
                closeStatMenu();
              }}
            />
          ))}
        </Menu>
        {/* <Menu
          visible={timeFilter}
          style={{ flex: 1 }}
          onDismiss={closeTimeMenu}
          anchor={
            <Button icon="calendar" onPress={openTimeMenu}>
              Year
            </Button>
          }
        >
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu> */}
      </View>

      <Divider
        style={{
          height: 1,
          backgroundColor: theme.colors.border,
          marginBottom: 16,
        }}
      />

      <View>
        {lineData && lineData.length > 0 && (
          <LineChart
            initialSpacing={4}
            spacing={Dimensions.get("window").width / 12 - 5}
            data={lineData}
            curved
            textShiftY={-2}
            textColor1={theme.colors.text}
            xAxisLabelTextStyle={{ color: theme.colors.foregroundMuted }}
            textFontSize={11}
            thickness={2}
            height={210}
            width={300}
            hideRules
            isAnimated
            hideYAxisText
            yAxisColor={theme.colors.foregroundMuted}
            showVerticalLines
            verticalLinesColor={theme.colors.border}
            xAxisColor={theme.colors.foregroundMuted}
            color={theme.colors.primary}
            dataPointsColor1={theme.colors.foregroundMuted}
            yAxisOffset={findMinimumYValue()}
          />
        )}
      </View>
    </Card>
  );
};
