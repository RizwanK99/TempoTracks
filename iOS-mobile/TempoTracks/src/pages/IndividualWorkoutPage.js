import React from "react";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";

const IndividualWorkoutPage = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            paddingHorizontal: 12,
          }}
        >
          <Button title="Cancel" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndividualWorkoutPage;
