// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { addSongsToQueue, getCurrentQueue, getSongLibrary, requestMusicAuthorization } from '../module/MusicManager';
import Song from '../components/Music/Song';
import { styles } from '../styles/Stylesheet';
import PlayerControls from '../components/Music/PlayerControls';
import LiveGraph from '../components/Music/LiveGraph';
import { changePlaybackRate } from '../module/MusicManager';
import { Button, Divider } from 'react-native-elements';

const MusicPage = ({ route, navigation }) => {

  const [authorized, setAuthorized] = useState(false);
  const [songs, setSongs] = useState([]);

  // Player Controls
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)

  const loadLibrary = async () => {
    const songData = await getSongLibrary();
    const songs = songData[0]
    setSongs(songs);
  }

  const loadAuthorization = async () => {
    await requestMusicAuthorization();
    setAuthorized(true);
  }

  const handlePlaybackRateChange = (newPlaybackRate) => {
    setIsPlaying(true)
    setPlaybackRate(newPlaybackRate)
    changePlaybackRate(newPlaybackRate)
  }

  useEffect(() => {
    loadAuthorization();
  }, []);

  useEffect(() => {
    loadLibrary();
  }, [authorized]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.full}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text
              style={{
                fontSize: 25,
                color: 'white',
                fontWeight: 'bold',
                marginBottom: 10
              }}
            >
              Your Library
            </Text>
            <ScrollView>
              {songs.map((song, index) => (
                <Song key={index} song={song} handlePlaybackRateChange={handlePlaybackRateChange} setIsPlaying={setIsPlaying}/>
              ))}
              <Button style={{ marginTop: 4 }} type="outline" title="Queue all songs" onPress={() => addSongsToQueue(songs.map(s => s.id))}/>
            </ScrollView >
            <Divider style={{ backgroundColor: 'white', marginVertical: 10 }} />
            <LiveGraph
              isPlaying={isPlaying}
              playbackRate={playbackRate}
              handlePlaybackRateChange={handlePlaybackRateChange}
            />
            <Divider style={{ backgroundColor: 'white', marginVertical: 10 }} />
            <PlayerControls 
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              playbackRate={playbackRate}
              handlePlaybackRateChange={handlePlaybackRateChange}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default MusicPage;