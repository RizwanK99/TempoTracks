import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView
} from 'react-native';
import { Button } from 'react-native-web';

const HomePage = ({ navigation }) => {
  let exercise = [];
  exercise.push(
    <View
      key="Run"
      style={{
        alignItems: "center",
        width: 340,
        height: 100,
        paddingTop: 8,
        marginBottom: 15,
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
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>5k Run</Text>
        <Text>{"Duration: 15 min"}</Text>
        <Text>{"Calories: 500 cal"}</Text>
      </View>
    </View>
  );

  exercise.push(
    <View
      key="Bike"
      style={{
        alignItems: "center",
        width: 340,
        height: 100,
        paddingTop: 8,
        marginBottom: 15,
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
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>5k Cycling</Text>
        <Text>{"Duration: 55 min"}</Text>
        <Text>{"Calories: 500 cal"}</Text>
      </View>
    </View>
  );

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
      backgroundColor: "rgba(74,144,226,1)",
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
      backgroundColor: "rgba(178,108,233,1)",
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


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ fontSize: 25, textAlign: 'center', margin: 16 }}>
        TempoTracks Home
      </Text>
      <View style={styles.container}>
        <View style={styles.progress}>
          <View style={styles.title_box}>
            <Text style={styles.title}>Today's Progress! 🏃</Text>
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
            // onPress={() =>
            //   this.props.navigation.navigate("Profile", {
            //     username: this.props.navigation.state.params.username,
            //     token: this.props.navigation.state.params.token,
            //   })
            // }
            style={[styles.btn_shape, { marginHorizontal: 10 }]}
          >
            <Text style={styles.btn_text}>View Profile</Text>
          </TouchableOpacity>
        </View>


    </SafeAreaView>
  );
}


export default HomePage;