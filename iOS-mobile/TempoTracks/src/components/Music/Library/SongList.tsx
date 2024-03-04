import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Divider, Text, TouchableRipple, useTheme } from "react-native-paper";
import { Tables } from "../../../lib/db.types";
import { MusicManager } from "../../../module/MusicManager";

interface Props {
  songs: Tables<"songs">[];
}

export const SongList = ({ songs }: Props) => {
  return (
    <View>
      <Text variant="headlineLarge" style={styles.title}>
        Song Library
      </Text>

      <ScrollView>
        {songs.map((song) => (
          <SongItem key={song.apple_music_id} song={song} />
        ))}
      </ScrollView>
    </View>
  );
};

export const SongItem = ({
  song,
  dontPlayOnClick = false,
}: {
  song: Tables<"songs">;
  dontPlayOnClick?: boolean;
}) => {
  const theme = useTheme();

  const playSong = (id: string) => {
    MusicManager.playSongWithId(id);
  };

  return (
    <TouchableRipple
      theme={theme}
      style={styles.container}
      onPress={() => (!!dontPlayOnClick ? {} : playSong(song.apple_music_id))}
    >
      <View style={styles.row}>
        <Image
          source={{ uri: song.artwork_url }}
          style={{
            width: 50,
            height: 50,
            borderRadius: theme.roundness,
          }}
        />
        <View
          style={{
            ...styles.content,
            // borderBottomColor: theme.colors.outlineVariant,
            // borderBottomWidth: 1,
          }}
        >
          <Text variant="bodyLarge">{song.title}</Text>
          <Text
            variant="bodySmall"
            style={{
              color: theme.colors.secondary,
              width: "100%",
            }}
          >
            {song.artist}
          </Text>
          <Divider style={{ marginTop: 2, marginBottom: -12 }} />
        </View>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  title: {
    marginBottom: 16,
  },
  row: {
    width: "100%",
    flexDirection: "row",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 6,
    paddingBottom: 4,
    marginHorizontal: 12,
  },
});
