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
        width: '80vw',
        height: '8vh',
        backgroundColor: '#508991',
        borderRadius: 5,
        margin: 5,
        justifyContent: 'center',
          alignItems: 'start'
      }}>
        <Text
        style={{
          fontWeight: 'bold',
          marginLeft: 10,
        }}>
          {`Playlist - ${props.name}`}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default Playlist