import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

interface CheckboxProps {
  onPress: () => void;
  onLongPress?: () => void;
  value: boolean;
  title: string;
  subTitle: string;
  index?: number;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  onPress,
  onLongPress,
  value,
  title,
  subTitle,
  index,
  disabled = false,
}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{ width: "100%" }}
      onLongPress={onLongPress ? onLongPress : null}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          borderWidth: 1,
          width: "100%",
          borderColor: value ? theme.colors.primary : theme.colors.border,
          backgroundColor: theme.colors.previousBackground,
          padding: 8,
          borderRadius: 4,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 16,
            paddingHorizontal: 8,
          }}
        >
          <View
            style={{
              borderWidth: 0.5,
              height: 20,
              width: 20,
              borderRadius: 2,
              borderColor: theme.colors.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {value && (
              <AntDesign
                name="checksquare"
                size={19}
                color={theme.colors.primary}
              />
            )}
            {index ? (
              <Text style={{ color: theme.colors.primary }}>{index}</Text>
            ) : null}
          </View>
          <View
            styles={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 14,
              }}
            >
              {subTitle}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
