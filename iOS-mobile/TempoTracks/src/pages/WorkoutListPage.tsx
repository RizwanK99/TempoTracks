import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-paper";
import { FAB, Appbar } from "react-native-paper";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Searchbar } from "react-native-paper";
import { useGetWorkoutTemplates } from "../api/WorkoutTemplate.ts";
import { Tables } from "../lib/db.types.ts";
import { useAppTheme } from "../provider/PaperProvider.tsx";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  // const [user, setUser] = useState<Tables<'users'> | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const theme = useAppTheme();

  const [filteredData, setFilteredData] = useState<
    Tables<"workout_templates">[] | null
  >();
  const { data, error, isPending } = useGetWorkoutTemplates(
    "c51056f2-c58f-4994-99e0-32c36ef3758b"
  );

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

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);

    const filteredData = data?.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const handleSearch = () => {
    const filteredData = data?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const workoutIcons: { [key: string]: string } = {
    Biking: "bike",
    Walking: "walk",
    Running: "run",
    HIIT: "timer",
  };

  const getIconName = (workoutType: string) => {
    return workoutIcons[workoutType];
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header
        mode="small"
        statusBarHeight={0}
        elevated
        style={{ backgroundColor: theme.colors.background }}
      >
        <Appbar.Content
          title="Workouts"
          style={{ backgroundColor: theme.colors.background }}
        />
        <Appbar.Action
          icon="history"
          onPress={() => navigation.navigate("WorkoutHistoryPage")}
        />
      </Appbar.Header>
      <View
        style={{ paddingHorizontal: 16, paddingVertical: 12, marginBottom: 8 }}
      >
        <Searchbar
          style={{
            borderRadius: 12,
            borderColor: theme.colors.border,
            borderWidth: 1,
          }}
          placeholder="Search"
          elevation={4}
          onChangeText={onChangeSearch}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          onClearIconPress={() => setFilteredData(null)}
        />
      </View>
      <ScrollView>
        <View style={{ flex: 1, padding: 16, gap: 16 }}>
          {(searchQuery === "" ? data : filteredData)?.map((w) => (
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
                  borderColor: theme.colors.border,
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
                <View style={{ flexDirection: "row", gap: 4 }}>
                  <MaterialCommunityIcons
                    name={getIconName(w.type) as any}
                    size={14}
                    color={theme.colors.foregroundMuted}
                  />
                  <Text
                    style={{
                      color: theme.colors.foregroundMuted,
                      fontSize: 14,
                    }}
                  >
                    {w.type}
                  </Text>
                </View>
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
                    {Number(w.expected_duration) % 60 !== 0
                      ? (Number(w.expected_duration) / 60).toFixed(1)
                      : Number(w.expected_duration) / 60}{" "}
                    {Number(w.expected_duration) / 60 === 1 ? "min" : "mins"}
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
          {filteredData?.length === 0 && searchQuery !== "" && (
            <View
              style={{
                padding: 32,
                marginTop: 48,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: theme.colors.foregroundMuted, fontSize: 16 }}
              >
                No results found
              </Text>
            </View>
          )}
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

export default WorkoutListPage;
