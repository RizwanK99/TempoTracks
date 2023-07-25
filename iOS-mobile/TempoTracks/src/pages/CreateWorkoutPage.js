import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";

const CreateWorkoutPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 12 }}>
      <Header navigation={navigation} />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 8, marginTop: 18 }}>
          <WorkoutDetailsForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Header = ({ navigation }) => {
  return (
    <View
      style={{
        alignItems: "flex-start",
        flexDirection: "row",
      }}
    >
      <Button title="Cancel" onPress={() => navigation.goBack()} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 8,
          marginRight: 50,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Create Workout</Text>
      </View>
    </View>
  );
};

const WorkoutDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    trainingIntervals: "",
  });

  const handleFormChange = (fieldName, text) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: text,
    }));
  };

  const [category, setCategory] = React.useState("biking");
  React.useEffect(() => {
    handleFormChange("category", category);
  }, [category]);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Workout Name"
          value={formData.name}
          onChange={(event) => handleFormChange("name", event.nativeEvent.text)}
          style={styles.largeInput}
        />
      </View>
      <View>
        <TextInput
          placeholder="Description goes here..."
          value={formData.description}
          onChange={(event) =>
            handleFormChange("description", event.nativeEvent.text)
          }
          style={styles.smallInput}
        />
      </View>
      <View style={{ paddingHorizontal: 6 }}>
        <FormHeading text="Training Intervals" />
        <TextInput
          style={styles.smallInput}
          placeholder="Desired training interval in mins"
        />
      </View>
      <View style={{ paddingHorizontal: 6, marginTop: 16 }}>
        <FormHeading text="Category" />
        <RadioButton.Group
          onValueChange={(value) => setCategory(value)}
          value={category}
        >
          <RadioButton.Item label="Biking" value="biking" />
          <RadioButton.Item label="Jogging" value="jogging" />
          <RadioButton.Item label="Hiking" value="hiking" />
          <RadioButton.Item label="HIIT" value="hiit" />
        </RadioButton.Group>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 34,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={styles.button}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "#FFF" }} onPress={() => createWorkout()}>
              Create
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FormHeading = ({ text }) => {
  return <Text style={{ fontWeight: "bold", fontSize: 18 }}>{text}</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  largeInput: {
    flex: 1,
    height: 60,
    paddingHorizontal: 4,
    marginBottom: 12,
    fontSize: 24,
  },
  smallInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 6,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    borderRadius: 20,
    border: "2px solid #222222",
    backgroundColor: "#222222",
    width: "100%",
    height: 60,
    alignitems: "flex-end",
  },
});

function createWorkout() {
  const payload = {
    user_id: 16,
    workout_name: "test",
    workout_type: "cardio",
    workout_name: "api's run"
  }

  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  headers.append("Access-Control-Allow-Credentials", "true");

  fetch('https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/create-workout', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      payload: payload,
    }),
  });

}

export default CreateWorkoutPage;
