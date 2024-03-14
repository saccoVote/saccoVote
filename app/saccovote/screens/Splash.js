import {useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logo = require('../assets/images/logo2.png');

// AsyncStorage
// web localstorage
// androind keystore using rocksdb sqlite
// ios keychain

const SplashScreen = ({navigation}) => {
    const checkConfiguration = async () => {
        if(await AsyncStorage.getItem('token')) {
            navigation.navigate('HomeScreen')
        }
        else if(await AsyncStorage.getItem('email')) {
            navigation.navigate('PasswordScreen')
        }
        else {
            navigation.navigate('EmailScreen')
        }
        return
    }
    useEffect(() => {
        checkConfiguration()
    })

    return(
        <View style={styles.container}>
            <TouchableOpacity  style={styles.container} >
                <Text style={styles.title}>Modernizing Sacco Voting Experience</Text>
                <Image source={logo} style={styles.logo} />                
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
      },

    logo: {
    width: 200,
    height: 400,
    resizeMode: 'contain',
    marginTop: 40,
    },

    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 100,
      }
});

export default SplashScreen;
