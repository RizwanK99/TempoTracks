import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import RingProgress from "../../components/Workouts/RingProgress";
import { useAppTheme } from "../../provider/PaperProvider.tsx";

interface CountDownTimerProps {
  handleIconPress: () => void;
  handleProgressComplete: () => void;
}

export const CountDownTimer: React.FC<CountDownTimerProps> = ({
  handleIconPress,
  handleProgressComplete,
}) => {
  const theme = useAppTheme();
  return (
    <View
      style={{
        flexDirection: "column",
        gap: 80,
        padding: 16,
        marginTop: 16,
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            color: theme.colors.text,
            fontWeight: "bold",
            fontSize: 32,
          }}
        >
          Starting in
        </Text>
      </View>
      <View>
        <RingProgress
          progress={1}
          duration={5}
          onComplete={handleProgressComplete}
        />
      </View>
      <View
        style={{
          marginTop: 140,
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <TouchableOpacity onPress={handleIconPress}>
          <Feather
            name="x-circle"
            size={52}
            color={theme.colors.foregroundMuted}
          />
        </TouchableOpacity>
        <Text style={{ color: theme.colors.text, fontSize: 16 }}>Cancel</Text>
      </View>
    </View>
  );
};
