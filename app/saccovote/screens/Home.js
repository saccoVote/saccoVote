import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const logo = require('../assets/images/logo2.png');

const HomeScreen = ({ navigation }) => {
  const handleContinue = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Vote</Text>
      <Text style={styles.subTitle}>Enter your email address to continue</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TouchableOpacity onPress={handleContinue}  style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <Text style={styles.terms}>Terms and conditions apply.</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 100,
  },
  subTitle: {
    fontSize: 16,
    color: '#000000',
    marginTop: 30,
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    fontSize: 16,
    padding: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#34C759',
    height: 50,
    width: '100%',
    display:flex,
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
  terms: {
    fontSize: 12,
    color: '#000000',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});


export default HomeScreen;
