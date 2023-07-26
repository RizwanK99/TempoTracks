// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, { useState } from "react";
import { Switch, TextInput, Button, ToggleButton  } from 'react-native-paper';
import { Slider } from 'react-native-elements';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';

const SettingsPage = ({ route, navigation }) => {
  const [dataStream, setDataStream] = useState(false);
  const [fade, setFade] = useState(20);

  const onToggleSwitch = () =>{
    setDataStream(!dataStream);
  }

  const onFade = (value) => {
    setFade(value);
    console.log(value);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <Text style={{
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop: '5%',
        marginLeft: '35%',
        fontSize: 25
      }}>
        Settings
      </Text>
      <View>
        <Text style={styles.settingGroup}>
          Account
        </Text>
        <View style={styles.setting}>
        <Text style={styles.settingText}>
          Email
        </Text>
        <TextInput
          label="Email"
        />
        </View>
      </View>
      <Button style={{width: '45%', justifyContent: 'flex-start', margin: '5%'}} icon="delete" mode="contained" onPress={() => console.log('Pressed')}>
       Delete Account
      </Button>
      <View>
        <Text style={styles.settingGroup}>
          Data Saver
        </Text>
        <View style={styles.setting}>
        <Text style={styles.settingText}>
          Use Data When Streaming
        </Text>
        <Switch value={dataStream} onValueChange={onToggleSwitch} />
        </View>
      </View>
      <View>
        <Text style={styles.settingGroup}>
          Playback
        </Text>
        <View style={styles.setting}>
          <Text style={styles.settingText}>
            Crossfade
          </Text>
          <Text>
            0s
          </Text>
          <Slider
          style={{
            width: '50%'
          }}
          value={fade}
          onValueChange={onFade}
          step={0.25}
          minimumValue={0}
          maximumValue={100}
          trackStyle={styles.trackStyle}
          thumbStyle={styles.thumbStyle}
          thumbTintColor="#004346"
        />
        <Text>
            15s
          </Text>
        </View>
        <View style={
          styles.setting
        }
        >
        <Text style={styles.settingText}>
          Automix
        </Text>
        <Slider
          style={{
            width: '50%',
          }}
          value={fade}
          onValueChange={onFade}
          step={0.25}
          minimumValue={0}
          maximumValue={100}
          trackStyle={styles.trackStyle}
          thumbStyle={styles.thumbStyle}
          thumbTintColor="#004346"
        />
        </View>
        <View style={styles.setting}>
        <Text style={styles.settingText}>
          Explicit Content
        </Text>
        <Switch/>
        </View>
      </View>
      <View>
        <Text style={styles.settingGroup}>
          Workouts
        </Text>
        <View style={styles.setting}>
        <Text style={styles.settingText}>
          Peak Normalization
        </Text>
        <ToggleButton
      icon="battery-low"
      value="low"
    />
    <ToggleButton
      icon="battery-medium"
      value="medium"
    />
    <ToggleButton
      icon="battery-high"
      value="high"
    />
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingText}>
            High BPM Warning
          </Text>
          <Switch/>
        </View>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  settingText: {
    fontSize: 20,
    margin: '5%',
    color: '#FFFFFF'
  },
  settingGroup: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#FFFFFF',
    margin: 10
  },
  trackStyle: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#004346'
  },
  thumbStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#004346'
  }
});
export default SettingsPage;