import * as React from "react";
import {
  TouchableOpacity,
  ScrollView,
  View,
  SafeAreaView,
  Dimensions,
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
} from "react-native-paper";

import { endOfDay, format } from "date-fns";
//import profileData from '../../mocks/profile_data.json';
import { LineChart } from "react-native-gifted-charts";

import { getUsersWorkouts } from "../../api/Workouts";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppTheme } from "../../provider/PaperProvider";

export const MonthGoals = () => {
  const theme = useAppTheme();

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          variant="titleLarge"
          style={{ color: theme.colors.text, padding: 10 }}
        >
          Monthly Goals
        </Text>
        <IconButton
          icon="pencil"
          size={20}
          onPress={() => console.log("Pressed")}
        />
      </View>

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
          80km
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
          Elevation
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
          2000m
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
          25
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
          12500
        </Text>
      </View>
    </View>
  );
};