import { useEffect, useState } from 'react'
import { 
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { NativeModules } from 'react-native'
// import Slider from '@react-native-community/slider';

const PocPage = () => {

  const [songs, setSongs] = useState([])

  useEffect(() => {
    console.log("fetching")
    requestAuth()
  }, [])

  const requestAuth = async () => {
    NativeModules.Counter.requestAuthorization()
      .then(res => {
        console.log("auth response", res)
        getSongLibrary()
      })
      .catch(e => console.log(e.message, e.code))
  }

  const getSongLibrary = () => {
    NativeModules.Counter.getSongLibrary()
      .then(res => {
        console.log("songs", res[0])
        setSongs(res[0])
      })
      .catch(e => console.log(e.message, e.code))
  }

  const playSong = (songId) => {
    NativeModules.Counter.playSongWithId(songId)
  }

  const play = () => {
    NativeModules.Counter.changePlayerPlayback("PLAY")
  }

  const pause = () => {
    NativeModules.Counter.changePlayerPlayback("PAUSE")
  }

  const changePlayerState = (playbackRate) => {
    NativeModules.Counter.changePlayerState(
      playbackRate,
      "",
      ""
    )
  }

  return (
    <View style={{ justifyContent: 'center', padding: 25, paddingTop: 75 }}>
      <Text style={{ fontSize: 24 }}>Music Library Page</Text>
      
      {songs.map(song => (
        <Text 
          key={song.id}
          style={{
            padding: 10,
            borderWidth: 1,
            margin: 5
          }}
          onPress={() => playSong(song.id)}
        >
            {song.title} - {song.artistName}
        </Text>
      ))}

      <View style={{ marginTop: 15 }}>
        <Button title="Go Back" onPress={() => changePlayerState(0.75)}/>
        <Button title="Play" onPress={play}/>
        <Button title="Pause" onPress={pause}/>
        <Button title="Go Forward" onPress={() => changePlayerState(1.5)}/>

        {/* <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        /> */}
      </View>
    </View>
  );
}

export default PocPage;