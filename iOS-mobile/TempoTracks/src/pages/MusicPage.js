// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import Playlist from '../components/Music/Playlist';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView
} from 'react-native';

const MusicPage = ({ route, navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
            <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginBottom: 10
            }}>
              Playlist Actions
            </Text>
            <TouchableOpacity
            style={styles.button}
            /*onPress={
              () => navigation.navigate(
                'SettingsStack', { screen: 'Settings' }
              )}*/>
            <Text>Add Playlist</Text>
          </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            /*onPress={
              () => navigation.navigate(
                'SettingsStack', { screen: 'Settings' }
              )}*/>
            <Text>Filter Playlist</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
              marginTop: 30,
              fontWeight: 'bold'
            }}>
            Your Playlists
          </Text>
          <ScrollView 
          contentContainerStyle={{
            height: '80%',
            backgroundColor: 'white',
            width: '100%',
          }}>
            <Playlist name = "Jog"></Playlist>
            <Playlist name = "Run"></Playlist>
            <Playlist name = "Hike"></Playlist>
            <Playlist name = "HIIT"></Playlist>
            <Playlist name = "Sprint"></Playlist>
            <Playlist name = "Jog"></Playlist>
            <Playlist name = "Run"></Playlist>
            <Playlist name = "Hike"></Playlist>
            <Playlist name = "HIIT"></Playlist>
            <Playlist name = "Sprint"></Playlist>
          </ScrollView >
        </View>
        {/*<Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          React Native Bottom Navigation
        </Text>*/}
        {/*<Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.aboutreact.com
        </Text>*/}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#09BC8A',
    borderRadius: 15,
    padding: 10,
    width: 300,
    marginBottom: 10
  },
});
export default MusicPage;