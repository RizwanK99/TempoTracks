import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import { TextInput as PaperTextInput } from "react-native-paper";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  units: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  editable?: boolean;
  width?: number;
}

export const NumberInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  units,
  onChangeText,
  onFocus,
  editable = true,
  width = 85,
}) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [borderWidth, setBorderWidth] = useState(1);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <PaperTextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          //onFocus();
          setFocused(true);
          setBorderWidth(2);
        }}
        onBlur={() => {
          setFocused(false);
          setBorderWidth(1);
        }}
        placeholder={placeholder}
        textColor={theme.colors.text}
        editable={editable}
        keyboardType={"numeric"}
        style={{ width: width, height: 40 }}
      />
      <View
        style={{
          borderWidth: borderWidth,
          borderColor: focused ? theme.colors.primary : "grey",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: 42,
          borderRadius: 4,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          paddingHorizontal: 8,
          marginTop: 6,
          marginLeft: -4,
          borderLeftWidth: 0,
        }}
      >
        <Text
          style={{
            color: focused
              ? theme.colors.primary
              : theme.colors.foregroundMuted,
          }}
        >
          {" "}
          {units}
        </Text>
      </View>
    </View>
  );
};