import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PageHeading from "../components/Workouts/PageHeading";
import SectionHeading from "../components/Workouts/SectionHeading";
import { Ionicons } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import CustomButton from "../components/Button/CustomButton";

const universityOfWaterlooCoordinates = {
  latitude: 43.4723,
  longitude: -80.5449,
};

const IndividualWorkoutPage = ({ route, navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const {
    workoutId,
    workoutName,
    workoutDuration,
    caloriesBurnt,
    workoutType,
  } = route.params;

  useEffect(() => {
    (async () => {
      // Check for permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      // Get current location
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View>
          <PageHeading title={workoutName} />
        </View>
        <View style={{ marginTop: 16 }}>
          <SectionHeading title={"Workout Details"} />
        </View>
        <View style={{ marginTop: 8 }}>
          <WorkoutDetailSection
            workoutDuration={workoutDuration}
            workoutType={workoutType}
            caloriesBurnt={caloriesBurnt}
          />
        </View>
        <View style={{ marginTop: 24 }}>
          <SectionHeading title={"Track Session"} />
        </View>
        <View style={{ marginTop: 8 }}>
          <MapView
            style={{ height: 250, borderRadius: 8, overflow: "hidden" }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              ...universityOfWaterlooCoordinates,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421,
            }}
            region={
              currentLocation
                ? {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421,
                  }
                : undefined
            }
          >
            {currentLocation ? (
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                title="Starting Point"
              />
            ) : (
              <Marker
                coordinate={{
                  latitude: universityOfWaterlooCoordinates.latitude,
                  longitude: universityOfWaterlooCoordinates.longitude,
                }}
              />
            )}
          </MapView>
        </View>
        <View style={{ marginTop: 24, marginBottom: 12 }}>
          <CustomButton
            label={"Start"}
            backgroundColor="#09BC8A"
            handlePress={() =>
              navigation.navigate("WorkoutInProgress", { workoutId })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const WorkoutDetailSection = ({
  workoutDuration,
  caloriesBurnt,
  workoutType,
}) => {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 8,
        padding: 8,
        borderWidth: 2,
        borderColor: "#FFF",
        borderRadius: 8,
        padding: 8,
        shadowColor: "#222222",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <View style={{ marginBottom: 8 }}>
        <Detail
          detailTitle={"Duration"}
          detailText={workoutDuration + " mins"}
          iconName={"ios-timer"}
        />
      </View>
      <View style={{ marginBottom: 8 }}>
        <Detail
          detailTitle={"Calories Burnt"}
          detailText={caloriesBurnt + " cals"}
          iconName={"flame"}
        />
      </View>
      <View style={{ marginBottom: 8 }}>
        <Detail
          detailTitle={"Workout Type"}
          detailText={workoutType}
          iconName={"walk"}
        />
      </View>
    </View>
  );
};

const Detail = ({ iconName, detailTitle, detailText }) => {
  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name={iconName} size={24} color="white" />
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          {detailTitle}
        </Text>
      </View>
      <View style={{ paddingHorizontal: 24 }}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
          {detailText}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default IndividualWorkoutPage;
