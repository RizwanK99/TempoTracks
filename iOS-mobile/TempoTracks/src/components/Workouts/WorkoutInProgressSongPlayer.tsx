import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { useTheme, ActivityIndicator } from "react-native-paper";
import { PlaylistView } from "../Music/Playlist/PlaylistView";
import { usePlaylists } from "../../api/Music";
import { Tables } from "../../lib/db.types";
import { Text } from "react-native-paper";
import { SongItem } from "../../components/Music/Library/SongList";
import { useGetPlaylistById } from "../../api/Music";
import { useAppTheme } from "../../provider/PaperProvider";

interface WorkoutInProgressSongPlayerProps {
  playlistId: string;
}

export const WorkoutInProgressSongPlayer: React.FC<
  WorkoutInProgressSongPlayerProps
> = ({ playlistId }) => {
  const theme = useAppTheme();
  const { data: playlist, isPending } = useGetPlaylistById(playlistId);

  if (isPending || !playlist) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: theme.colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          padding: 24,
          alignItems: "center",
        }}
      >
        <View style={{ marginBottom: 16, marginTop: 70, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            {playlist.name}
          </Text>
          <Text>{`${playlist.songs.length} song${
            playlist.songs.length > 1 ? `s` : ``
          }`}</Text>
        </View>
        <ScrollView style={{ width: "100%" }}>
          {playlist.songs.map((song) => (
            <SongItem key={song.apple_music_id} song={song} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
