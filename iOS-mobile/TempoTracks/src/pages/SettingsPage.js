// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, { useState } from "react";
import { Switch  } from 'react-native-paper';
//import { Slider } from 'react-native-elements';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';

const SettingsPage = ({ route, navigation }) => {
  const [dataStream, setDataStream] = useState(false);

  const onToggleSwitch = () =>{
    setDataStream(!dataStream);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 25,
          margin: 10
        }}>
          Account
        </Text>
        <Text style={{
          fontSize: 20,
          margin: 10
        }}>
          Email
        </Text>
      </View>
      <View>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 25,
          margin: 10
        }}>
          Data Saver
        </Text>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        <Text style={{
          fontSize: 20,
          margin: 10
        }}>
          Turn Off Data Streaming
        </Text>
        <Switch value={dataStream} onValueChange={onToggleSwitch} />
        </View>
      </View>
      <View>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 25,
          margin: 10
        }}>
          Playback
        </Text>
        <View style={{
          display: flex,
          flexDirection: 'row'
        }}>
          <Text style={{
            fontSize: 20,
            margin: 10
          }}>
            Crossfade
          </Text>
        </View>
        <Text style={{
          fontSize: 20,
          margin: 10
        }}>
          Automix
        </Text>
        <Text style={{
          fontSize: 20,
          margin: 10
        }}>
          Explicit Content
        </Text>
      </View>
      <View>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 25,
          margin: 10
        }}>
          Workouts
        </Text>
        <Text style={{
          fontSize: 20,
          margin: 10
        }}>
          Peak Normalization
        </Text>
        <Text style={{
          fontSize: 20,
          margin: 10
        }}>
          High BPM Warning
        </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  setting: {
    display: flex,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
export default SettingsPage;