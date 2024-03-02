import { SafeAreaView, StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { Button, Divider, Text } from "react-native-paper";
import { usePlaylists, useSongs } from "../api/Music";
import { MusicManager } from "../module/MusicManager";
import { supabase } from "../lib/supabase";
import { PlaylistList } from "../components/Music/Library/PlaylistList";
import { SongList } from "../components/Music/Library/SongList";
import { CurrentSongTab } from "../components/Music/CurrentSongTab";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HealthManager } from "../module/HealthManager";
import { useTimingEngine } from "../hooks/useTimingEngine";

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

export const MusicPage = ({ navigation }: Props) => {
  const { data: songs = [], refetch } = useSongs();
  const { data: playlists = [], refetch: refetchPlaylists } = usePlaylists();

  const syncSongs = async () => {
    const librarySongs = await MusicManager.getSongLibrary();

    const { data, error } = await supabase.functions.invoke(
      "music/sync-songs",
      {
        body: {
          songs: librarySongs.map((s) => ({
            id: s.id,
            artist: s.artistName,
            title: s.title,
          })),
        },
      }
    );

    if (error) {
      console.error("error syncing songs", error);
    }

    if (data.shouldRefetch === "yes") {
      refetch();
    }
  };

  const syncPlaylists = async () => {
    const libraryPlaylists = await MusicManager.getPlaylistLibrary();

    const { data, error } = await supabase.functions.invoke(
      "music/sync-playlists",
      {
        body: {
          playlists: libraryPlaylists,
        },
      }
    );

    if (error) {
      console.error("error syncing playlists", error);
    }

    if (data.shouldRefetch === "yes") {
      refetchPlaylists();
    }
  };

  useEffect(() => {
    // syncSongs();
    // syncPlaylists();
  }, []);

  return (
    <SafeAreaView>
      <HealthKitTest />
      {/* <BackgroundTimerTest /> */}
      <View style={styles.container}>
        <PlaylistList playlists={playlists} navigation={navigation} />
        <Divider style={{ marginVertical: -12 }} />
        <SongList songs={songs} />
      </View>

      <CurrentSongTab />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingHorizontal: 16,
    gap: 24,
    backgroundColor: "#181a1c",
    height: "100%",
    width: "100%",
  },
});

const HealthKitTest = () => {
  const reqAuth = async () => {
    const res = await HealthManager.requestAuthorization();
    console.log(res);
  };

  const testFunction = async () => {
    const res = await HealthManager.getWorkoutData("Month");
    console.log("res", res);
  };

  return (
    <View>
      <Button onPress={reqAuth}>Request Auth</Button>
      <Button onPress={testFunction}>Test Function</Button>
    </View>
  );
};

const BackgroundTimerTest = () => {
  const mockTimingData = [
    { duration: 2000, playbackRate: 1 },
    { duration: 1500, playbackRate: 1.5 },
    { duration: 2000, playbackRate: 2 },
    { duration: 1000, playbackRate: 1 },
    { duration: 1500, playbackRate: 1.5 },
    { duration: 3000, playbackRate: 1 },
  ];

  const { playbackRate, startTimer, pauseTimer, endTimer } = useTimingEngine({
    timingData: mockTimingData,
    onSuccess: () => console.log("hey it reached the end of the workout!"),
  });

  return (
    <View>
      <Text style={{ color: "black" }}>Playback Rate: {playbackRate}</Text>
      <Button onPress={() => startTimer()}>Start/Resume Timer</Button>
      <Button onPress={() => pauseTimer()}>Pause Timer</Button>
      <Button onPress={() => endTimer()}>End Timer</Button>
    </View>
  );
};
