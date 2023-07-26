import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import CustomBarChart from "../components/Charts/CustomBarChart";
import { AntDesign } from "@expo/vector-icons";
import Highlights from "../components/Workouts/Highlights";

const WorkoutTrendsPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
      <ScrollView>
        <View style={{ flex: 1 }}>
          <CustomBarChart />
        </View>
        <View style={{ marginTop: 20 }}>
          <Highlights />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutTrendsPage;
