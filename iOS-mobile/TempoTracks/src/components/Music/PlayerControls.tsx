import { TouchableOpacity, View } from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { musicStyles } from './styles';
import { MusicManager } from '../../module/MusicManager';

const PlayerControls = ({
  isPlaying,
  setIsPlaying,
  playbackRate,
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
    <View style={musicStyles.playerContainer}>
      <View style={musicStyles.playerControls}>
        <TouchableOpacity onPress={() => MusicManager.restartSong()}>
          <AntDesignIcons name='banckward' size={48} color='white' />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlay}>
          {isPlaying ? (
            <AntDesignIcons name='pausecircle' size={48} color='white' />
          ) : (
            <AntDesignIcons name='play' size={48} color='white' />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => MusicManager.skipForward()}>
          <AntDesignIcons name='forward' size={48} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlayerControls;
