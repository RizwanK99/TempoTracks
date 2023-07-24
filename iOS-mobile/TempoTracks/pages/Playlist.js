import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';

const Playlist = props => {
  return (
    <SafeAreaView>
      <View
      style={{
        width: '60vw',
        height: '8vh',
        backgroundColor: '#09BC8A',
        borderRadius: 5,
        margin: 5,
        justifyContent: 'center',
          alignItems: 'start'
      }}>
        <Text
        style={{
          fontWeight: 'bold',
          marginLeft: 10
        }}>
          {`Playlists - ${props.name}`}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default Playlist