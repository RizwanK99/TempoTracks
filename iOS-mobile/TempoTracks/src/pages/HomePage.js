import * as React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  View,
  SafeAreaView,
  Dimensions
} from 'react-native';

import { Appbar, useTheme, Avatar, Button, Card, Text, Divider, IconButton, Chip, Surface, ProgressBar, Tooltip, PaperProvider, Menu } from 'react-native-paper';

import { endOfDay, format } from 'date-fns';
import profileData from '../../mocks/profile_data.json';
import { LineChart } from "react-native-gifted-charts";

import { getUsersWorkouts } from '../api/Workouts';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Watch Hooks
import { sendSongsToWatch, sendWorkoutTemplatesToWatch } from "../module/WatchManager";
import { Icon } from 'react-native-elements';
import { HomePageHeader } from '../components/Home/Header';

async function retrieveData(user, setUser) {
  try {
    const value = await AsyncStorage.getItem('user_data');
    if (value !== null) {
      let userData = JSON.parse(value);
      await setUser(userData);
    }
  } catch (error) {
    console.log('Error retreiving user data', error);
  }
}

const HomePage = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState({});
  const [exerciseList, setExerciseList] = useState([]);

  const theme = useTheme();

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  //TODO: Replace with actual data
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

  //COMMENT OUT FOR EXPO BUILDS (WATCH)

  /*START
  sendSongsToWatch();
  sendWorkoutTemplatesToWatch();
  END*/

  useEffect(() => {
    async function fetchData() {
      await retrieveData(user, setUser);
      let w = await getUsersWorkouts(user.user_id, 'complete');
      setWorkouts(w.userWorkouts);
    }
    fetchData();
  }, [user.user_id]);

  var formattedDate = format(endOfDay(new Date()), 'MMMM d, yyyy');

  const [visible, setVisible] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ paddingHorizontal: 10 }}>
        <HomePageHeader navigation={navigation} />
    
        <Card>
          <Card.Content>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text variant="headlineMedium" style={{ color: theme.colors.text, paddingHorizontal: 5 }}>Today's Progress</Text>
              <IconButton icon="pencil" color={theme.colors.text} size={20} onPress={() => console.log('Pressed')} />
            </View>
            <Divider style={{ marginVertical: 10 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Button textColor={theme.colors.text} icon="shoe-sneaker">Steps</Button>
              <Text style={{ color: theme.colors.foregroundMuted }}>7593</Text>
            </View>


            <View style={{ paddingHorizontal: 10 }}>
              <ProgressBar progress={0.7} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0</Text>
              <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>10000</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Button textColor={theme.colors.text} style={{ alignSelf: 'flex-start' }} icon="weight-lifter">Activity</Button>
              <Text style={{ color: theme.colors.foregroundMuted }}>55 min</Text>
            </View>

            <View style={{ paddingHorizontal: 10 }}>
              <ProgressBar progress={0.9} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0</Text>
              <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>60</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Button textColor={theme.colors.text} style={{ alignSelf: 'flex-start' }} icon="fire">Calories</Button>
              <Text style={{ color: theme.colors.foregroundMuted }}>337</Text>
            </View>


            <View style={{ paddingHorizontal: 10 }}>
              <ProgressBar progress={0.8} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0</Text>
              <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>500</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={{ backgroundColor: theme.colors.background, paddingTop: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 5 }}>
            <PaperProvider>
              <Menu
                visible={visible}
                style={{ flex: 1 }}
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
                style={{ flex: 1 }}
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

            <PaperProvider>
              <Menu
                visible={visible}
                style={{ fix: 1 }}
                onDismiss={closeMenu}
                anchor={
                  <Button icon="bike" onPress={openMenu}>Biking</Button>
                }>
                <Menu.Item onPress={() => { }} title="Item 1" />
                <Menu.Item onPress={() => { }} title="Item 2" />
                <Divider />
                <Menu.Item onPress={() => { }} title="Item 3" />
              </Menu>
            </PaperProvider>

          </View>

          <Divider style={{ height: 1, backgroundColor: theme.colors.border, marginBottom: 5 }} />

          <View>
            <LineChart
              initialSpacing={0}
              spacing={(Dimensions.get('window').width / 12) - 5}
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
        </Card>

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text variant="titleLarge" style={{ color: theme.colors.text, padding: 10 }}>Monthly Goals</Text>
            <IconButton icon="pencil" color={theme.colors.text} size={20} onPress={() => console.log('Pressed')} />
          </View>

          <Divider style={{ height: 1, backgroundColor: theme.colors.border, marginBottom: 5 }} />

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Button textColor={theme.colors.text} icon="map">Distance</Button>
            <Text style={{ color: theme.colors.foregroundMuted }}>56km</Text>
          </View>


          <View style={{ paddingHorizontal: 10 }}>
            <ProgressBar progress={0.7} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0km</Text>
            <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>80km</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Button textColor={theme.colors.text} style={{ alignSelf: 'flex-start' }} icon="terrain">Elevation</Button>
            <Text style={{ color: theme.colors.foregroundMuted }}>400m</Text>
          </View>

          <View style={{ paddingHorizontal: 10 }}>
            <ProgressBar progress={0.2} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0km</Text>
            <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>2000m</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Button textColor={theme.colors.text} style={{ alignSelf: 'flex-start' }} icon="weight-lifter">Workouts</Button>
            <Text style={{ color: theme.colors.foregroundMuted }}>22</Text>
          </View>

          <View style={{ paddingHorizontal: 10 }}>
            <ProgressBar progress={0.9} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0</Text>
            <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>25</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Button textColor={theme.colors.text} style={{ alignSelf: 'flex-start' }} icon="fire">Calories</Button>
            <Text style={{ color: theme.colors.foregroundMuted }}>10000</Text>
          </View>


          <View style={{ paddingHorizontal: 10 }}>
            <ProgressBar progress={0.8} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0</Text>
            <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>12500</Text>
          </View>
        </View>

      </ScrollView>


      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="labelLarge" style={{ color: theme.colors.foregroundMuted, padding: 10 }}>Favourites</Text>
          <Tooltip title="Hold chip to change workout" enterTouchDelay={0} leaveTouchDelay={0}>
            <IconButton icon="information" iconColor={theme.colors.foregroundMuted} selected size={15} onPress={() => { }} />
          </Tooltip>
        </View>
        <Surface style={{ borderRadius: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 6, justifyContent: 'center' }}>
            <View style={{ flex: 4 }}>
              <View style={{ flexDirection: 'row' }}>
                <Chip icon="bike" style={{ margin: 2, flex: 1, justifyContent: 'center' }} elevated="true" onLongPress={() => console.log('Pressed')} onPress={() => console.log('Pressed')}>Biking</Chip>
                <Chip icon="run" style={{ margin: 2, flex: 1 }} elevated="true" onPress={() => console.log('Pressed')}>Running</Chip>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Chip icon="timer" style={{ margin: 2, flex: 1 }} elevated="true" onPress={() => console.log('Pressed')}>HIIT</Chip>
                <Chip icon="walk" style={{ margin: 2, flex: 1 }} elevated="true" onPress={() => console.log('Pressed')}>Walking</Chip>
              </View>
            </View>
            <View style={{ flex: 1, paddingLeft: 2 }}>
              <TouchableOpacity onPress={() => navigation.navigate("WorkoutInProgress", { undefined })}>
                <Surface elevation={4} style={{ aspectRatio: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <IconButton iconColor={theme.colors.primary} icon="lightning-bolt" size={35} />
                </Surface>
              </TouchableOpacity>
            </View>
          </View>
        </Surface>
      </View>
    </SafeAreaView>
  );
};
export default HomePage;
