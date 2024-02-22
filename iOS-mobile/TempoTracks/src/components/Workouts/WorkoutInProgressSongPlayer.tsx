import React, { useState, useMemo } from "react";
import { SafeAreaView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { PlaylistView } from "../Music/Playlist/PlaylistView";
import { usePlaylists } from "../../api/Music";
import { Tables } from "../../lib/db.types";
import { Text } from "react-native-paper";

export const WorkoutInProgressSongPlayer = () => {
  const theme = useTheme();
  const { data: playlists = [], refetch, isPending } = usePlaylists();

  if (isPending) {
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
        <Text style={{ color: theme.colors.text }}>Loading...</Text>
      </SafeAreaView>
    );
  }

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
      <PlaylistView
        playlist={
          playlists.find((x) => x.songs.length > 1) as Tables<"playlists"> & {
            songs: Tables<"songs">[];
          }
        }
      />
      <Text style={{ color: theme.colors.text }}>Songslist</Text>
    </SafeAreaView>
  );
};
