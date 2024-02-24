import * as React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import PageHeading from "../components/Workouts/PageHeading";
import { Card, Title, Paragraph, Searchbar, Chip, DefaultTheme, IconButton, MD3Colors, Text, useTheme, Divider, ActivityIndicator } from "react-native-paper";
import { getUsersWorkouts } from "../api/Workouts";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

import { Appbar, SegmentedButtons } from 'react-native-paper';  
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
  const [data, setData] = React.useState(false);

  const [visible, setVisible] = React.useState(true);

  useEffect(() => {
    async function fetchData() {
      await retrieveData(user, setUser);
      setData(true);
      setWorkouts(await getUsersWorkouts(2, null));
      setData(false);
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
      
      <View style={{ padding: 5 }}>
        <Searchbar
          elevation={4}
          onChangeText={onChangeSearch}
          value={searchQuery}
          onSubmitEditing={() => handleSearch}
          style = {{ borderRadius: 12}}
        />
        </View>
    <View style= {{ height: 40 }}>
      <ScrollView horizontal style={{ paddingHorizontal: 5, paddingBottom: 5 }}>
        <Chip icon="bike" style={{ margin: 2 }} elevated="true" onPress={() => console.log('Pressed')}>Biking</Chip>
        <Chip icon="run" style={{ margin: 2 }} elevated="true" onPress={() => console.log('Pressed')}>Running</Chip>
        <Chip icon="lightning-bolt" style={{ margin: 2 }} elevated="true" onPress={() => console.log('Pressed')}>HIIT</Chip>
        <Chip icon="walk" style={{ margin: 2 }} elevated="true" onPress={() => console.log('Pressed')}>Walking</Chip>
      </ScrollView>
      </View>
      
      
      <ScrollView>
        <ActivityIndicator animating={data} style= {{ position: 'absolute', zIndex: 1, alignSelf: 'center', paddingTop: 20}}/>
        <View style={{ paddingHorizontal: 5 }}>
          {workouts?.userWorkouts?.map((w) => (
            <WorkoutCard
              key={w.workout_id}
              id={w.workout_id}
              name={w.workout_name}
              duration={w.total_duration}
              distance={w.total_distance}
              caloriesBurnt={w.total_energy_burned}
              workoutType={w.workout_type}
              navigation={navigation}
              theme={theme}
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
  theme,
  distance
}) => {
  return (
    <Card
      style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.border, marginVertical: 5}}
      onPress={() =>
        navigation.navigate("WorkoutEndSummary", {
          workoutId: id,
          workoutName: name,
          workoutDuration: duration,
          caloriesBurnt: caloriesBurnt,
          workoutType: workoutType,
        })
      }
      mode="outlined"

    >
      <Card.Content>
        
      {/* <View
                style={{
                  borderWidth: 1,
                  borderColor:
                    // active
                    //   ? theme.colors.primary
                    //   :
                    theme.colors.border,
                  padding: 16,
                  borderRadius: 4,
                  backgroundColor: theme.colors.card,
                  gap: 10,
                }}
              > */}
                <Text
                  style={{
                    color: theme.colors.text,
                    fontSize: 20,
                    fontWeight: "bold",
                    paddingBottom: 10
                  }}
                >
                  {name}
                </Text>
                <Text
                  style={{ color: theme.colors.foregroundMuted, fontSize: 14, paddingBottom: 10 }}
                >
                  {workoutType}
                </Text>
                <Divider />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 4,
                    paddingTop: 16
                  }}
                >
                  <Text
                    style={{
                      color: theme.colors.foregroundMuted,
                      fontSize: 14,
                    }}
                  >
                    {distance} km
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.foregroundMuted,
                      fontSize: 14,
                    }}
                  >
                    {Number(duration)} mins
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.foregroundMuted,
                      fontSize: 14,
                    }}
                  >
                    {caloriesBurnt} sets
                  </Text>
                </View>
              {/* </View> */}
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
