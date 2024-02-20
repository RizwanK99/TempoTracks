import React, { useState, useMemo } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

export const WorkoutInProgressSongPlayer = () => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 24,
        gap: 10,
        flexDirection: "column",
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: theme.colors.text }}>Songslist</Text>
    </SafeAreaView>
  );
};
