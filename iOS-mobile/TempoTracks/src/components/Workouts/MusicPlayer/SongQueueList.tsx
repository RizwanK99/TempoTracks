import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useAsyncStorageItem } from "../../../api/AsyncStorage";
import { Tables } from "../../../lib/db.types";
import { SongItem } from "../../Music/Library/SongList";

export const SongQueueList = () => {
  const { data, isPending } =
    useAsyncStorageItem<Tables<"songs">[]>("music_queue");

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
