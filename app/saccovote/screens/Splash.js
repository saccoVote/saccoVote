import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const logo = require('../assets/images/logo2.png');

const SplashScreen = ({navigation}) => {
    // TODO: check if token and navigate to home, otherwise navigate to email
    return(
        <View style={styles.container}>
            <TouchableOpacity  style={styles.container} onPress={() => {
                navigation.navigate("EmailScreen")
            }}>
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
