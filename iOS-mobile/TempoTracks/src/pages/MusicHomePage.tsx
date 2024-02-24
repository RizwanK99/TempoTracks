import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { PlaylistView } from "../components/Music/Playlist/PlaylistView";
import { MusicLibrary } from "../components/Music/Library/MusicLibrary";

export default function MusicHomePage() {
  return (
    <SafeAreaView>
      {/* <MusicPlayer /> */}
      <MusicLibrary />
      {/* <PlaylistView
        playlist={
          playlists.find((x) => x.songs.length > 1) as Tables<"playlists"> & {
            songs: Tables<"songs">[];
          }
        } */}
    </SafeAreaView>
  );
}
