import * as React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import "../../App.css";

const LaunchPage = ({ navigation }) => {
    return (
        <div className='background'>
            <div className='container'>
                <div className='logoImage'>
                    <img src="https://media.istockphoto.com/id/1244097573/vector/headphones-minimal-icon-with-sound-waves.jpg?s=612x612&w=0&k=20&c=OvARZEMYt_CM9M9-oJmMZ3O-HtEB-CAKqpGZPSA1acM="/>
                </div>
                <div >
                    <h1 className='title'>TempoTracks</h1>
                    <p className='body'>Music to inspire, beats to motivate.</p>
                </div>
                <div className='buttons'>
                    <button className='regButton'>Register</button>
                    <button className='signButton'>Sign In</button>
                </div>
            </div>
        </div>

    );
}
export default LaunchPage;