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
import { Card, Title, Paragraph, Searchbar, Chip } from "react-native-paper";
import { getUsersWorkouts } from "../api/Workouts";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

import { Appbar, SegmentedButtons } from 'react-native-paper';
import { useTheme } from "@emotion/react";
import { ca } from "date-fns/locale";


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

  const theme = useTheme();

  const [visible, setVisible] = React.useState(true);

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
 //TODO: Add Chips to database
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header mode="small" statusBarHeight={0} elevated="true" style={{ backgroundColor: theme.colors.background}}>
        <Appbar.BackAction onPress={() => navigation.navigate("WorkoutTrends")} />
        <Appbar.Content title="History" />
      </Appbar.Header>
      
      <View style={{ padding: 5, paddingHorizontal: 10 }}>
        <Searchbar
          elevation={4}
          onChangeText={onChangeSearch}
          value={searchQuery}
          onSubmitEditing={() => handleSearch}
        />
        </View>
      <View style={{ justifyContent: "center", paddingHorizontal: 5, paddingBottom: 5, flexDirection: 'row', flexWrap: 'wrap' }}>
        <Chip icon="bike" style={{ width: 90, margin: 2 }} elevated="true" onPress={() => console.log('Pressed')}>Biking</Chip>
        <Chip icon="run" style={{ width: 100, margin: 2 }} elevated="true" onPress={() => console.log('Pressed')}>Running</Chip>
        <Chip icon="lightning-bolt" style={{ width: 75, margin: 2 }} elevated="true" onPress={() => console.log('Pressed')}>HIIT</Chip>
        <Chip icon="walk" style={{ width: 95, margin: 2 }} elevated="true" onPress={() => console.log('Pressed')}>Walking</Chip>
      </View>
      
      
      
        
      <ScrollView>
        <View style={{ paddingHorizontal: 5 }}>
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
        {mapWorkoutsToChips(workoutType)}
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

const mapWorkoutsToChips = (workoutType) => {
  switch (workoutType) {
    case "cardio":
      return <Chip icon="run" style={{ width: 100, margin: 2 }} elevated="true" onPress={() => console.log('Pressed')}>Running</Chip>
    case "biking":
      return <Chip icon="bike" style={{ width: 90, margin: 2 }} elevated="true" onPress={() => console.log('Pressed')}>Biking</Chip>
    case "hiit":
      return <Chip icon="lightning-bolt" style={{ width: 75, margin: 2 }} elevated="true" onPress={() => console.log('Pressed')}>HIIT</Chip>
    case "jogging":
      return <Chip icon="walk" style={{ width: 95, margin: 2 }} elevated="true" onPress={() => console.log('Pressed')}>Walking</Chip>

  }

};

export default WorkoutHistoryPage;
