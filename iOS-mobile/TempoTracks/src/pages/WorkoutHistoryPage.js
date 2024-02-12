import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import PageHeading from "../components/Workouts/PageHeading";
import { Card, Title, Paragraph } from "react-native-paper";
import { getUsersWorkouts } from "../api/Workouts";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";

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

const WorkoutHistoryPage = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState({});
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    async function fetchData() {
      await retrieveData(user, setUser);
      setWorkouts(await getUsersWorkouts(user.user_id, null));
    }
    fetchData();
  }, [user.user_id]);

  const handleSearch = () => {
    const filteredData = workouts.filter(
      (item) =>
        item.workout_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.time_duration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.total_energy_burned.toString().includes(searchQuery) ||
        item.workout_type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };

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
        <PageHeading title={"Your Workouts"} />
      </View>
      <View
        style={{ paddingHorizontal: 16, paddingVertical: 12, marginBottom: 8 }}
      >
        <Searchbar
          style={{ borderRadius: 12 }}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onSubmitEditing={() => handleSearch}
        />
      </View>
      <ScrollView>
        <View style={{ flex: 1, padding: 16 }}>
          {workouts?.userWorkouts?.map((w) => (
            <WorkoutCard
              key={w.workout_id}
              id={w.workout_id}
              name={w.workout_name}
              duration={w.time_duration}
              caloriesBurnt={w.total_energy_burned}
              workoutType={w.workout_type}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const WorkoutCard = ({
  id,
  name,
  duration,
  caloriesBurnt,
  workoutType,
  navigation,
}) => {
  return (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate("WorkoutEndSummary", {
          workoutId: id,
          workoutName: name,
          workoutDuration: duration,
          caloriesBurnt: caloriesBurnt,
          workoutType: workoutType,
        })
      }
    >
      <Card.Content>
        <Title style={styles.title}>{name}</Title>
        <Paragraph style={styles.details}>Duration: {duration}</Paragraph>
        <Paragraph style={styles.details}>
          Calories Burnt: {caloriesBurnt}
        </Paragraph>
        <Paragraph style={styles.details}>
          Workout Type: {workoutType}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#222",
    marginBottom: 16,
    elevation: 4,
    borderRadius: 8,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 8,
    fontWeight: "bold",
  },
  details: {
    color: "#74B3CE",
    fontSize: 16,
    marginBottom: 4,
  },
});

export default WorkoutHistoryPage;
