import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { NativeModules } from 'react-native'

const PocPage = () => {
  const getCountFunc = () => {
    NativeModules.Counter.getCount(value => {
      console.log("count is " + value)
    })
  }

  const getDecrementFunc = () => {
    NativeModules.Counter.decrement()
      .then(res => console.log(res))
      .catch(e => console.log(e.message, e.code))
  }

  const requestAuth = () => {
    NativeModules.Counter.requestAuthorization()
      .then(res => console.log(res))
      .catch(e => console.log(e.message, e.code))
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Poc Page</Text>
      <Button title="Increment" onPress={() => NativeModules.Counter.increment()} />
      <Button title="Decrement" onPress={() => getDecrementFunc()}/>
      <Button title="Get Count" onPress={() => getCountFunc()}/>
      <Button title="Request Auth" onPress={() => requestAuth()}/>
    </View>
  );
}

export default PocPage;