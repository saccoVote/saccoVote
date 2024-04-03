import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';


const checkmark = require('../assets/checkmark.gif');

const SignUpSuccessScreen = ({ navigation }) => {
    // TODO:  Get gif to be displayed
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.container} onPress={() => {
                navigation.navigate("EmailScreen")
            }}>
                <Image source={checkmark} style={styles.checkmark} />
            </TouchableOpacity>
            <Text style={styles.title}>Sign up successful</Text>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate("EmailScreen")
            }}>
                <Text style={styles.buttonText}>Continue to Sign in</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUpSuccessScreen;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '70svw'
    },
    checkmark: {
        width: 200,
        height: 400,
        // Your logo styles here
    },
    title: {
        fontSize: 20,
        marginTop: 20,
        // Your title styles here
    },
    button: {
        backgroundColor: '#34C759',
        height: 50,
        width: '100%',
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        padding: 10,
      },
    
      buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
      },
};
