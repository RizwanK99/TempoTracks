import { Image, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { SongDuration } from "./SongDuration";
import PlayerControls from "./PlayerControls";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { IconButton } from "react-native-paper";
import { useAppTheme } from "../../../provider/PaperProvider";
import { GestureDetector, PanGesture } from "react-native-gesture-handler";
import { usePlayerState, useSongs } from "../../../api/Music";

interface Props {
  playerHeight: Animated.SharedValue<number>;
  transformY: Animated.SharedValue<number>;
  pan: PanGesture;
}

export const CurrentMusicPlayer = ({
  playerHeight,
  transformY,
  pan,
}: Props) => {
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
            style={{ marginTop: "20%", marginBottom: "15%" }}
          />
        </GestureDetector>
        <CurrentSongForPlayer />
      </Container>
    </Animated.View>
  );
};

const Container = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const Artwork = ({ uri }: { uri: string }) => {
  return (
    <View style={styles.artwork}>
      <Image
        style={styles.artworkImg}
        source={{
          uri,
        }}
      />
    </View>
  );
};

export const CurrentSongForPlayer = ({
  hideControls,
}: {
  hideControls?: boolean;
}) => {
  const { data: songs } = useSongs();
  const { data: playerState } = usePlayerState({ songs });

  if (!playerState?.currentSong) {
    return null;
  }

  const currentSong = playerState.currentSong;
  const isPlaying = playerState.playbackStatus === "playing";

  return (
    <View style={styles.songContainer}>
      <Artwork uri={currentSong.artwork_url} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{currentSong.title}</Text>
        <Text numberOfLines={1} style={styles.artistName}>
          {currentSong.artist}
        </Text>
      </View>
      <SongDuration
        playbackTime={playerState.playbackTime}
        duration={playerState.currentSong.duration_ms}
      />
      {hideControls ? null : (
        <PlayerControls
          isPlaying={isPlaying}
          setIsPlaying={() => null}
          handlePlaybackRateChange={() => null}
        />
      )}
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
    transform: [{ translateY: -25 }],
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
