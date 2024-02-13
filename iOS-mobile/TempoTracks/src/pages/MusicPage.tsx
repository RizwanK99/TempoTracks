// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { SongItem } from '../components/Music/Song';
import { styles } from '../styles/Stylesheet';
import PlayerControls from '../components/Music/PlayerControls';
import LiveGraph from '../components/Music/LiveGraph';
import { MusicManager } from '../module/MusicManager';
import { Button, Divider } from 'react-native-elements';
import { MusicPlayerSong } from '../module/MusicManager.types';
import { MusicPlayer } from '../components/Music/MusicPlayer';
import { Tables } from '../lib/db.types';

const MusicPage = ({ route, navigation }) => {
  const [authorized, setAuthorized] = useState(false);
  const [songs, setSongs] = useState<MusicPlayerSong[]>([]);

  // Player Controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const loadLibrary = async () => {
    const songs = await MusicManager.getSongLibrary();
    console.log('songs', songs);
    setSongs(songs);
  };

  const loadAuthorization = async () => {
    await MusicManager.requestMusicAuthorization();
    setAuthorized(true);
  };

  const handlePlaybackRateChange = (newPlaybackRate: number) => {
    setIsPlaying(true);
    setPlaybackRate(newPlaybackRate);
    MusicManager.changePlaybackRate(newPlaybackRate);
  };

  useEffect(() => {
    loadAuthorization();
  }, []);

  useEffect(() => {
    loadLibrary();
  }, [authorized]);

  return (
    <SafeAreaView>
      <MusicPlayer />
      {/* <View style={styles.full}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text
              style={{
                fontSize: 25,
                color: 'white',
                fontWeight: 'bold',
                marginBottom: 10,
              }}
            >
              Your Library
            </Text>
            <ScrollView>
              {songs.map((song, index) => (
                <SongItem
                  key={index}
                  song={song}
                  handlePlaybackRateChange={handlePlaybackRateChange}
                  setIsPlaying={setIsPlaying}
                />
              ))}
              <Button
                style={{ marginTop: 4 }}
                type='outline'
                title='Queue all songs'
                onPress={() =>
                  MusicManager.addSongsToQueue(songs.map((s) => s.id))
                }
              />
            </ScrollView>
            <Divider style={{ backgroundColor: 'white', marginVertical: 10 }} />
            <LiveGraph
              isPlaying={isPlaying}
              playbackRate={playbackRate}
              handlePlaybackRateChange={handlePlaybackRateChange}
            />
            <PlayerControls
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              playbackRate={playbackRate}
              handlePlaybackRateChange={handlePlaybackRateChange}
            />
          </View>
        </View>
      </View> */}
    </SafeAreaView>
  );
};
export default MusicPage;
