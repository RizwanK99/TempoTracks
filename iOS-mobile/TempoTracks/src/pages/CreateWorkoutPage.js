import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, Button, View } from "react-native";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { CreateWorkoutTemplateForm } from "../components/Workouts/CreateWorkoutTemplateForm.tsx";

async function retrieveData(user, setUser) {
  try {
    const value = await AsyncStorage.getItem("user_data");
    if (value !== null) {
      let userData = JSON.parse(value);
      await setUser(userData);
    }
  } catch (error) {
    console.log("Error retreiving user data", error);
  }
}

const CreateWorkoutPage = ({ navigation }) => {
  const theme = useTheme();
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      await retrieveData(user, setUser);
    }
    fetchData();
  }, [user.user_id]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView
          style={{
            flex: 1,
            paddingHorizontal: 12,
            backgroundColor: theme.colors.background,
          }}
        >
          <Header navigation={navigation} />
          <ScrollView style={{ flex: 1 }}>
            <SafeAreaView style={{ paddingHorizontal: 8, marginTop: 18 }}>
              <CreateWorkoutTemplateForm
                navigation={navigation}
                userId={user.user_id}
              />
            </SafeAreaView>
          </ScrollView>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const Header = ({ navigation }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        alignItems: "flex-start",
        flexDirection: "row",
      }}
    >
      <Button onPress={() => navigation.goBack()} title="Cancel" />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 8,
          marginRight: 50,
        }}
      >
        <Text
          style={{ fontSize: 18, fontWeight: "bold", color: theme.colors.text }}
        >
          Create Workout
        </Text>
      </View>
    </View>
  );
};

export default CreateWorkoutPage;
