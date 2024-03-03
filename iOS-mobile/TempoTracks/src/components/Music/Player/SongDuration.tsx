import { StyleSheet, Text, View } from "react-native";
import { Slider } from "react-native-elements";

interface Props {
  playbackTime: number;
  duration: number;
}

const formatSecondsIntoTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const SongDuration = ({ playbackTime, duration }: Props) => {
  return (
    <View style={styles.progressBarContainer}>
      <Slider
        allowTouchTrack={false}
        style={styles.progressBar}
        value={playbackTime}
        minimumValue={0}
        maximumValue={duration / 1000}
        minimumTrackTintColor="#36a2df"
        maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
        trackStyle={styles.trackStyle}
        thumbStyle={styles.thumbStyle}
      />
      <View style={styles.durationContainer}>
        <Text style={styles.durationText}>
          {formatSecondsIntoTime(playbackTime)}
        </Text>
        <Text style={styles.durationText}>
          {formatSecondsIntoTime(Math.round(duration / 1000))}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    marginTop: 20,
    display: "flex",
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  durationContainer: {
    marginTop: -10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
  progressBar: {
    width: 300,
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  trackStyle: {
    height: 4,
    borderRadius: 0,
  },
  thumbStyle: {
    height: 0,
    width: 0,
  },
  durationText: {
    fontSize: 12,
    opacity: 0.5,
    color: "white",
    textAlign: "center",
  },
});
