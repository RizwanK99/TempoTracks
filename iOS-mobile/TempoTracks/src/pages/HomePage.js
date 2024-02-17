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

import { getUsersWorkouts } from '../api/Workouts';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'react-native-paper'

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

  useEffect(() => {
    async function fetchData() {
      await retrieveData(user, setUser);
      let w = await getUsersWorkouts(user.user_id, 'complete');
      setWorkouts(w.userWorkouts);
    }
    fetchData();
  }, [user.user_id]);

  useEffect(() => {
    console.log('useEffect');
    console.log(workouts);
    let workouts1 = [];
    if (workouts) {
      workouts1 = [...workouts];
    }
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
              backgroundColor: '#222222',
              padding: 7,
              borderRadius: 10,
              width: '100%',
              height: '90%',
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ fontSize: 25, color: 'white' }}>
                {workouts1[w].workout_name}
              </Text>
              <Text style={{ fontSize: 13, color: 'grey', marginRight: 2 }}>
                {workouts1[w].date}
              </Text>
            </View>
            <Text style={{ color: '#74B3CE' }}>
              {'Duration: ' + workouts1[w].time_duration + ' min'}
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
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.full}>
        <View style={styles.container}>
          <View style={[styles.topBar, { flex: 2 }]}>
            <View style={{ flexDirection: 'column' }}>
              <View style={styles.welcomeContainer}>
                <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: 'bold'}}>Welcome to TempoTracks,</Text>
                <Text style={{color: '#FFFFFF', fontSize: 20}}>{user.first_name}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile', { ...profileData })}
              style={styles.btn_shape}
            >
              <Text
                style={{ color: '#004346', fontSize: 40, alignSelf: 'center' }}
              >
                {user.first_name[0]}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.progressContainer, { flex: 2 }]}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Text style={{ fontSize: 14, color: '#09BC8A' }}>
                Calories: 234/350
              </Text>
              <Progress.Circle  progress={0.7} size={50} borderWidth={5} color={'#09BC8A'} />
              <Text style={{ marginTop: 6, fontSize: 14, color: '#74B3CE' }}>
                Activity: 10/20 Minutes
              </Text>
              <Progress.Circle   progress={0.5} size={50} borderWidth={5} color={'#74B3CE'} />
              <Text style={{ marginTop: 6, fontSize: 14, color: '#508991' }}>
                Steps: 3024/10,000
              </Text>
              <Progress.Circle  progress={0.3} size={50} borderWidth={5} color={'#508991'} />
            </View>
          </View>

          <View style={[styles.box, { flex: 8 }]}>
            <View style={[styles.historyText, { width: '100%' }]}>
              <Text style={{ color: 'white', fontSize: 22, padding: 10 }}>
                History
              </Text>
              <ScrollView style={{ width: '100%' }}>
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
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#222222',
    padding: 35,
    borderRadius: 5,
    marginTop: 10
  },
  welcomeContainer: {
    width: '100%',
    height: 75,
    justifyContent: 'center',
    backgroundColor: '#222222',
    marginTop: 25,
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
  btn_shape: {
    backgroundColor: '#09bc8a',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#004346',
    marginLeft: 5,
    marginTop: 25,
    height: 65,
    width: 65,
    textAlign: 'center',
  }
});

export default HomePage;
