// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import { useState, useEffect } from 'react';
import Playlist from './Playlist';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { getSongLibrary, requestMusicAuthorization } from '../module/MusicManager';
import Song from '../components/Music/Song';
import { styles } from '../styles/Stylesheet';
import Player from '../components/Music/Player';

const MusicPage = ({ route, navigation }) => {

  const [authorized, setAuthorized] = useState(false);
  const [songs, setSongs] = useState([]);

  const loadLibrary = async () => {
    const songData = await getSongLibrary();
    const songs = songData[0]
    setSongs(songs);
  }

  const loadAuthorization = async () => {
    await requestMusicAuthorization();
    setAuthorized(true);
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
            <ScrollView >
              {songs.map((song, index) => (
                <Song key={index} song={song} />
              ))}
            </ScrollView >
            <Player/>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default MusicPage;