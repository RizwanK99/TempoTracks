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
import { 
  getSongLibrary,
  play, 
  requestMusicAuthorization,
  pause,
  changePlaybackRate,
  playSongWithId,
  getCurrentQueue,
  searchMusicCatalog
} from '../module/MusicManager';
// import Slider from '@react-native-community/slider';

const PocPage = () => {

  const [songs, setSongs] = useState([])

  useEffect(() => {
    requestMusicAuthorization()
    .then(async () => {
      const songLibraryData = await getSongLibrary()
      const songs = songLibraryData[0]
      setSongs(songs)
    })
  }, [])

  // get current queue
  const getQueue = async () => {
    const currentQueue = await getCurrentQueue()
    console.log('currentQueue', currentQueue)
  }

  // add to queue
  const addToQueue = async () => {
    const songIds = songs.map(song => song.id)
    const addedToQueue = await addSongsToQueue(songIds)
    console.log('addedToQueue', addedToQueue)
  }

  // search music searchMusicCatalog
  const searchMusicCat = async () => {
    const searchTerm = 'Sprinter'
    const searchResults = await searchMusicCatalog(searchTerm)
    console.log('searchResults', searchResults)
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
          onPress={() => playSongWithId(song.id)}
        >
            {song.title} - {song.artistName}
        </Text>
      ))}

      <View style={{ marginTop: 15 }}>
        <Button title="Go Back" onPress={() => changePlaybackRate(0.75)}/>
        <Button title="Play" onPress={play}/>
        <Button title="Pause" onPress={pause}/>
        <Button title="Go Forward" onPress={() => changePlaybackRate(1.5)}/>
        <Button title="Add to queue" onPress={addToQueue}/>
        <Button title="Search Catalogue" onPress={searchMusicCat}/>
        <Button title="Get Queue" onPress={getQueue}/>
      </View>
    </View>
  );
}

export default PocPage;