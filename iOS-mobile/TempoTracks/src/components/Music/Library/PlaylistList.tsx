import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TouchableRipple, useTheme } from "react-native-paper";
import { Tables } from "../../../lib/db.types";
import { useEffect } from "react";
import { MusicManager } from "../../../module/MusicManager";

interface Props {
  playlists: Tables<"playlists">[];
}

export const PlaylistList = ({ playlists }: Props) => {
  const dimensions = Dimensions.get("window");

  return (
    <View>
      <Text variant="headlineLarge" style={styles.title}>
        Playlists
      </Text>

      <ScrollView style={{ maxHeight: dimensions.width / 2 + 12 }}>
        <View style={styles.scrollGrid}>
          {playlists.map((playlist) => (
            <PlaylistItem key={playlist.apple_music_id} playlist={playlist} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const PlaylistItem = ({ playlist }: { playlist: Tables<"playlists"> }) => {
  const theme = useTheme();
  const dimensions = Dimensions.get("window");

  return (
    <TouchableRipple theme={theme} style={styles.container}>
      <View style={styles.col}>
        <Image
          source={{ uri: playlist.artwork_url }}
          style={{
            width: dimensions.width / 2 - 24,
            height: dimensions.width / 2 - 24,
            borderRadius: theme.roundness,
          }}
        />
        <View style={styles.content}>
          <Text variant="bodyLarge">{playlist.name}</Text>
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
  scrollGrid: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  col: {
    flexDirection: "column",
    justifyContent: "center",
  },
  content: {
    marginVertical: 6,
  },
});
