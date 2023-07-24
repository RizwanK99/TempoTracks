import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';

const SignInPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>TempoTracks</Text>
            <TextInput placeholder='Email' />
            <TextInput placeholder='Password' />
            <Button onPress={() => navigation.navigate('Root', {screen: 'Home'})} title='Log in' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default SignInPage;
