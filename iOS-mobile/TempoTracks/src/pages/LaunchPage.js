import * as React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const LaunchPage = ({ navigation }) => {
    return (
        <View style={styles.full}>
            <View style={[styles.container, { flexDirection: 'column' }]}>
                <View style={{ flex: 10 }}>
                  
                </View>
                <View style={{ flex: 10 }}>
                    <Text style={styles.title}>TempoTracks</Text>
                    <Text style={styles.body}>Music to inspire, Beats to motivate.</Text>
                </View>
                <View style={{ flex: 2 }}>

                </View>

            </View>
            <View style={[styles.buttonContainer, { flexDirection: 'row' }]}>
                <Pressable style={styles.regButton}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Register</Text>
                </Pressable>
                <Pressable style={styles.signButton} onPress={() => navigation.navigate("SignIn")}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Sign In</Text>
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
    title: {
        fontSize: "40pt",
        alignSelf: 'center',
        color: 'white'
    },
    body: {
        fontSize: "12pt",
        alignSelf: 'center',
        color: '#6b6b6b'
    },
    buttonContainer: {
        width: "100%",
        height: "45pt",
        backgroundColor: '#222222',
        borderRadius: 20,
        justifyContent: 'space-between',
    },
    regButton: {
        borderRadius: 20,
        backgroundColor: 'white',
        textAlign: 'center',
        width: "50%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    signButton: {
        borderRadius: 20,
        backgroundColor: "transparent",
        width: "50%",
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default LaunchPage;