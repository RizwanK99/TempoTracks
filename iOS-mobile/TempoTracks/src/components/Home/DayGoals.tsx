import * as React from "react";
import { View } from "react-native";
import { Button, Card, Text, Divider, IconButton, ProgressBar, Portal, Modal, TextInput } from "react-native-paper";
import { useAppTheme } from "../../provider/PaperProvider";
import { HealthManager } from "../../module/HealthManager";
import { saved_user_data } from "../../api/Globals";
import { updateDailyGoals } from "../../api/User";
import { startOfDay, format, set } from "date-fns";

import { getUsersWorkouts } from "../../api/Workouts";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useGetCompletedWorkouts } from "../../api/WorkoutsNew";

export const DailyGoals = () => {
  const theme = useAppTheme();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [text_dist, setTextDist] = React.useState(String(saved_user_data.daily_distance_goal));
  const [text_dur, setTextDur] = React.useState(String(saved_user_data.daily_duration_goal));
  const [text_cal, setTextCal] = React.useState(String(saved_user_data.daily_calorie_goal));

  const [duration, setDuration] = React.useState(0);
  const [distance, setDistance] = React.useState(0);
  const [calories, setCalories] = React.useState(0);

  const { data: completedWorkouts, isPending: loadingCompletedWorkouts } =
    useGetCompletedWorkouts(saved_user_data.user_id);

  async function getDailyWorkouts(workoutData) {
    const todaysDate = startOfDay(new Date());
    const dailyWorkouts = workoutData.filter((workout) => {
      const workoutStart = startOfDay(new Date(workout.time_start));
      return workoutStart.getTime() === todaysDate.getTime();
    });
    const totalDuration = dailyWorkouts.reduce((accumulator, workout) => {
      return accumulator + workout.total_duration;
    }, 0);
    setDuration(totalDuration);
    const totalDistance = dailyWorkouts.reduce((accumulator, workout) => {
      return accumulator + workout.total_distance;
    }, 0);
    setDistance(totalDistance);
    const totalCalories = dailyWorkouts.reduce((accumulator, workout) => {
      return accumulator + workout.total_energy_burned;
    }, 0);
    setCalories(totalCalories);
  }
  
  React.useEffect(() => {
    getDailyWorkouts(completedWorkouts);
  }, [completedWorkouts]);


  async function saveData() {
    updateDailyGoals(saved_user_data.user_id, text_dist, text_cal, text_dur);
    setVisible(false);
  }


  return (
    <Card>
      <Card.Content>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text variant="headlineMedium" style={{ color: theme.colors.text, paddingHorizontal: 5 }}>Today's Progress</Text>
          <IconButton icon="pencil" size={20} onPress={showModal} />
        </View>
        <Divider style={{ marginVertical: 10 }} />

        <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ top:0, position: 'absolute', width: "100%", padding: 10 }}>
          <Card>
            <Card.Title title="Edit Daily Goals" titleVariant="titleLarge"></Card.Title>
            <Card.Content>
              <TextInput label="Distance" value={text_dist} onChangeText={setTextDist} keyboardType="numeric" dense style={{ marginBottom: 10 }} />
              <TextInput label="Duration" value={text_dur} onChangeText={setTextDur} keyboardType="numeric" dense style={{ marginBottom: 10 }} />
              <TextInput label="Calories" value={text_cal} onChangeText={setTextCal} keyboardType="numeric" dense />
              <Button mode="elevated" style={{ marginTop: 10 }} onPress={saveData}>Save</Button>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
          <Button textColor={theme.colors.text} icon="map">Distance</Button>
          <Text style={{ color: theme.colors.foregroundMuted }}>{distance.toFixed(0)} km</Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <ProgressBar progress={(distance)/parseInt(text_dist) || 1} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0</Text>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>{text_dist} km</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
          <Button textColor={theme.colors.text} style={{ alignSelf: "flex-start" }} icon="terrain">Duration</Button>
          <Text style={{ color: theme.colors.foregroundMuted }}>{duration.toFixed(0)} mins</Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <ProgressBar progress={(duration)/parseInt(text_dur) || 1} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0</Text>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>{text_dur} mins</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
          <Button textColor={theme.colors.text} style={{ alignSelf: "flex-start" }} icon="fire">Calories</Button>
          <Text style={{ color: theme.colors.foregroundMuted }}>{calories.toFixed(0)} cals</Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <ProgressBar progress={(calories)/parseInt(text_cal) || 1} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0</Text>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>{text_cal} cals</Text>
        </View>
      </Card.Content>
    </Card>
  );
};
