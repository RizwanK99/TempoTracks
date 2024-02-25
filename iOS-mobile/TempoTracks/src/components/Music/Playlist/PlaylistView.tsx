import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { Tables } from "../../../lib/db.types";
import { SongItem } from "../Library/SongList";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

interface Props {
  // playlist: Tables<"playlists"> & { songs: Tables<"songs">[] };
  route: NativeStackScreenProps<any>["route"];
  navigation: NativeStackNavigationProp<any>;
}

export const PlaylistView = ({ route, navigation }: Props) => {
  const theme = useTheme();

  console.log("route params", route.params);

  if (!route.params) {
    return <Text>No playlist</Text>;
  }

  const playlist = route.params as Tables<"playlists"> & {
    songs: Tables<"songs">[];
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton
            icon="chevron-left"
            iconColor={theme.colors.onSurface}
            size={32}
            onPress={() => navigation.goBack()}
            style={styles.backIcon}
          />
          <Image
            source={{ uri: playlist.artwork_url }}
            height={250}
            width={250}
            style={{ marginBottom: 16, borderRadius: theme.roundness }}
          />
          <Text variant="headlineMedium">{playlist.name}</Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
            {playlist.length} songs
          </Text>
        </View>
        <ScrollView>
          {playlist.songs.map((song) => (
            <SongItem key={song.apple_music_id} song={song} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingHorizontal: 16,
    // justifyContent: 'center',
    // alignItems: 'center',
    gap: 24,
    backgroundColor: "#181a1c",
    height: "100%",
    width: "100%",
  },
  header: {
    position: "relative",
    paddingTop: 48,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    position: "absolute",
    top: -4,
    left: -18,
  },
});
