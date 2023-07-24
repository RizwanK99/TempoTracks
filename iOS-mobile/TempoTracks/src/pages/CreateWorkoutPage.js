import React from "react";
import { Button, Text, View } from "react-native";

const CreateWorkoutPage = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: 12,
      }}
    >
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default CreateWorkoutPage;
