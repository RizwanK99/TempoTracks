import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";
import { useGetPlaylistById } from "../../../api/Music";
import { useAppTheme } from "../../../provider/PaperProvider";
import { CurrentSongForPlayer } from "../../Music/Player/CurrentMusicPlayer";
import { SongQueueList } from "./SongQueueList";

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
      <View style={styles.container}>
        <CurrentSongForPlayer hideControls />
        <Divider
          style={{
            width: "75%",
            height: 1,
            backgroundColor: theme.colors.border,
          }}
        />
        <SongQueueList />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: 20,
  },
});
