import { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { MusicPlayerSong } from "../../../module/MusicManager.types";
import { MusicManager } from "../../../module/MusicManager";
import { SongDuration } from "./SongDuration";
import PlayerControls from "./PlayerControls";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { IconButton } from "react-native-paper";
import { useAppTheme } from "../../../provider/PaperProvider";
import { GestureDetector, PanGesture } from "react-native-gesture-handler";

interface Props {
  playerHeight: Animated.SharedValue<number>;
  transformY: Animated.SharedValue<number>;
  pan: PanGesture;
}

export const MusicPlayer = ({ playerHeight, transformY, pan }: Props) => {
  const theme = useAppTheme();

  const animStyle = useAnimatedStyle(() => {
    return {
      height: playerHeight.value,
      transform: [{ translateY: transformY.value }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: theme.colors.fadedBackground },
        animStyle,
      ]}
    >
      <Container>
        <GestureDetector gesture={pan}>
          <IconButton
            icon="window-minimize"
            iconColor={theme.colors.surfaceVariant}
            size={36}
            onPress={() => console.log("123")}
            style={{ marginTop: "20%", marginBottom: "15%" }}
          />
        </GestureDetector>
        <CurrentSong />
      </Container>
    </Animated.View>
  );
};

const Container = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const Artwork = () => {
  return (
    <View style={styles.artwork}>
      <Image
        style={styles.artworkImg}
        source={{
          uri: "https://images.squarespace-cdn.com/content/v1/53b6eb62e4b06e0feb2d8e86/1607362705516-R5Q22H4FVIVPNMW8OWD7/SamSpratt_KidCudi_ManOnTheMoon3_AlbumCover_Web.jpg",
        }}
      />
    </View>
  );
};

const CurrentSong = () => {
  const [currentSong, setCurrentSong] = useState<MusicPlayerSong | null>(null);

  const loadLibrary = async () => {
    const songs = await MusicManager.getSongLibrary();

    if (songs.length > 0) {
      setCurrentSong(songs[2]);
    }
  };

  useEffect(() => {
    loadLibrary();
  }, []);

  return (
    <View style={styles.songContainer}>
      <Artwork />
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{currentSong?.title}</Text>
        <Text numberOfLines={1} style={styles.artistName}>
          {currentSong?.artistName}
        </Text>
      </View>
      <SongDuration />
      <PlayerControls
        isPlaying={false}
        setIsPlaying={() => null}
        playbackRate={1}
        handlePlaybackRateChange={() => null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    bottom: 0,
    transform: [{ translateY: 0 }],
    zIndex: 50,
    overflow: "hidden",
    borderRadius: 25,
  },
  songContainer: {
    display: "flex",
    alignItems: "center",
  },
  artwork: {
    height: 250,
    width: "100%",
    borderRadius: 25,
    backgroundColor: "#36a2df",
    shadowColor: "#36a2df",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
  },
  artworkImg: {
    height: 250,
    width: 250,
    borderRadius: 25,
  },
  descriptionContainer: {
    width: 300,
    paddingTop: 50,
    // gap: 4,
    // display: 'flex',
    // alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  artistName: {
    fontSize: 20,
    letterSpacing: 0.25,
    color: "#FAF9F6",
    opacity: 0.75,
    // width: 350,
  },
});
