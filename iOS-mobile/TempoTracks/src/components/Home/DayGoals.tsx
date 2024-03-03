import * as React from "react";
import { View } from "react-native";
import { Button, Card, Text, Divider, IconButton, ProgressBar, Portal, Modal, TextInput } from "react-native-paper";
import { useAppTheme } from "../../provider/PaperProvider";
import { HealthManager } from "../../module/HealthManager";
import goalData from '../../../mocks/goal_data.json'

export const DailyGoals = () => {
  const theme = useAppTheme();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [text_dist, setTextDist] = React.useState(10);
  const [text_dur, setTextDur] = React.useState(120);
  const [text_cal, setTextCal] = React.useState(800);

  const [workoutData, setWorkoutData] = React.useState([])

  React.useEffect(() => {
    async function fetchData() {
      const data = await HealthManager.getWorkoutData("Day");
      console.log(data);
      setWorkoutData(JSON.parse(data));
    }
    fetchData();
  }, []);

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
              <TextInput label="Distance" value={Number(goalData[0].Distance)} onChangeText={setTextDist} keyboardType="numeric" dense style={{ marginBottom: 10 }} />
              <TextInput label="Duration" value={Number(goalData[0].Duration)} onChangeText={setTextDur} keyboardType="numeric" dense style={{ marginBottom: 10 }} />
              <TextInput label="Calories" value={Number(goalData[0].Calories)} onChangeText={setTextCal} keyboardType="numeric" dense />
              <Button mode="elevated" style={{ marginTop: 10 }} onPress={hideModal}>Save</Button>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
          <Button textColor={theme.colors.text} icon="map">Distance</Button>
          <Text style={{ color: theme.colors.foregroundMuted }}>{goalData[0].Distance}</Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <ProgressBar progress={Number(Math.round((goalData[0].Distance)/text_dist))} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0</Text>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>{text_dist}km</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
          <Button textColor={theme.colors.text} style={{ alignSelf: "flex-start" }} icon="terrain">Duration</Button>
          <Text style={{ color: theme.colors.foregroundMuted }}>{Math.round(goalData[0].Duration/60)}</Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <ProgressBar progress={Number(Math.round(goalData[0].Duration/60)/text_dur)} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0</Text>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>{text_dur}mins</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
          <Button textColor={theme.colors.text} style={{ alignSelf: "flex-start" }} icon="fire">Calories</Button>
          <Text style={{ color: theme.colors.foregroundMuted }}>{Math.round(goalData[0].Calories)}</Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <ProgressBar progress={Number(Math.round(goalData[0].Calories)/text_cal)} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>0</Text>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>{text_cal}cals</Text>
        </View>
      </Card.Content>
    </Card>
  );
};
