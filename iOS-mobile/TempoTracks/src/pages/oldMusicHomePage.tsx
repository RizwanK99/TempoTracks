import * as React from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import PageHeading from "../components/Workouts/PageHeading";
import SectionHeading from "../components/Workouts/SectionHeading";
import PressableCardBanner from "../components/Workouts/PressableCardBanner";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MusicLibrary } from "../components/Music/Library/MusicLibrary";
import { CurrentSong } from "../components/Music/CurrentSong";
import { MusicPlayer } from "../components/Music/Player/MusicPlayer";
import { PlaylistView } from "../components/Music/Playlist/PlaylistView";
import { usePlaylists } from "../api/Music";
import { Text } from "react-native-paper";
import { Tables } from "../lib/db.types";

async function retrieveData(user, setUser) {
  try {
    const value = await AsyncStorage.getItem("user_data");
    if (value !== null) {
      let userData = JSON.parse(value);
      await setUser(userData);
    }
  } catch (error) {
    console.log("Error retreiving user data", error);
  }
}
const appleMusic = require("../assets/apple-music.png");
const musicLib = require("../assets/music-lib.png");
const playlist = require("../assets/playlist.png");
const MusicHomePage = ({ navigation }) => {
  const { data: playlists = [], refetch } = usePlaylists();

  console.log("playlists", playlists);

  if (playlists.find((x) => x.songs.length > 0) === undefined) {
    return <Text style={{ color: "black" }}>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      {/* <MusicPlayer /> */}
      {/* <MusicLibrary /> */}
      <PlaylistView
        playlist={
          playlists.find((x) => x.songs.length > 1) as Tables<"playlists"> & {
            songs: Tables<"songs">[];
          }
        }
      />
    </SafeAreaView>
  );

  // return (
  //   <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
  //     <ScrollView>
  //       {/* QUICK STARTER */}
  //       <View style={{ flex: 1, padding: 16 }}>
  //         <View>
  //           <PageHeading title={'Music Home Page'} />
  //         </View>
  //         <View style={{ marginTop: 24 }}>
  //           <SectionHeading title={'View Your Music'} />
  //         </View>
  //         <View style={{ marginTop: 16 }}>
  //           <PressableCardBanner
  //             title={'Open Your Music Library'}
  //             subtitle={'View your music library.'}
  //             imageUri={musicLib}
  //             onPress={() => navigation.navigate('MusicLibraryPage')}
  //           />
  //         </View>

  //         <View style={{ marginTop: 24 }}>
  //           <SectionHeading title={'Create a Playlist'} />
  //         </View>
  //         <View style={{ marginTop: 16 }}>
  //           <PressableCardBanner
  //             title={'Open Your Music Library'}
  //             subtitle={'View your music library.'}
  //             imageUri={playlist}
  //             // onPress={() => navigation.navigate("MusicLibraryPage")}
  //           />
  //         </View>

  //         <View style={{ marginTop: 24 }}>
  //           <SectionHeading title={'Import Songs'} />
  //         </View>
  //         <View style={{ marginTop: 16 }}>
  //           <PressableCardBanner
  //             title={'Add From Apple Music'}
  //             subtitle={'Bring Your Songs to the Gym.'}
  //             imageUri={appleMusic}
  //             // onPress={() => navigation.navigate("MusicLibraryPage")}
  //           />
  //         </View>

  //         <View style={{ marginTop: 24 }}>
  //           <SectionHeading title={'Music Player'} />
  //         </View>
  //         <View style={{ marginTop: 16 }}>
  //           <PressableCardBanner
  //             title={'THIS NEEDS TO BE MOVED TO WHEN IN WORKOUT'}
  //             subtitle={'Bring Your Songs to the Gym.'}
  //             imageUri={appleMusic}
  //             onPress={() => navigation.navigate('MusicPage')}
  //           />
  //         </View>
  //       </View>
  //     </ScrollView>
  //   </SafeAreaView>
  // );
};

const styles = StyleSheet.create({
  full: {
    backgroundColor: "black",
    height: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
    marginHorizontal: 20,
    height: "100%",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  welcome: {
    width: "100%",
    color: "grey",
    fontSize: 12,
    textTransform: "uppercase",
  },
  progressContainer: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#222222",
    padding: 10,
    borderRadius: 10,
  },
  historyText: {
    alignSelf: "flex-start",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 22,
  },
  box: {
    backgroundColor: "black",
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  btn_box: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 2,
    alignContent: "center",
    width: "100%",
  },
  startButton: {
    backgroundColor: "#09bc8a",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#004346",
    width: "100%",
    height: 60,
    justifyContent: "center",
    textAlign: "center",
  },
  startButtonContainer: {
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
  },
  btn_shape: {
    backgroundColor: "#09bc8a",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#004346",
    margin: 10,
    height: 30,
    width: 30,
    textAlign: "center",
  },
});

export default MusicHomePage;
