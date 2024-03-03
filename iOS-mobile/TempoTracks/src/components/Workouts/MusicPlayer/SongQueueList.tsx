import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import {
  useAsyncStorageItem,
  useSetAsyncStorageItem,
} from "../../../api/AsyncStorage";
import { Tables } from "../../../lib/db.types";
import { SongItem } from "../../Music/Library/SongList";
import { usePlayerState, useSongs } from "../../../api/Music";
import { useEffect } from "react";

export const SongQueueList = () => {
  const { data, isPending, refetch } =
    useAsyncStorageItem<Tables<"songs">[]>("music_queue");
  const { mutateAsync: saveSongQueueToStorage } =
    useSetAsyncStorageItem("music_queue");
  const { data: songs } = useSongs();
  const { data: playerState } = usePlayerState({ songs });

  useEffect(() => {
    if (playerState?.currentSong && data) {
      const currentSongIndex = data.findIndex(
        (song) =>
          song.apple_music_id === playerState.currentSong?.apple_music_id
      );

      if (currentSongIndex > -1) {
        const newQueue = data.slice(currentSongIndex + 1);
        saveSongQueueToStorage(newQueue);
        refetch();
      }
    }
  }, [playerState?.currentSong]);

  if (isPending || !data) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Songs</Text>

      <ScrollView style={styles.queueList}>
        {data.map((song, index) => (
          <SongItem
            key={`${song.apple_music_id}-${index}`}
            song={song}
            dontPlayOnClick
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  queueList: {
    maxHeight: 150,
    width: "75%",
  },
});
