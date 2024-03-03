import * as React from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import {
  Card,
  Searchbar,
  Chip,
  Text,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import { useGetCompletedWorkouts } from "../api/WorkoutsNew";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Tables } from "../lib/db.types";
import { useAppTheme } from "../provider/PaperProvider";
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

const types = [
  { label: "Biking", value: "Biking", icon: "bike" },
  { label: "Running", value: "Running", icon: "run" },
  { label: "Walking", value: "Walking", icon: "walk" },
  { label: "HIIT", value: "HIIT", icon: "timer" },
];

export type WorkoutType = "Biking" | "HIIT" | "Walking" | "Running";

interface ChipProps {
  selectedTypes: WorkoutType[];
  onSelect: (type: WorkoutType) => void;
}

const FilterChips: React.FC<ChipProps> = ({ selectedTypes, onSelect }) => {
  const theme = useAppTheme();
  return (
    <ScrollView
      horizontal
      style={{
        paddingHorizontal: 16,
        marginRight: 36,
        width: "100%",
        marginTop: 4,
      }}
    >
      {types.map((type) => (
        <Chip
          key={type.value}
          icon={() => (
            <Icon
              name={type.icon as any}
              color={
                selectedTypes.includes(type.value as WorkoutType)
                  ? theme.colors.text
                  : theme.colors.primary
              }
              size={16}
            />
          )}
          style={{
            margin: 2,
            backgroundColor: selectedTypes.includes(type.value as WorkoutType)
              ? theme.colors.primary
              : undefined,
          }}
          elevated
          onPress={() => onSelect(type.value as WorkoutType)}
        >
          {type.label}
        </Chip>
      ))}
    </ScrollView>
  );
};

const WorkoutHistoryPage = ({ navigation }) => {
  const { data: completedWorkouts, isPending: loadingCompletedWorkouts } =
    useGetCompletedWorkouts();

  const [user, setUser] = useState({});
  const [searchQuery, setSearchQuery] = React.useState("");

  const [filteredData, setFilteredData] = useState<
    Tables<"workouts">[] | null
  >();

  const theme = useAppTheme();
  const [data, setData] = React.useState(false);

  const [activeFilters, setActiveFilters] = React.useState<WorkoutType[]>([]);

  const toggleType = (type: WorkoutType) => {
    const index = activeFilters.indexOf(type);
    if (index === -1) {
      setActiveFilters([...activeFilters, type]);
    } else {
      const updatedTypes = [...activeFilters];
      updatedTypes.splice(index, 1);
      setActiveFilters(updatedTypes);
    }
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     await retrieveData(user, setUser);
  //     setData(true);
  //     setWorkouts(await getUsersWorkouts(2, null));
  //     setData(false);
  //   }
  //   fetchData();
  // }, [user.user_id]);

  useEffect(() => {
    const filteredWorkouts = completedWorkouts?.filter((workout) =>
      activeFilters.includes(workout.workout_type)
    );
    setFilteredData(filteredWorkouts);
  }, [activeFilters]);

  if (loadingCompletedWorkouts) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 12,
          backgroundColor: theme.colors.background,
          gap: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);

    const filteredData = completedWorkouts?.filter((item) =>
      item.workout_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const handleSearch = () => {
    const filteredData = completedWorkouts?.filter((item) =>
      item.workout_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header
        mode="small"
        statusBarHeight={0}
        elevated
        style={{ backgroundColor: theme.colors.background }}
      >
        <Appbar.BackAction
          onPress={() => navigation.navigate("WorkoutListPage")}
        />
        <Appbar.Content title="History" />
      </Appbar.Header>

      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <Searchbar
          elevation={4}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          style={{
            borderRadius: 12,
            borderColor: theme.colors.border,
            borderWidth: 1,
          }}
        />
      </View>
      <View style={{ height: 40 }}>
        <FilterChips selectedTypes={activeFilters} onSelect={toggleType} />
      </View>

      <ScrollView>
        <ActivityIndicator
          animating={data}
          style={{
            position: "absolute",
            zIndex: 1,
            alignSelf: "center",
            paddingTop: 20,
          }}
        />
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          {(searchQuery === "" && activeFilters.length === 0
            ? completedWorkouts
            : filteredData
          )?.map((w) => (
            <WorkoutCard
              key={w.workout_id}
              id={w.workout_id}
              name={w.workout_name}
              duration={w.total_duration}
              distance={w.total_distance}
              caloriesBurnt={w.total_energy_burned}
              workoutType={w.workout_type}
              navigation={navigation}
              completedAt={w.time_end}
              theme={theme}
            />
          ))}
          {filteredData?.length === 0 &&
            (searchQuery !== "" || activeFilters.length > 0) && (
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
  distance,
  completedAt,
}) => {
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
    <Card
      style={{
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        marginVertical: 5,
        borderRadius: 4,
      }}
      onPress={() =>
        navigation.navigate("WorkoutEndSummary", {
          workoutId: id,
        })
      }
      mode="outlined"
    >
      <Card.Content>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 20,
            fontWeight: "bold",
            paddingBottom: 8,
          }}
        >
          {name}
        </Text>
        <View style={{ flexDirection: "row", gap: 4, paddingBottom: 4 }}>
          <MaterialCommunityIcons
            name={getIconName(workoutType) as any}
            size={14}
            color={theme.colors.foregroundMuted}
          />
          <Text
            style={{
              color: theme.colors.foregroundMuted,
              fontSize: 14,
            }}
          >
            {workoutType}
          </Text>
        </View>
        <Text
          style={{
            color: theme.colors.foregroundMuted,
            marginTop: 4,
            paddingBottom: 8,
            fontStyle: "italic",
            fontSize: 12,
          }}
        >
          Completed:{" "}
          {new Date(completedAt).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </Text>
        <Divider />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 4,
            paddingTop: 16,
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
      </Card.Content>
    </Card>
  );
};

export default WorkoutHistoryPage;
