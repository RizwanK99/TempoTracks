import { Text, TouchableOpacity, View, Image } from 'react-native';
import { musicStyles } from './styles';
import { MusicManager } from '../../module/MusicManager';

export const SongItem = ({ song, setIsPlaying, handlePlaybackRateChange }) => {
  const handleOnClick = () => {
    console.log('song', song);
    MusicManager.playSongWithId(song.id);
    setIsPlaying(true);
    handlePlaybackRateChange(1);
  };

  return (
    <TouchableOpacity onPress={handleOnClick}>
      <View style={musicStyles.song}>
        <Text style={musicStyles.songTitle}>{song.title}</Text>
        <Text style={musicStyles.songArtist} numberOfLines={1}>
          {song.artistName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
