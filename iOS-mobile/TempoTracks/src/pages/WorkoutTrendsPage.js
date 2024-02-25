import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { Appbar, SegmentedButtons, useTheme, Chip, Menu, Divider, PaperProvider, Button, ProgressBar, Text, IconButton } from 'react-native-paper';

import { LineChart } from "react-native-gifted-charts";
import { Icon } from "react-native-elements";

const createWorkoutImage = require("../assets/create-workout.png");

const WorkoutTrendsPage = ({ navigation }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState('');

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const lineData = [
    {
      value: 162,
    },
    {
      value: 167,
      label: "Jan",
      dataPointText: "167",
      textColor: theme.colors.mutedWhite,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 162,
      //label: "2/23",
      dataPointText: "162",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 153,
      //label: "3/23",
      dataPointText: "153",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 146,
      //label: "4/23",
      dataPointText: "146",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 144,
      //label: "5/23",
      dataPointText: "144",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 150,
      //label: "6/23",
      dataPointText: "150",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 155,
      //label: "7/23",
      dataPointText: "155",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 153,
      //label: "8/23",
      dataPointText: "153",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 150,
      //label: "9/23",
      dataPointText: "150",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 155,
      //label: "10/23",
      dataPointText: "155",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 152,
      //label: "11/23",
      dataPointText: "152",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 152,
      label: "Dec",
      dataPointText: "152",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    }
  ];

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Appbar.Header mode="small" statusBarHeight={0} elevated="true" style={{ backgroundColor: theme.colors.background }}>
        <Appbar.BackAction onPress={() => navigation.navigate("WorkoutListPage")} />
        <Appbar.Content title="Trends" />
        <Appbar.Action icon="history" onPress={() => navigation.navigate("WorkoutHistoryPage")} />
      </Appbar.Header>
      <ScrollView>
        <View style={{ height: 40 }}>
          <ScrollView horizontal style={{ paddingHorizontal: 5, paddingBottom: 5 }}>
            <Chip icon="bike" style={{ margin: 2 }} elevated="true" onPress={() => console.log('Pressed')}>Biking</Chip>
            <Chip icon="run" style={{ margin: 2 }} elevated="true" onPress={() => console.log('Pressed')}>Running</Chip>
            <Chip icon="lightning-bolt" style={{ margin: 2 }} elevated="true" onPress={() => console.log('Pressed')}>HIIT</Chip>
            <Chip icon="walk" style={{ margin: 2 }} elevated="true" onPress={() => console.log('Pressed')}>Walking</Chip>
          </ScrollView>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 5 }}>
          <PaperProvider>
            <Menu
              visible={visible}
              style={{ width: 200 }}
              onDismiss={closeMenu}
              anchor={
                <Button icon="heart" onPress={openMenu}>Avg. BPM</Button>
              }>
              <Menu.Item onPress={() => { }} title="Item 1" />
              <Menu.Item onPress={() => { }} title="Item 2" />
              <Divider />
              <Menu.Item onPress={() => { }} title="Item 3" />
            </Menu>
          </PaperProvider>



          <PaperProvider>
            <Menu
              visible={visible}
              style={{ backgroundColor: "white" }}
              onDismiss={closeMenu}
              anchor={
                <Button icon="calendar" onPress={openMenu}>Year</Button>
              }>
              <Menu.Item onPress={() => { }} title="Item 1" />
              <Menu.Item onPress={() => { }} title="Item 2" />
              <Divider />
              <Menu.Item onPress={() => { }} title="Item 3" />
            </Menu>
          </PaperProvider>

        </View>

        <Divider style={{ height: 1, backgroundColor: theme.colors.border, marginBottom: 5 }} />

        <View style={{ width: "100%" }}>
          <LineChart
            initialSpacing={0}
            spacing={(Dimensions.get('window').width / 12) - 3}
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text variant="titleLarge" style={{ color: theme.colors.text, padding: 10 }}>Monthly Goals</Text>
          <IconButton icon="pencil" color={theme.colors.text} size={20} onPress={() => console.log('Pressed')} />
        </View>

        <Divider style={{ height: 1, backgroundColor: theme.colors.border, marginBottom: 5 }} />

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
          <Button textColor={theme.colors.text} icon="map">Distance</Button>
          <Text style={{ color: theme.colors.foregroundMuted}}>56km</Text>
        </View>


        <View style={{ paddingHorizontal: 10 }}>
          <ProgressBar progress={0.7} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0km</Text>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>80km</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Button textColor={theme.colors.text} style={{ alignSelf: 'flex-start' }} icon="terrain">Elevation</Button>
          <Text style={{ color: theme.colors.foregroundMuted}}>400m</Text>
        </View>
        
        <View style={{ paddingHorizontal: 10 }}>
          <ProgressBar progress={0.2} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0km</Text>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>2000m</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Button textColor={theme.colors.text} style={{ alignSelf: 'flex-start' }} icon="weight-lifter">Workouts</Button>
          <Text style={{ color: theme.colors.foregroundMuted}}>22</Text>
        </View>
        
        <View style={{ paddingHorizontal: 10 }}>
          <ProgressBar progress={0.9} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0</Text>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>25</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Button textColor={theme.colors.text} style={{ alignSelf: 'flex-start' }} icon="fire">Calories</Button>
          <Text style={{ color: theme.colors.foregroundMuted}}>10000</Text>
        </View>

        
        <View style={{ paddingHorizontal: 10 }}>
          <ProgressBar progress={0.8} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0</Text>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>12500</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutTrendsPage;
