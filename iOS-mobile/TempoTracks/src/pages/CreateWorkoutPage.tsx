import React from "react";
import { SafeAreaView, ScrollView, Text, Button, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { CreateWorkoutTemplateForm } from "../components/Workouts/CreateWorkoutTemplateForm.tsx";
import { saved_user_data } from "../api/Globals.ts";
import { useAppTheme } from "../provider/PaperProvider.tsx";

const CreateWorkoutPage = ({ navigation }) => {
  const theme = useAppTheme();

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
                userId={saved_user_data.user_id}
              />
            </SafeAreaView>
          </ScrollView>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const Header = ({ navigation }) => {
  const theme = useAppTheme();
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
          style={{ fontSize: 20, fontWeight: "bold", color: theme.colors.text }}
        >
          Create Workout
        </Text>
      </View>
    </View>
  );
};

export default CreateWorkoutPage;
