import React, { useEffect, useState } from "react";
import { Switch } from "react-native-paper";
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
import { createWorkout } from "../api/Workouts";
import CustomCarousel from "../components/Workouts/CustomCarousel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slider } from 'react-native-elements';

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
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 12 }}>
      <Header navigation={navigation} />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 8, marginTop: 18 }}>
          <WorkoutDetailsForm navigation={navigation} />
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

const WorkoutDetailsForm = ({ navigation }) => {

  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      await retrieveData(user, setUser);
    }
    fetchData();
  }, [user.user_id]);


  const [formData, setFormData] = useState({
    workoutName: "",
    description: "",
    workoutType: "",
    trainingIntervals: "",
    timeDuration: "",
    totalDistance: "",
    playlistId: "",
    trainingDuration: "",
    status: "",
  });
  const [category, setCategory] = React.useState("biking");
  const [totalDistance, setTotalDistance] = React.useState(5);
  const [carouselItem, setCarouselItem] = useState(0);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const handleFormChange = (fieldName, text) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: text,
    }));
  };

  const handleSliderChange = (value) => {
    setTotalDistance(value);
  };

  const handleItemTap = (index) => {
    setCarouselItem(index);
    return index;
  };

  React.useEffect(() => {
    handleFormChange("workoutType", category.toLowerCase());
    handleFormChange("totalDistance", totalDistance);
    const playlistId = playListMockData[carouselItem].id;
    handleFormChange("playlistId", playlistId);
    const status = isSwitchOn ? "started" : "not_started";
    handleFormChange("status", status);
  }, [category, totalDistance, carouselItem, isSwitchOn]);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Workout Name"
          value={formData.workoutName}
          onChange={(event) =>
            handleFormChange("workoutName", event.nativeEvent.text)
          }
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
          onChange={(event) =>
            handleFormChange("trainingIntervals", event.nativeEvent.text)
          }
        />
      </View>
      <View style={{ paddingHorizontal: 6 }}>
        <FormHeading text="Training Duration" />
        <TextInput
          style={styles.smallInput}
          placeholder="Desired duration of training session in mins"
          onChange={(event) =>
            handleFormChange("timeDuration", event.nativeEvent.text)
          }
        />
      </View>
      <View style={{ paddingHorizontal: 6 }}>
        <FormHeading text="Estimated Distance" />
        <Text>{totalDistance.toFixed(2)} kilometers</Text>
        <Slider
          value={totalDistance}
          onValueChange={handleSliderChange}
          step={0.25}
          minimumValue={0}
          maximumValue={20}
          trackStyle={styles.trackStyle}
          thumbStyle={styles.thumbStyle}
          thumbTintColor="#000"
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
      <View style={{ paddingHorizontal: 6, marginTop: 8 }}>
        <FormHeading text="Pick a playlist" />
        <CustomCarousel
          carouselData={playListMockData}
          handleItemTap={handleItemTap}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 6,
          marginTop: 28,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <FormHeading text="Start right away?" />
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          trackColor={"#fff"}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 34,
          marginBottom: 14,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            createWorkout(
              user.user_id,
              formData.status,
              formData.timeDuration,
              formData.workoutType,
              formData.totalDistance,
              formData.trainingIntervals,
              formData.workoutName,
              formData.playlistId
            );
            if (isSwitchOn) {
              navigation.navigate("WorkoutInProgress");
            }
            if (!isSwitchOn) {
              navigation.navigate("Workouts");
            }
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "#FFF" }}>
              {isSwitchOn ? "Start" : "Create"}
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
  trackStyle: {
    height: 10,
    borderRadius: 5,
  },
  thumbStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

const playListMockData = [
  {
    id: "1",
    title: "Playlist 1",
    image: require("../assets/album-art-light.jpg"),
    artists: "Test",
  },
  {
    id: "2",
    title: "Playlist 2",
    image: require("../assets/album-art-light.jpg"),
    artists: "Test",
  },
  {
    id: "3",
    title: "Playlist 3",
    image: require("../assets/album-art-light.jpg"),
    artists: "Test",
  },
];

export default CreateWorkoutPage;
