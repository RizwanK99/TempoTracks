import * as React from 'react';
import Playlist from './Playlist';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { endOfDay, format } from "date-fns";
import profileData from "../../mocks/profile_data.json";

const MusicPage = ({ route, navigation }) => {

  var formattedDate = format(endOfDay(new Date()), "EEEE, MMMM do");

  return (
    <SafeAreaView style={{ backgroundColor: 'black'  }}>
      <View style={styles.full}>
        <View style={styles.container}>
          <View style={[styles.topBar, { flex: 2 }]}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.welcome}>{formattedDate}</Text>
              <Text style={{ color: 'white', fontSize: 32 }}>Your Music</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile", { ...profileData })}
              style={[styles.btn_shape, { marginHorizontal: 10 }]}
            >
              <Text style={{ color: '#004346', fontSize: 26, alignSelf: "center", }}>{profileData.name[0]}</Text>
            </TouchableOpacity>

          </View>

          <View style={[styles.block, { flex: 3 }]}>
            <View style={{ flexDirection: "column", justifyContent: "center", width: "100%" }}>
              <Text style={{ color: 'white', fontSize: 20, marginBottom: 5 }}>Playlist Actions</Text>
              <TouchableOpacity style={styles.button}>
                <Text>Add Playlist</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text>Filter Playlist</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.block, { flex: 9, }]}>
            <View style={{ flexDirection: "column", justifyContent: "center", width: "100%" }}>
              <Text style={{ color: 'white', fontSize: 20, marginBottom: 20 }}>Your Playlists</Text>

              <ScrollView contentContainerStyle={{ height: '80%', backgroundColor: '#000000'}}>
                <Playlist name="Jog"></Playlist>
                <Playlist name="Run"></Playlist>
                <Playlist name="Hike"></Playlist>
                <Playlist name="HIIT"></Playlist>
                <Playlist name="Sprint"></Playlist>
                <Playlist name="Jog"></Playlist>
                <Playlist name="Run"></Playlist>
                <Playlist name="Hike"></Playlist>
                <Playlist name="HIIT"></Playlist>
                <Playlist name="Sprint"></Playlist>
              </ScrollView >
            </View>
          </View>



        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  full: {
    backgroundColor: 'black',
    height: "100%"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: 'black',
    marginHorizontal: 20,
    height: "100%"
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#09BC8A',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10
  },
  block: {
    width: "100%",
    justifyContent: "flex-start",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center"

  },
  welcome: {
    width: "100%",
    color: 'grey',
    fontSize: 12,
    textTransform: "uppercase"
  },
  btn_shape: {
    backgroundColor: "#09bc8a",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#004346",
    margin: 10,
    height: 30,
    width: 30,
    textAlign: "center",
  },
});
export default MusicPage;