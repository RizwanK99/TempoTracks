import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView
} from 'react-native';
import profileData from '../../mocks/profile_data.json';

import WorkoutObject from '../components/WorkoutObject';



const HomePage = ({ navigation }) => {
  let exercise = [];
  let workouts = [];

  workouts.push(new WorkoutObject("Run", 100, 10, "Cardio", [], "2021-10-01", "Notes", 1));
  workouts.push(new WorkoutObject("Biking", 200, 20, "Biking", [], "2021-10-02", "Notes", 2));
  workouts.push(new WorkoutObject("Sprint", 300, 30, "Cardio", [], "2021-10-03", "Notes", 3));
 
  for (var w = 0; w < workouts.length; w++) {

    exercise.push(
      <View
        key={workouts[w].id}
        style={{
          alignItems: "center",
          width: "100%",
          height: 125,
          paddingTop: 8,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(230,230,230,1)",
            borderRadius: 15,
            padding: 15,
            width: "95%",
            height: "95%",
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>{workouts[w].name}</Text>
          <Text>{"Duration: " + workouts[w].duration + " min"}</Text>
          <Text>{"Calories: " + workouts[w].calories + " cal"}</Text>
        </View>
      </View>
    );
  }





  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.progress}>
          <View style={styles.title_box}>
            <Text style={styles.title}>Today's Progress!</Text>
          </View>
          <View style={styles.progress_container}>
            <View style={styles.progress_box}>
              <Text style={styles.progress_title}>Current Goal</Text>
              <Text style={styles.progress_value}>
                {"10 min"}
              </Text>
            </View>
            <View style={styles.progress_box}>
              <Text style={styles.progress_title}>Current Total</Text>
              <Text style={styles.progress_value}>
                {"15 min"}
              </Text>
            </View>
          </View>
        </View>
        <ScrollView horizontal={false} style={styles.box}>
          <Text>{exercise}</Text>
        </ScrollView>
      </View>
      <View style={styles.btn_box}>
        <TouchableOpacity
          // onPress={() => {
          //   this.props.navigation.navigate("Exercise", {
          //     username: this.props.navigation.state.params.username,
          //     token: this.props.navigation.state.params.token,
          //   });
          // }}
          style={[styles.btn_shape, { marginHorizontal: 10 }]}
        >
          <Text style={styles.btn_text}>Add Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile", {...profileData})
          }
          style={[styles.btn_shape, { marginHorizontal: 10 }]}
        >
          <Text style={styles.btn_text}>View Profile</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  progress: {
    width: "95%",
    height: 125,
    marginTop: 15,
    alignItems: "center",
  },
  title_box: {
    backgroundColor: "#74b3ce",
    borderRadius: 10,
    width: "95%",
    height: 40,
    justifyContent: "center",
  },
  title: {
    color: "rgba(255,255,255,1)",
    fontSize: 22,
    alignSelf: "center",
  },
  progress_container: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    justifyContent: "center",
  },
  progress_box: {
    backgroundColor: "rgba(213,218,223,1)",
    width: "40%",
    height: 55,
    borderRadius: 10,
    marginHorizontal: 25,
  },
  progress_title: {
    color: "#121212",
    alignSelf: "center",
    marginVertical: 4,
  },
  progress_value: {
    color: "#121212",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  exercise_container: {
    width: "95%",
    height: 400,
    alignItems: "center",
  },
  box: {
    backgroundColor: "rgba(213,218,223,1)",
    borderRadius: 10,
    width: "95%",
    height: 275,
    alignSelf: "center",
  },
  btn_box: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 30,
    alignContent: "center",
  },
  btn_shape: {
    backgroundColor: "#09bc8a",
    borderRadius: 10,
    width: "50%",
    height: 40,
    marginTop: 10,
    justifyContent: "center",
  },
  btn_text: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});


export default HomePage;