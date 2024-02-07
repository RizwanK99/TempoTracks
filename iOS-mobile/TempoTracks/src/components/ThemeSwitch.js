import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import useThemeStore from "../hooks/useThemeStore";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme === "light" ? "#fff" : "#333",
      }}
    >
      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: theme === "light" ? "#555" : "#990",
        }}
      >
        <Text style={{ color: "#fff" }}>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThemeSwitch;
