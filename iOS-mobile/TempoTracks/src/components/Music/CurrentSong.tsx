import { Dimensions, Image, TouchableHighlight, View } from "react-native";
import { Tables } from "../../lib/db.types";
import { IconButton, Text, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { MusicManager } from "../../module/MusicManager";
import { usePlayerState, useSongs } from "../../api/Music";
import { useRef, useState } from "react";
import { MusicPlayer } from "./Player/MusicPlayer";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  useAnimatedProps,
  withSpring,
} from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";
import { useAppTheme } from "../../provider/PaperProvider";

export const CurrentSong = () => {
  const playerHeight = useSharedValue(0);
  const transformY = useSharedValue(0);

  const dimensions = Dimensions.get("window");

  const pan = Gesture.Pan()
    .onBegin(() => {
      transformY.value = 0;
    })
    .onChange((event) => {
      if (event.translationY < 0) {
        return;
      }
      transformY.value = event.translationY;
    })
    .onFinalize((event) => {
      if (event.translationY >= 150 || event.translationY === 0) {
        playerHeight.value = withTiming(0, {
          duration: 250,
        });
      } else {
        transformY.value = 0;
      }
    });

  const handleOpenPlayer = () => {
    transformY.value = 0;
    playerHeight.value = withTiming(dimensions.height, {
      duration: 250,
    });
  };

  return (
    <>
      <MusicPlayer
        playerHeight={playerHeight}
        transformY={transformY}
        pan={pan}
      />
      <CurrentSongFooter handleOpenPlayer={handleOpenPlayer} />
    </>
  );
};

interface Props {
  handleOpenPlayer: () => void;
}

export const CurrentSongFooter = ({ handleOpenPlayer }: Props) => {
  const theme = useAppTheme();

  const { data: songs } = useSongs();
  const { data: playerState } = usePlayerState({ songs });

  if (!playerState?.currentSong) {
    return null;
  }

  const currentSong = playerState.currentSong;
  const isPlaying = playerState.playbackStatus === "playing";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.fadedBackground },
      ]}
    >
      <TouchableHighlight onPress={handleOpenPlayer}>
        <View style={styles.row}>
          <Image
            source={{ uri: currentSong.artwork_url }}
            style={{
              width: 50,
              height: 50,
              borderRadius: theme.roundness,
            }}
          />
          <View style={styles.content}>
            <Text variant="bodyLarge" numberOfLines={1}>
              {currentSong.title}
            </Text>
            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.secondary,
              }}
              numberOfLines={1}
            >
              {currentSong.artist}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
      <View style={{ ...styles.row, justifyContent: "flex-end" }}>
        {!isPlaying ? (
          <IconButton
            icon="play"
            iconColor={theme.colors.onSurface}
            size={32}
            onPress={() => MusicManager.play()}
          />
        ) : (
          <IconButton
            icon="pause"
            iconColor={theme.colors.onSurface}
            size={32}
            onPress={() => MusicManager.pause()}
          />
        )}

        <IconButton
          icon="skip-next"
          iconColor={theme.colors.onSurface}
          size={32}
          onPress={() => MusicManager.skipForward()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    bottom: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  title: {
    marginBottom: 16,
  },
  row: {
    maxWidth: "65%",
    flexDirection: "row",
    overflow: "hidden",
  },
  content: {
    justifyContent: "center",
    marginVertical: 6,
    paddingBottom: 4,
    marginHorizontal: 12,
    overflow: "hidden",
  },
});
