import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import { endOfDay, format } from "date-fns";
import * as Progress from 'react-native-progress';
import profileData from "../../mocks/profile_data.json";

import WorkoutObject from "../components/Workouts/WorkoutObject";
import { getUsersWorkouts } from "../api/Workouts";

const HomePage = ({ navigation }) => {
  let exercise = [];
  let workouts = [];

  let workoutData = getUsersWorkouts(2);

  var formattedDate = format(endOfDay(new Date()), "EEEE, MMMM do");


  workouts.push(
    new WorkoutObject("Run", 100, 10, "Cardio", [], "2021-10-01", "Notes", 1)
  );
  workouts.push(
    new WorkoutObject("Biking", 200, 20, "Biking", [], "2021-10-02", "Notes", 2)
  );
  workouts.push(
    new WorkoutObject("Sprint", 300, 30, "Cardio", [], "2021-10-03", "Notes", 3)
  );
  workouts.push(
    new WorkoutObject("Run", 234, 30, "Cardio", [], "2021-10-03", "Notes", 3)
  );
  workouts.push(
    new WorkoutObject("Swim", 567, 30, "Cardio", [], "2021-10-03", "Notes", 3)
  );

  for (var w = 0; w < workouts.length; w++) {
    exercise.push(
      <View
        key={workouts[w].id}
        style={{
          alignItems: "center",
          width: "100%",
          height: 100,
        }}
      >
        <View
          style={{
            backgroundColor: "#222222",
            padding: 7,
            borderRadius: 10,
            width: "100%",
            height: "90%",
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 25, color: 'white' }}>{workouts[w].name}</Text>
            <Text style={{ fontSize: 13, color: 'grey', marginRight: 2 }}>{workouts[w].date}</Text>
          </View>
          <Text style={{ color: '#74B3CE' }}>{"Duration: " + workouts[w].duration + " min"}</Text>
          <Text style={{ color: '#09BC8A' }}>{"Calories: " + workouts[w].calories + " cal"}</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.full}>
        <View style={styles.container}>
          <View style={[styles.topBar, { flex: 2 }]}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.welcome}>{formattedDate}</Text>
              <Text style={{ color: 'white', fontSize: 32 }}>Today's Progress</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile", { ...profileData })}
              style={[styles.btn_shape, { marginHorizontal: 10 }]}
            >
              <Text style={{ color: '#004346', fontSize: 26, alignSelf: "center", }}>{profileData.name[0]}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.progressContainer, { flex: 2 }]}>
            <View style={{ flexDirection: "column", justifyContent: "center", width: "100%" }}>
              <Text style={{ fontSize: "14px", color: '#09BC8A', }}>Calories: 234/350</Text>
              <Progress.Bar progress={0.7} width={null} color={'#09BC8A'} />
              <Text style={{ marginTop: 6, fontSize: "14px", color: '#74B3CE', }}>Activity: 10/20 Minutes</Text>
              <Progress.Bar progress={0.5} width={null} color={'#74B3CE'} />
              <Text style={{ marginTop: 6, fontSize: "14px", color: '#508991', }}>Distance: 3/10 Km</Text>
              <Progress.Bar progress={0.3} width={null} color={'#508991'} />
            </View>
          </View>
          <View style={[styles.historyText, { flex: 1 }]}>
            <Text style={{ color: 'white', fontSize: 22, }}>History</Text>
          </View>


          <ScrollView horizontal={false} style={[styles.box, { flex: 8 }]} >
            <View>{exercise}</View>
          </ScrollView>
          <View style={[styles.startButtonContainer, { flex: 1 }]}>
            <TouchableOpacity
              // onPress={() => {
              //   this.props.navigation.navigate("Exercise", {
              //     username: this.props.navigation.state.params.username,
              //     token: this.props.navigation.state.params.token,
              //   });
              // }}
              style={styles.startButton}
            >
              <Text style={{ color: '#004346', fontSize: 16, fontWeight: "bold"}}>New Exercise</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  full: {
    backgroundColor: 'black',
    height: "100%"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: 'black',
    marginHorizontal: 20,
    height: "100%"
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center"
  },
  welcome: {
    width: "100%",
    color: 'grey',
    fontSize: 12,
    textTransform: "uppercase"
  },
  progressContainer: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#222222",
    padding: 10,
    borderRadius: 10,
  },
  historyText: {
    alignSelf: "flex-start",
    justifyContent: "center"
  },
  title: {
    color: "white",
    fontSize: 22,
  },
  box: {
    backgroundColor: "black",
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  btn_box: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 2,
    alignContent: "center",
  },
  startButton: {
    backgroundColor: "#09bc8a",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#004346",
    margin: 10,
    width: "100pt",
    height: "30pt",
    justifyContent: "center"
  },
  startButtonContainer: {
    justifyContent: "center",
    textAlign: "center",
  },
  btn_shape: {
    backgroundColor: "#09bc8a",
    borderRadius: "50%",
    borderWidth: 2,
    borderColor: "#004346",
    margin: 10,
    height: "30pt",
    width: "30pt",
    textAlign: "center",
  }
});

export default HomePage;
