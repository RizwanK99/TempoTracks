// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, { useState, useEffect } from "react";
import updateSettings from "../api/Settings";
import { useTheme } from "react-native-paper";
import { Switch, TextInput, Button, ToggleButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slider } from "react-native-elements";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native";
import useThemeStore from "../hooks/useThemeStore";

async function retrieveData(user, setUser) {
  try {
    const value = await AsyncStorage.getItem("user_data");
    if (value !== null) {
      let userData = JSON.parse(value);
      await setUser(userData);
    }
  } catch (error) {
    console.log("Error retreiving user data", error);
  }
}

const SettingsPage = ({ route, navigation }) => {
  const [user, setUser] = useState({});
  const [dataStream, setDataStream] = useState(false);
  const [fade, setFade] = useState(20);
  const [mix, setMix] = useState(20);
  const [explicitContent, setExplicitContent] = useState(false);
  const [peakNormalize, setPeakNormalize] = useState(1);
  const [bpmWarning, setBPMWarning] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const { toggleTheme } = useThemeStore();

  useEffect(() => {
    async function fetchData() {
      await retrieveData(user, setUser);
    }
    fetchData();
  }, [user.user_id]);

  useEffect(() => {
    console.log("State changed!");
    async function fetchData() {
      console.log("in async");
      await updateSettings(
        user.user_id,
        dataStream,
        fade,
        mix,
        explicitContent,
        peakNormalize,
        bpmWarning
      );
    }
    fetchData();
  });

  const onToggleSwitch = () => {
    setDataStream(!dataStream);
  };

  const onFade = (value) => {
    setFade(value);
    console.log(value);
  };

  const onMix = (value) => {
    setMix(value);
    console.log(value);
  };

  const onExplicitContent = () => {
    setExplicitContent(!explicitContent);
  };

  const onBPMWarning = () => {
    setBPMWarning(!bpmWarning);
  };

  const onDarkMode = () => {
    setDarkMode(!darkMode)
    toggleTheme()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background}}>
      <Text
        style={{
          color: theme.colors.text,
          fontWeight: "bold",
          marginTop: "5%",
          marginLeft: "2%",
          fontSize: 25,
        }}
      >
        Settings
      </Text>
      <ScrollView>
        <View>
          <Text style={[styles.settingGroup, {color: theme.colors.text}]}>Account</Text>
          <View style={styles.setting}>
            <Text style={[styles.settingText, {color: theme.colors.text}]}>Email</Text>
            <TextInput label="Email" style={{width: '60%'}}/>
          </View>
        </View>
        <Button
          style={{ width: "45%", justifyContent: "flex-start", margin: "5%", borderRadius: 6 }}
          buttonColor="#09BC8A"
          icon="delete"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Delete Account
        </Button>
        <View>
          <Text style={[styles.settingGroup, {color: theme.colors.text}]}>Dark Mode</Text>
          <View style={styles.setting}>
            <Text style={[styles.settingText, {color: theme.colors.text}]}>Turn On Dark Mode</Text>
            <Switch
              color="#09BC8A"
              value={darkMode}
              onValueChange={onDarkMode}
            />
          </View>
        </View>
        <View>
          <Text style={[styles.settingGroup, {color: theme.colors.text}]}>Data Saver</Text>
          <View style={styles.setting}>
            <Text style={[styles.settingText, {color: theme.colors.text}]}>Turn Off Data Streaming</Text>
            <Switch
              color="#09BC8A"
              value={dataStream}
              onValueChange={onToggleSwitch}
            />
          </View>
        </View>
        <View>
          <Text style={[styles.settingGroup, {color: theme.colors.text}]}>Playback</Text>
          <View style={styles.setting}>
            <Text style={[styles.settingText, {color: theme.colors.text}]}>Crossfade</Text>
            <Text>0s</Text>
            <Slider
              style={{
                width: "50%",
              }}
              value={fade}
              onValueChange={onFade}
              step={0.25}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor={"09BC8A"}
              trackStyle={styles.trackStyle}
              thumbStyle={styles.thumbStyle}
              thumbTintColor="#09BC8A"
            />
            <Text>15s</Text>
          </View>
          <View style={styles.setting}>
            <Text style={[styles.settingText, {color: theme.colors.text}]}>Automix</Text>
            <Slider
              style={{
                width: "50%",
                marginLeft: "5%",
              }}
              value={mix}
              onValueChange={onMix}
              step={0.25}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor={"09BC8A"}
              trackStyle={styles.trackStyle}
              thumbStyle={styles.thumbStyle}
              thumbTintColor="#004346"
            />
          </View>
          <View style={styles.setting}>
            <Text style={[styles.settingText, {color: theme.colors.text}]}>Explicit Content</Text>
            <Switch
              color="#09BC8A"
              value={explicitContent}
              onValueChange={onExplicitContent}
            />
          </View>
        </View>
        <View>
          <Text style={[styles.settingGroup, {color: theme.colors.text}]}>Workouts</Text>
          <View style={styles.setting}>
            <Text style={[styles.settingText, {color: theme.colors.text}]}>Peak Normalization</Text>
            <ToggleButton icon="battery-low" value="low" />
            <ToggleButton icon="battery-medium" value="medium" />
            <ToggleButton icon="battery-high" value="high" />
          </View>
          <View style={styles.setting}>
            <Text style={[styles.settingText, {color: theme.colors.text}]}>High BPM Warning</Text>
            <Switch
              color="#09BC8A"
              value={bpmWarning}
              onValueChange={onBPMWarning}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  setting: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  settingText: {
    fontSize: 16,
    margin: "5%",
  },
  settingGroup: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
  },
  trackStyle: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#09BC8A",
  },
  thumbStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#09BC8A",
  },
});
export default SettingsPage;
