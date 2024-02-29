import * as React from "react";
import { View } from "react-native";

import {
  Button,
  Card,
  Text,
  Divider,
  IconButton,
  ProgressBar,
} from "react-native-paper";

import { useAppTheme } from "../../provider/PaperProvider";

export const DailyGoals = () => {
  const theme = useAppTheme();

  return (
    <Card>
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            variant="headlineMedium"
            style={{ color: theme.colors.text, paddingHorizontal: 5 }}
          >
            Today's Progress
          </Text>
          <IconButton
            icon="pencil"
            size={20}
            onPress={() => console.log("Pressed")}
          />
        </View>
        <Divider style={{ marginVertical: 10 }} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Button textColor={theme.colors.text} icon="shoe-sneaker">
            Steps
          </Button>
          <Text style={{ color: theme.colors.foregroundMuted }}>7593</Text>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          <ProgressBar progress={0.7} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>
            0
          </Text>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>
            10000
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
            Activity
          </Button>
          <Text style={{ color: theme.colors.foregroundMuted }}>55 min</Text>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          <ProgressBar progress={0.9} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>
            0
          </Text>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>
            60
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
          <Text style={{ color: theme.colors.foregroundMuted }}>337</Text>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          <ProgressBar progress={0.8} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>
            0
          </Text>
          <Text style={{ color: theme.colors.foregroundMuted, padding: 5 }}>
            500
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};
