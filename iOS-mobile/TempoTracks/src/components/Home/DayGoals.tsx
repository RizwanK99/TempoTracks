import * as React from "react";
import { View } from "react-native";
import { Button, Card, Text, Divider, IconButton, ProgressBar, Portal, Modal, TextInput } from "react-native-paper";
import { useAppTheme } from "../../provider/PaperProvider";
import { HealthManager } from "../../module/HealthManager";
import { saved_user_data } from "../../api/Globals";
import { updateDailyGoals } from "../../api/User";

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

  const [workoutData, setWorkoutData] = React.useState([])

  React.useEffect(() => {
    async function fetchData() {
      const data = await HealthManager.getWorkoutData("Day");
      setWorkoutData(data);
      
    }
    fetchData();

    var d = 0;
    workoutData.forEach((element: any) => {
      d += element.Duration;
    });
    setDuration(d);

    var dist = 0;
    workoutData.forEach((element: any) => {
      dist += element.Distance;
    });
    setDistance(dist);

    var cals = 0;
    workoutData.forEach((element: any) => {
      cals += element.Calories;
    });
    setCalories(cals);
  }, []);

  async function saveData() {
    updateDailyGoals(saved_user_data.user_id, text_dist, text_cal, text_dur);
    setVisible(false);
  }


  return (
    <Card>
      <Card.Content>
        <Button onPress={() => HealthManager.startWorkout()}>Start Workout</Button>
        <Button onPress={() => HealthManager.endWorkout()}>End Workout</Button>
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
          <Text style={{ color: theme.colors.foregroundMuted }}>{distance.toFixed(0)}km</Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <ProgressBar progress={0.7} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0</Text>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>{text_dist} km</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
          <Button textColor={theme.colors.text} style={{ alignSelf: "flex-start" }} icon="terrain">Duration</Button>
          <Text style={{ color: theme.colors.foregroundMuted }}>{duration.toFixed(0)}mins</Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <ProgressBar progress={0.9} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0</Text>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>{text_dur} mins</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
          <Button textColor={theme.colors.text} style={{ alignSelf: "flex-start" }} icon="fire">Calories</Button>
          <Text style={{ color: theme.colors.foregroundMuted }}>{calories.toFixed(0)}cals</Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <ProgressBar progress={0.8} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0</Text>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>{text_cal} cals</Text>
        </View>
      </Card.Content>
    </Card>
  );
};
