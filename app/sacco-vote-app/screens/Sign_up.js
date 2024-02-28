import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';


const logo = require('../assets/logo.png');


const SignupScreen = ({ navigation }) => {
    const handleContinue = () => {
      navigation.navigate('Dashboard');
    };

    return(
        <view>
            <text>Sacco Vote</text>
        </view>

    );

};

export default SignupScreen;