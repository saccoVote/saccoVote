import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';


const logo = require('../assets/images/logo.png');


const SignupScreen = ({ navigation }) => {
    const handleContinue = () => {
      navigation.navigate('Dashboard');
    };

    return(
        <view>
            <Image source={logo} style={styles.logo} />
            <text>Sacco Vote</text>
        </view>
    );

};

const style = StyleSheet.create({

});

export default SignupScreen;

/* 
Hello, I need help with a project here, I have written some code but when I trry running it on expo its not showing  an error is thrown, please checkk for me the home.js , signup.js whether they are written properly and the paths are okay: Android Bundled 3575ms (D:\School\PROJECTS 101\saccoVote\app\sacco-vote-app\App.js)
 ERROR  Invariant Violation: "main" has not been registered. This can happen if:
* Metro (the local dev server) is run from the wrong folder. Check if Metro is running, stop it and restart it in the current project.    
* A module failed to load due to an error and `AppRegistry.registerComponent` wasn't called., js engine: hermes
› Reloading apps */