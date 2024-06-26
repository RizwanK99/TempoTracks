import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  ActivityIndicator,
  Divider,
  FAB,
  Appbar,
  Searchbar,
} from "react-native-paper";
import { useState } from "react";
import { useGetWorkoutTemplates } from "../api/WorkoutTemplate.ts";
import { Tables } from "../lib/db.types.ts";
import { useAppTheme } from "../provider/PaperProvider.tsx";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { saved_user_data } from "../api/Globals.ts";

const WorkoutListPage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const theme = useAppTheme();

  const [filteredData, setFilteredData] = useState<
    Tables<"workout_templates">[] | null
  >();
  const { data, isPending: loadingWorkoutTemplates } = useGetWorkoutTemplates(
    saved_user_data.user_id
  );

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

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

  if (loadingWorkoutTemplates) {
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingBottom: 36,
      }}
    >
      <Appbar.Header
        mode="small"
        statusBarHeight={0}
        elevated
        style={{ backgroundColor: theme.colors.background }}
      >
        <Appbar.Content
          title="Workouts"
          titleStyle={{ fontSize: 31 }}
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
        icon={open ? "plus" : "dumbbell"}
        label={open ? "Create Workout" : ""}
        actions={[
          {
            icon: "chart-timeline-variant",
            label: "Workout Trends",
            onPress: () => navigation.navigate("WorkoutTrendsPage"),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            navigation.navigate("CreateWorkout");
          }
        }}
      />
    </SafeAreaView>
  );
};

export default WorkoutListPage;
