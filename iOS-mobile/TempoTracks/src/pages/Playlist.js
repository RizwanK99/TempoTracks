import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';

const playFocusImage = require("../assets/play-button.png");

const Playlist = props => {
  return (
    <SafeAreaView>
      <View
      style={{
        boxShadow: "3px 3px 3px #9E9E9E",
        width: '80vw',
        height: '8vh',
        backgroundColor: '#508991',
        borderRadius: 5,
        margin: 5,
        justifyContent: 'space-around',
          alignItems: 'center',
        flexDirection: 'row'
      }}>
        <View style={{
          width: '40vw'
        }}>
        <Text
        style={{
          fontWeight: 'bold',
          marginLeft: 10
        }}>
          {`Playlist - ${props.name}`}
        </Text>
        </View>
        <img src={playFocusImage} width="auto" height="50vh"
        >
        </img>
      </View>
    </SafeAreaView>
  );
}

export default Playlist