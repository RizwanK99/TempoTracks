import React from "react";
import { Button, Text, View } from "react-native";

const IndividualWorkoutPage = ({ navigation }) => {
  return (
    <View>
      <Text>Individual workout screen</Text>
      <Button title="navigate back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default IndividualWorkoutPage;
