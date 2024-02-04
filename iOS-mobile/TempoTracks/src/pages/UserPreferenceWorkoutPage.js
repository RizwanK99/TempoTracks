import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PageHeading from "../components/Workouts/PageHeading";
import ThemeSwitch from "../components/ThemeSwitch";

const UserPreferenceWorkoutPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Workouts")}>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 8,
            marginTop: 8,
            alignItems: "center",
          }}
        >
          <>
            <AntDesign name="left" size={20} color="#007AFF" />
            <Text style={{ color: "#007AFF", fontSize: 16 }}>Back</Text>
          </>
        </View>
      </TouchableWithoutFeedback>
      <View style={{ marginTop: 30, marginLeft: 8 }}>
        <PageHeading title={"A Workout For You"} />
        <ThemeSwitch />
      </View>
    </SafeAreaView>
  );
};

export default UserPreferenceWorkoutPage;
