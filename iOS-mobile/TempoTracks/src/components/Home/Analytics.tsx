import * as React from "react";
import { View, Dimensions } from "react-native";

import { Button, Divider, PaperProvider, Menu } from "react-native-paper";

//import profileData from '../../mocks/profile_data.json';
import { LineChart } from "react-native-gifted-charts";

import { useState } from "react";
import { useAppTheme } from "../../provider/PaperProvider";

export const Analytics = () => {
  const theme = useAppTheme();
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState({});

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  //TODO: Fetch workouts from API
  const lineData = [
    {
      value: 162,
    },
    {
      value: 167,
      label: "Jan",
      dataPointText: "167",
      textColor: theme.colors.text,
      dataPointRadius: 3,
    },
    {
      value: 162,
      //label: "2/23",
      dataPointText: "162",
      textColor: theme.colors.text,
      dataPointRadius: 3,
    },
    {
      value: 153,
      //label: "3/23",
      dataPointText: "153",
      textColor: theme.colors.text,
      dataPointRadius: 3,
    },
    {
      value: 146,
      //label: "4/23",
      dataPointText: "146",
      textColor: theme.colors.text,
      dataPointRadius: 3,
    },
    {
      value: 144,
      //label: "5/23",
      dataPointText: "144",
      textColor: theme.colors.text,
      dataPointRadius: 3,
    },
    {
      value: 150,
      //label: "6/23",
      dataPointText: "150",
      textColor: theme.colors.text,
      dataPointRadius: 3,
    },
    {
      value: 155,
      //label: "7/23",
      dataPointText: "155",
      textColor: theme.colors.text,
      dataPointRadius: 3,
    },
    {
      value: 153,
      //label: "8/23",
      dataPointText: "153",
      textColor: theme.colors.text,
      dataPointRadius: 3,
    },
    {
      value: 150,
      //label: "9/23",
      dataPointText: "150",
      textColor: theme.colors.text,
      dataPointRadius: 3,
    },
    {
      value: 155,
      //label: "10/23",
      dataPointText: "155",
      textColor: theme.colors.text,
      dataPointRadius: 3,
    },
    {
      value: 152,
      //label: "11/23",
      dataPointText: "152",
      textColor: theme.colors.text,
      dataPointRadius: 3,
    },
    {
      value: 152,
      label: "Dec",
      dataPointText: "152",
      textColor: theme.colors.text,
      dataPointRadius: 3,
    },
  ];

  return (
    <View style={{ backgroundColor: theme.colors.background, paddingTop: 10 }}>
      <View
        style={{ flexDirection: "row", justifyContent: "center", padding: 5 }}
      >
        <PaperProvider>
          <Menu
            visible={visible}
            style={{ flex: 1 }}
            onDismiss={closeMenu}
            anchor={
              <Button icon="heart" onPress={openMenu}>
                Avg. BPM
              </Button>
            }
          >
            <Menu.Item onPress={() => {}} title="Item 1" />
            <Menu.Item onPress={() => {}} title="Item 2" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Item 3" />
          </Menu>
        </PaperProvider>

        <PaperProvider>
          <Menu
            visible={visible}
            style={{ flex: 1 }}
            onDismiss={closeMenu}
            anchor={
              <Button icon="calendar" onPress={openMenu}>
                Year
              </Button>
            }
          >
            <Menu.Item onPress={() => {}} title="Item 1" />
            <Menu.Item onPress={() => {}} title="Item 2" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Item 3" />
          </Menu>
        </PaperProvider>

        <PaperProvider>
          <Menu
            visible={visible}
            style={{ flex: 1 }}
            onDismiss={closeMenu}
            anchor={
              <Button icon="bike" onPress={openMenu}>
                Biking
              </Button>
            }
          >
            <Menu.Item onPress={() => {}} title="Item 1" />
            <Menu.Item onPress={() => {}} title="Item 2" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Item 3" />
          </Menu>
        </PaperProvider>
      </View>

      <Divider
        style={{
          height: 1,
          backgroundColor: theme.colors.border,
          marginBottom: 5,
        }}
      />

      <View>
        <LineChart
          initialSpacing={0}
          spacing={Dimensions.get("window").width / 12 - 5}
          data={lineData}
          curved
          textShiftY={-2}
          textColor1={theme.colors.text}
          xAxisLabelTextStyle={{ color: theme.colors.foregroundMuted }}
          textFontSize={11}
          thickness={2}
          height={200}
          hideRules
          isAnimated
          hideYAxisText
          yAxisColor={theme.colors.foregroundMuted}
          showVerticalLines
          verticalLinesColor={theme.colors.border}
          xAxisColor={theme.colors.foregroundMuted}
          color={theme.colors.primary}
          dataPointsColor1={theme.colors.foregroundMuted}
          yAxisOffset={130}
        />
      </View>
    </View>
  );
};
