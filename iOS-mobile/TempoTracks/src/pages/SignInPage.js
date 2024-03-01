import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { userLogIn } from '../api/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [textColor, setTextColor] = useState('black');

  async function checkLogin() {

    if (email == '' || password == '') {
      setTextColor('#ff5555');
    } else {
      let data = await userLogIn(email, password);
      console.log('Data: ');
      console.log(data);

      if (data !== null) {
        storeData(data);
        navigation.navigate('Root', { screen: 'Home' });
      } else {
        setTextColor('#ff5555');
        console.log('Incorrect Email/Password');
      }
    }
  }

  async function storeData(input) {
    try {
      await AsyncStorage.setItem('user_data', JSON.stringify(input));
      console.log('Data Stored');
      console.log(input);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.full}>
      <View style={[styles.container, { flexDirection: 'column' }]}>
        <View style={{ flex: 2 }}>
          <Pressable
            style={styles.signButton}
            onPress={() => navigation.navigate('Launch')}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '100' }}>
              Back
            </Text>
          </Pressable>
        </View>
        <View style={{ flex: 6 }}>
          <Text style={styles.title}>Let's sign you in.</Text>
          <Text style={styles.body}>Welcome back.</Text>
          <Text style={styles.body}>You've been missed!</Text>
        </View>
        <View style={{ flex: 10 }}>
          <TextInput
            style={styles.input}
            placeholder='Email'
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
          />
          <Text style={[styles.help2, { color: textColor }]}>
            Incorrect Email/Password.
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={[styles.helpContainer, { flexDirection: 'row' }]}>
            <Text style={styles.help}>Don't have an account? </Text>
            <Text
              style={styles.help1}
              onPress={() => navigation.navigate('Register')}
            >
              Register
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Pressable style={styles.buttonContainer} onPress={checkLogin}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  full: {
    height: '100%',
    padding: 30,
    backgroundColor: 'black',
  },
  container: {
    height: '90%',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  helpContainer: {
    alignSelf: 'center',
  },
  title: {
    fontSize: 26,
    color: 'white',
    paddingBottom: 20,
  },
  body: {
    fontSize: 26,
    color: 'white',
    fontWeight: 100,
  },
  buttonContainer: {
    width: '100%',
    height: 45,
    justifyContent: 'space-between',
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  help: {
    alignSelf: 'center',
    color: '#6b6b6b',
    fontSize: 11,
  },
  help1: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 11,
  },
  help2: {
    color: '#6b6b6b',
    fontSize: 11,
    marginLeft: 9,
    marginTop: 4,
  },
  help3: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 11,
    marginTop: 4,
  },
  input: {
    width: '100%',
    height: 45,
    margin: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3b3b3b',
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
    placeholderTextColor: '#3b3b3b',
    padding: 15,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
  },
});
export default SignInPage;
