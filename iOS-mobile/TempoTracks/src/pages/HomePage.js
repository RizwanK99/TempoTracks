import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { endOfDay, format } from 'date-fns';
import * as Progress from 'react-native-progress';
import profileData from '../../mocks/profile_data.json';
import workoutData from '../../mocks/workout_data.json';
import Svg, { Circle } from "react-native-svg";
import { getUsersWorkouts } from '../api/Workouts';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme, ActivityIndicator } from 'react-native-paper';

// Watch Hooks
import { sendSongsToWatch, sendWorkoutTemplatesToWatch } from "../module/WatchManager";

async function retrieveData(user, setUser) {
  try {
    const value = await AsyncStorage.getItem("user_data");
    if (value !== null) {
      let userData = JSON.parse(value);
      await setUser(userData);
    }
  } catch (error) {
    console.log("Error retreiving user data", error);
  }
}

const HomePage = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState({});
  const [exerciseList, setExerciseList] = useState([]);
  const theme = useTheme();

  //COMMENT OUT FOR EXPO BUILDS (WATCH)

  /*START
  sendSongsToWatch();
  sendWorkoutTemplatesToWatch();
  END*/

  useEffect(() => {
    async function fetchData() {
      await retrieveData(user, setUser);
      setWorkouts(await getUsersWorkouts(user.user_id, null));
    }
    fetchData();
  }, [user.user_id]);

  useEffect(() => {
    console.log('useEffect');
    console.log(workouts.userWorkouts);
    console.log(workoutData)
    let workouts1 = workoutData.data;
    /*if (workouts.userWorkouts) {
      workouts1 = [...workouts.userWorkouts];
    }*/
    console.log(workouts1);
    let newExercise = [];
    for (var w = 0; w < workouts1.length; w++) {
      console.log('for');
      newExercise.push(
        <View
          key={workouts1[w].workout_id}
          style={{ alignItems: 'center', width: '100%', height: 100 }}
        >
          <View
            style={{
              backgroundColor: theme.colors.barContrast,
              padding: 7,
              borderRadius: 6,
              width: '100%',
              height: '90%',
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ fontSize: 20, color: theme.colors.text }}>
                {workouts1[w].workout_name}
              </Text>
              <Text style={{ fontSize: 13, color: 'grey', marginRight: 2 }}>
                {workouts1[w].date}
              </Text>
            </View>
            <Text style={{ color: '#74B3CE' }}>
              {'Duration: ' + workouts1[w].total_duration + ' minutes'}
            </Text>
            <Text style={{ color: '#09BC8A' }}>
              {'Calories: ' + workouts1[w].total_energy_burned + ' cal'}
            </Text>
          </View>
        </View>
      );
    }
    setExerciseList(newExercise);
  }, [workouts]);

  var formattedDate = format(endOfDay(new Date()), 'EEEE, MMMM do');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background}}>
      <View style={styles.full}>
        <View style={styles.container}>
          <View style={[styles.topBar, { flex: 3 }]}>
            <View style={{ flexDirection: 'column' }}>
              <View style={[styles.welcomeContainer, {backgroundColor: theme.colors.barContrast}]}>
                <Text style={{color: theme.colors.text, fontSize: 20, fontWeight: 'bold'}}>Welcome to TempoTracks,</Text>
                <Text style={{color: theme.colors.text, fontSize: 20}}>{user.first_name}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile', { ...profileData })}
              style={styles.user_icon}
            >
              <Text
                style={{ color: '#004346', fontSize: 40, alignSelf: 'center' }}
              >
                {user.first_name ? user.first_name[0] : "..."}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.progressContainer, { flex: 6, }]}>
              <Text style={{ fontSize: 22, color: theme.colors.text, marginBottom: 10,  fontWeight: 'bold', }}>
                Daily Goals 
              </Text>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'left',
                width: '100%',
                marginBottom: 20,
              }}
            >
              <Text style={{ marginRight: 4, fontSize: 18, color: '#09BC8A'}}>
                Calories: 234/350 
              </Text>
              <Progress.Bar progress={0.7} height={30} width={140} color={'#09BC8A'} borderColor={'#222222'} />
              </View>
              <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'left',
                width: '100%',
                marginBottom: 20
              }}
            >
              <Text style={{ marginTop: 6, marginRight: 4, fontSize: 18, color: '#74B3CE' }}>
                Activity: 10/20 Min
              </Text>
              <Progress.Bar progress={0.5} height={30} width={140} color={'#74B3CE'} borderColor={'#222222'}/>
              </View>
              <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'left',
                width: '100%',
              }}>
              <Text style={{ marginTop: 6, marginRight: 4, fontSize: 18, color: '#508991' }}>
                Steps: 3024/10,000
              </Text>
              <Progress.Bar progress={0.3} height={30} width={140} color={'#508991'} borderColor={'#222222'}/>
              </View>
            </View>
          </View>

          <View style={[styles.box, { flex: 8 }]}>
            <View style={[styles.historyText, { width: '100%' }]}>
              <Text style={{ color: 'white', fontSize: 22, marginBottom: 10, padding: 10, fontWeight: 'bold' }}>
                History
              </Text>
              <ScrollView style={{ width: '100%', height: '100%'}}>
                <View style={{ width: '100%' }}>{exerciseList}</View>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  full: {
    backgroundColor: 'black',
    height: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
    marginHorizontal: 20,
    height: '100%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  progressContainer: {
    width: '100%',
    height: 10,
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderRadius: 5,
    padding: 10,
    marginTop: 15
  },
  welcomeContainer: {
    width: '100%',
    height: 65,
    justifyContent: 'center',
    marginTop: 60,
    padding: 12,
    borderRadius: 5,
    fontSize: 20,
  },
  historyText: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 22,
  },
  box: {
    backgroundColor: 'black',
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  btn_box: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 2,
    alignContent: 'center',
    width: '100%',
  },
  startButton: {
    backgroundColor: '#09bc8a',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#004346',
    width: '100%',
    height: 60,
    justifyContent: 'center',
    textAlign: 'center',
  },
  startButtonContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
  },
  user_icon: {
    backgroundColor: '#09bc8a',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#004346',
    marginLeft: 3,
    marginTop: 60,
    height: 65,
    width: 65,
    textAlign: 'center',
  }
});

export default HomePage;
