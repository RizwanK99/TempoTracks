import { Text, TouchableOpacity, View } from "react-native"
import { musicStyles } from "./styles"
import { playSongWithId } from "../../module/MusicManager"

const Song = ({ song }) => {

  const handleOnClick = () => {
    console.log('song', song)
    playSongWithId(song.id)
  }

  return (
    <TouchableOpacity onPress={handleOnClick}>
      <View style={musicStyles.song}>
        <Text style={musicStyles.songTitle}>
          {song.title}
        </Text>
        <Text style={musicStyles.songArtist} numberOfLines={1}>
          {song.artistName}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Song