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
import { Button } from "@mui/material";
import { useTheme } from "@emotion/react";

const UserPreferenceWorkoutPage = ({ navigation }) => {
  const theme = useTheme();
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
        <Text style={{ color: theme.colors.primary }}>Here is theme test</Text>
      </View>
    </SafeAreaView>
  );
};

export default UserPreferenceWorkoutPage;
