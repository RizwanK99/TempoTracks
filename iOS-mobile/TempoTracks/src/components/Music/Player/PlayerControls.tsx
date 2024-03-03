import { StyleSheet, TouchableOpacity, View } from "react-native";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import { MusicManager } from "../../../module/MusicManager";
import { Slider } from "react-native-elements";

const PlayerControls = ({
  isPlaying,
  setIsPlaying,
  handlePlaybackRateChange,
}) => {
  const togglePlay = () => {
    if (isPlaying) {
      // pause the song
      MusicManager.pause();
    } else {
      // play the song
      MusicManager.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onPlaybackRateChange = (newPlaybackRate) => {
    handlePlaybackRateChange(newPlaybackRate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.playerContainer}>
        <TouchableOpacity onPress={() => MusicManager.restartSong()}>
          <AntDesignIcons name="banckward" size={42} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlay}>
          {isPlaying ? (
            <AntDesignIcons name="pausecircle" size={42} color="white" />
          ) : (
            <AntDesignIcons name="caretright" size={42} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => MusicManager.skipForward()}>
          <AntDesignIcons name="forward" size={42} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.volumeContainer}>
        <FontAwesomeIcons
          name="volume-off"
          size={24}
          color="white"
          style={{ marginTop: 8 }}
        />
        <Slider
          style={styles.volumeBar}
          value={0.33}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#36a2df"
          maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
          trackStyle={styles.trackStyle}
          thumbStyle={styles.thumbStyle}
        />
        <FontAwesomeIcons
          name="volume-up"
          size={24}
          color="white"
          style={{ marginTop: 8 }}
        />
      </View>
    </View>
  );
};

export default PlayerControls;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  playerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 250,
    opacity: 0.75,
    marginTop: 40,
    marginBottom: 40,
  },
  volumeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    opacity: 0.5,
  },
  volumeBar: {
    width: 250,
  },
  trackStyle: {
    height: 4,
    borderRadius: 0,
  },
  thumbStyle: {
    height: 0,
    width: 0,
  },
});
