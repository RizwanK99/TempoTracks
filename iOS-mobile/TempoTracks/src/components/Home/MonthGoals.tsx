import * as React from "react";
import {
  TouchableOpacity,
  ScrollView,
  View,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  useTheme,
  Button,
  Card,
  Text,
  Divider,
  IconButton,
  Chip,
  Surface,
  ProgressBar,
  Tooltip,
  PaperProvider,
  Menu,
  Modal,
  Portal,
  TextInput,
} from "react-native-paper";
import { endOfDay, format } from "date-fns";
import { LineChart } from "react-native-gifted-charts";
import { getUsersWorkouts } from "../../api/Workouts";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppTheme } from "../../provider/PaperProvider";
import { saved_user_data } from "../../api/Globals";
import { updateMonthlyGoals } from "../../api/User";

export const MonthGoals = () => {
  const theme = useAppTheme();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [text_dist, setTextDist] = React.useState(
    String(saved_user_data.monthly_distance_goal)
  );
  const [text_dur, setTextDur] = React.useState(
    String(saved_user_data.monthly_duration_goal)
  );
  const [text_act, setTextAct] = React.useState(
    String(saved_user_data.monthly_workouts_goal)
  );
  const [text_cal, setTextCal] = React.useState(
    String(saved_user_data.monthly_calorie_goal)
  );

  async function saveData() {
    updateMonthlyGoals(
      saved_user_data.user_id,
      text_dist,
      text_cal,
      text_dur,
      text_act
    );
    setVisible(false);
  }

  return (
    <Card style={{ padding: 8, marginBottom: 18 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          variant="titleLarge"
          style={{ color: theme.colors.text, padding: 10 }}
        >
          Monthly Goals
        </Text>
        <IconButton icon="pencil" size={20} onPress={showModal} />
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            top: 0,
            position: "absolute",
            width: "100%",
            padding: 10,
          }}
        >
          <Card>
            <Card.Title
              title="Edit Monthly Goals"
              titleVariant="titleLarge"
            ></Card.Title>
            <Card.Content>
              <TextInput
                label="Distance"
                value={text_dist}
                onChangeText={setTextDist}
                keyboardType="numeric"
                dense
                style={{ marginBottom: 10 }}
              />
              <TextInput
                label="Duration"
                value={text_dur}
                onChangeText={setTextDur}
                keyboardType="numeric"
                dense
                style={{ marginBottom: 10 }}
              />
              <TextInput
                label="Workouts"
                value={text_act}
                onChangeText={setTextAct}
                keyboardType="numeric"
                dense
                style={{ marginBottom: 10 }}
              />
              <TextInput
                label="Calories"
                value={text_cal}
                onChangeText={setTextCal}
                keyboardType="numeric"
                dense
              />
              <Button
                mode="elevated"
                style={{ marginTop: 10 }}
                onPress={saveData}
              >
                Save
              </Button>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
      <Divider
        style={{
          height: 1,
          backgroundColor: theme.colors.border,
          marginBottom: 5,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Button textColor={theme.colors.text} icon="map">
          Distance
        </Button>
        <Text style={{ color: theme.colors.foregroundMuted }}>56km</Text>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <ProgressBar progress={0.7} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>
          0km
        </Text>
        <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>
          {text_dist} km
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Button
          textColor={theme.colors.text}
          style={{ alignSelf: "flex-start" }}
          icon="terrain"
        >
          Duration
        </Button>
        <Text style={{ color: theme.colors.foregroundMuted }}>400m</Text>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <ProgressBar progress={0.2} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>
          0km
        </Text>
        <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>
          {text_dur} mins
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Button
          textColor={theme.colors.text}
          style={{ alignSelf: "flex-start" }}
          icon="weight-lifter"
        >
          Workouts
        </Button>
        <Text style={{ color: theme.colors.foregroundMuted }}>22</Text>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <ProgressBar progress={0.9} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>
          0
        </Text>
        <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>
          {text_act} workouts
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Button
          textColor={theme.colors.text}
          style={{ alignSelf: "flex-start" }}
          icon="fire"
        >
          Calories
        </Button>
        <Text style={{ color: theme.colors.foregroundMuted }}>10000</Text>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <ProgressBar progress={0.8} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>
          0
        </Text>
        <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>
          {text_cal} cals
        </Text>
      </View>
    </Card>
  );
};
