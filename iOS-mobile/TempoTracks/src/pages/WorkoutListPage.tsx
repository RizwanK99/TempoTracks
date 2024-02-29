import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-paper";
import { Card, Title, Paragraph, FAB, Appbar } from "react-native-paper";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Searchbar } from "react-native-paper";
import { useGetWorkoutTemplates } from "../api/WorkoutTemplate.ts";
import { Tables } from "../lib/db.types.ts";
import { useAppTheme } from "../provider/PaperProvider.tsx";

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

const WorkoutListPage = ({ navigation }) => {
  const [workouts, setWorkouts] = useState<Tables<"workouts">[]>([]);
  // const [user, setUser] = useState<Tables<'users'> | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const theme = useAppTheme();

  const onChangeSearch = (query) => setSearchQuery(query);
  const [filteredData, setFilteredData] = useState({});
  const { data, error, isPending } = useGetWorkoutTemplates(1);
  const [active, setActive] = useState(false);

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  // useEffect(() => {
  //   async function fetchData() {
  //     await retrieveData(user, setUser);
  //     setWorkouts(await getUsersWorkouts(user.user_id, null));
  //   }
  //   fetchData();
  // }, [user.user_id]);

  // TODO: should be
  // const { workouts } = useGetWorkouts();

  const handleSearch = () => {
    const filteredData = workouts.filter(
      (item) =>
        item.workout_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.total_duration
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.total_energy_burned.toString().includes(searchQuery) ||
        item.workout_type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <Appbar.Header
        mode="small"
        statusBarHeight={0}
        elevated
        style={{ backgroundColor: theme.colors.background }}
      >
        <Appbar.Content title="Workouts" />
        <Appbar.Action
          icon="history"
          onPress={() => navigation.navigate("WorkoutHistoryPage")}
        />
      </Appbar.Header>
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
        <View style={{ flex: 1, padding: 16, gap: 16 }}>
          {/* {workouts?.userWorkouts?.map((w) => (
            <WorkoutCard
              key={w.workout_id}
              id={w.workout_id}
              name={w.workout_name}
              duration={w.time_duration}
              caloriesBurnt={w.total_energy_burned}
              workoutType={w.workout_type}
              navigation={navigation}
            />
          ))} */}
          {data?.map((w) => (
            <TouchableOpacity
              key={w.id}
              onPress={() =>
                navigation.navigate("IndividualWorkoutTemplatePage", {
                  templateId: w.id,
                })
              }
            >
              <View
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
              >
                <Text
                  style={{
                    color: theme.colors.text,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {w.name}
                </Text>
                <Text
                  style={{ color: theme.colors.foregroundMuted, fontSize: 14 }}
                >
                  {w.type}
                </Text>
                <Divider />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 4,
                  }}
                >
                  <Text
                    style={{
                      color: theme.colors.foregroundMuted,
                      fontSize: 14,
                    }}
                  >
                    {w.expected_distance} km
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.foregroundMuted,
                      fontSize: 14,
                    }}
                  >
                    {Number(w.expected_duration) / 60} mins
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.foregroundMuted,
                      fontSize: 14,
                    }}
                  >
                    {w.num_sets} sets
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <FAB.Group
        visible
        style={{ paddingBottom: 3, position: "absolute" }}
        open={open}
        variant="surface"
        icon={open ? "lightning-bolt" : "headphones"}
        label={open ? "Start A New Workout" : ""}
        actions={[
          {
            icon: "plus",
            label: "Create New Workout",
            onPress: () => navigation.navigate("CreateWorkout"),
          },
          // {
          //   icon: 'chart-timeline-variant',
          //   label: 'Workout Trends',
          //   onPress: () => navigation.navigate("WorkoutTrends"),
          // }
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
            navigation.navigate("WorkoutInProgress", { undefined });
          }
        }}
      />
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
        navigation.navigate("IndividualWorkout", {
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

export default WorkoutListPage;
