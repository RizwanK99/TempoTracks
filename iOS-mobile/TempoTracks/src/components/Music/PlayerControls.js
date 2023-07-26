import { useState } from "react";
import { 
  TouchableOpacity,
  View
} from "react-native"
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import { musicStyles } from "./styles"
import { changePlaybackRate, pause, play } from "../../module/MusicManager";
import { Slider } from 'react-native-elements';

const PlayerControls = ({
  isPlaying,
  setIsPlaying,
  playbackRate,
  handlePlaybackRateChange
}) => {
  const togglePlay = () => {
    if (isPlaying) {
      // pause the song
      pause()
    }
    else {
      // play the song
      play()
    }
    setIsPlaying(!isPlaying)
  }

  const onPlaybackRateChange = (newPlaybackRate) => {
    handlePlaybackRateChange(newPlaybackRate)
  }

  return (
    <View style={musicStyles.playerContainer}>
      <View style={musicStyles.playerControls}>
        <TouchableOpacity>
          <AntDesignIcons name="banckward" size={48} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={togglePlay}>
          {isPlaying ? (
            <AntDesignIcons name="pausecircle" size={48} color="white"/>
          ) : (
            <AntDesignIcons name="play" size={48} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity>
          <AntDesignIcons name="forward" size={48} color="white" />
        </TouchableOpacity>
      </View>

      {/* <Slider
        value={playbackRate}
        minimumValue={0.5}
        maximumValue={1.5}
        step={0.01}
        onValueChange={onPlaybackRateChange}
        style={{ width: '80%' }}
        thumbTintColor="#09BC8A"
        minimumTrackTintColor="#09BC8A"
      /> */}
    </View>
  )
}

export default PlayerControls