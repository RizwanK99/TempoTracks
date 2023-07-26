import * as React from 'react';
import {  TouchableOpacity,  StyleSheet,  View,  Text,  SafeAreaView,  Image,} from 'react-native';
import { IconButton } from 'react-native-paper';

const playFocusImage = require("../assets/play-button.png");

const Playlist = props => {
  return (
    <SafeAreaView>
      <View
        style={{
          height: 60,
          backgroundColor: '#508991',
          borderRadius: 5,
          margin : 5,
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row'
        }}>
        <View style={{
          width: '40%'
        }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginLeft: 10
            }}>
            {`Playlist - ${props.name}`}
          </Text>
        </View>
        <View >
          <IconButton icon={playFocusImage} style={styles.img} />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
  },
});


export default Playlist