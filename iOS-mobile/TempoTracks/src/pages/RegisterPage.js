import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { createUser } from '../api/User';

const RegisterPage = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [textColor, setTextColor] = useState('#181818');

    function checkUser() {
       if (email == "" || password1 == "" || password2 == "" || firstName == "" || lastName == "" || username == "" || phoneNumber == "") {
            setTextColor('#ff5555')
        }
        else if (password1 != password2) {
            setTextColor('#ff5555')
        }
        else {
            createUser(username, firstName, lastName, email, phoneNumber, password1);
            navigation.navigate('Root', { screen: 'Home' })
        }
    }

    return (
        <View style={styles.full}>
            <View style={[styles.container, { flexDirection: 'column' }]}>
                <View style={{ flex: 2 }}>
                    <Pressable style={styles.signButton} onPress={() => navigation.navigate("Launch")}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '100' }}>Back</Text>
                    </Pressable>
                </View>
                <View style={{ flex: 6 }}>
                    <Text style={styles.title}>Welcome back.</Text>
                    <Text style={styles.body}>Let's create you an account</Text>
                </View>
                <View style={{ flex: 26 }}>
                    <TextInput style={styles.input} placeholder='First Name' onChangeText={(firstName) => setFirstName(firstName)} />
                    <TextInput style={styles.input} placeholder='Last Name' onChangeText={(lastName) => setLastName(lastName)} />
                    <TextInput style={styles.input} placeholder='Username' onChangeText={(username) => setUsername(username)} />
                    <TextInput style={styles.input} placeholder='Email' onChangeText={(email) => setEmail(email)} />
                    <TextInput style={styles.input} placeholder='Phone Number' onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)} />
                    <TextInput style={styles.input} placeholder='Password' onChangeText={(password1) => setPassword1(password1)} secureTextEntry={true} />
                    <TextInput style={styles.input} placeholder='Confirm Password' onChangeText={(password2) => setPassword2(password2)} secureTextEntry={true} />
                    <Text style={[styles.help2, { color:textColor }]}>Invalid User Data.</Text>
                </View>
            </View>
            <View>
                <Pressable style={styles.buttonContainer} onPress={checkUser}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Register</Text>
                </Pressable>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    full: {
        height: "100%",
        padding: "30pt",
        backgroundColor: "#181818"
    },
    container: {
        height: "90%",
        justifyContent: 'space-between',
        backgroundColor: "#181818"
    },
    helpContainer: {
        alignSelf: 'center',
    },
    title: {
        fontSize: "26pt",
        color: 'white',
        paddingBottom: 20
    },
    body: {
        fontSize: "18pt",
        color: 'white',
        fontWeight: 100
    },
    buttonContainer: {
        width: "100%",
        height: "45pt",
        justifyContent: 'space-between',
        borderRadius: 20,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },
    help: {
        alignSelf: 'center',
        color: '#6b6b6b',
        fontSize: "11pt"
    },
    help1: {
        alignSelf: 'center',
        color: 'white',
        fontSize: "11pt",
    },
    help2: {
        color: '#6b6b6b',
        fontSize: "11pt",
        marginLeft: 9,
        marginTop: 4
    },
    help3: {
        alignSelf: 'center',
        color: 'white',
        fontSize: "11pt",
        marginTop: 4
    },
    input: {
        width: "100%",
        height: "45pt",
        margin: 5,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#3b3b3b',
        backgroundColor: "#222222",
        alignItems: 'center',
        justifyContent: 'center',
        placeholderTextColor: '#3b3b3b',
        padding: 15,
        fontWeight: 500,
        color: 'white',
        fontSize: 15
    }
});
export default RegisterPage;
