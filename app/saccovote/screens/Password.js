import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { DataContext } from '../context/DataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/AuthService';


const logo = require('../assets/images/logo2.png');

const PasswordScreen = ({ navigation, route }) => {
  // const { data } = useContext(DataContext);
  const [email, setEmail] = useState(
    route.params?.email || ''
  );
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [signingIn, setSigningIn] = useState(false)

  const getEmail = async () => {
    const emailFromStorage = await AsyncStorage.getItem('email')
    if (!emailFromStorage) {
      navigation.navigate('EmailScreen')
    }
    setEmail(emailFromStorage)
  }

  useEffect(() => {
    getEmail()
  }, [])

  const handleSignIn = async () => {
    // sign in
    setSigningIn(true)
    const response = await authService.signin({ email, password })
    //if success, go to home, otherwise toast sign in failed 
    if (response.ok) {
      const token = (await response.json()).token
      await AsyncStorage.setItem('token', token)
      setSigningIn(false)
      navigation.navigate('SaccoSwitcherScreen');
    } else {
      Alert.alert('Sign in failed', 'Please check you credentials.') // TODO:
      setSigningIn(false)
    }
    return
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ScrollView contentContainerStyle={Styles.container}>
      <View style={Styles.logoWrapper}>
        <Image source={logo} style={Styles.logo} />
      </View>

      <View style={Styles.welcomeContainer}>
        <Text style={Styles.welcomeBack}>Welcome back, </Text>
        <View style={Styles.emailContainer}>
          <Text style={Styles.emailText}>{email}</Text>
          <TouchableOpacity style={Styles.changeEmail} onPress={ async () => {
            await AsyncStorage.removeItem('email')
            navigation.navigate('EmailScreen')
          }}>
            <Text style={Styles.changeEmail}>change email</Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={Styles.keyboardAvoidingView}>
        <Text style={Styles.passwordText}>Password</Text>
        <TextInput
          style={Styles.input}
          placeholder='***********'
          value={password}
          secureTextEntry={!isPasswordVisible}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={Styles.eyeIcon}>
          <Icon
            name={isPasswordVisible ? 'eye-off' : 'eye'} // toggles between eye and eye-off icons
            size={24}
            color="grey"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }}>
          <Text style={Styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Styles.button} onPress={handleSignIn} disabled={signingIn}>
          <Text style={Styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        {/* Add a fingerprint icon for biometric authentication*/}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 20,
    // paddingBottom: 20,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    marginBottom: 20,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  // voteText: {
  //   fontSize: 22,
  //   fontWeight: '700',
  //   color: 'green',
  //   transform: [{ rotate: '-45deg' }],
  //   marginTop: -20,
  // },
  welcomeBack: {
    fontSize: 24,
    fontWeight: '400',
    color: 'black',
    alignSelf: 'center',
    // marginBottom: 30,
    // paddingTop: 40,
  },
  emailContainer: {
    paddingBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  emailText: {
    fontSize: 16,
  },
  passwordText: {
    right: 100,
    fontSize: 20,
  },
  eyeIcon: {
    position: 'fixed',
    right: 0,
    left: 130,
    bottom: 60,

  },
  forgotPassword: {
    color: 'blue',
    left: 90,
    bottom: 30,
  },
  changeEmail: {
    color: 'blue',
    fontStyle: 'italic',
    fontSize: 16,
  },
  keyboardAvoidingView: {
    // backgroundColor: '#D9D9D9',
    // borderTopRightRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    width: '80%',
    backgroundColor: '#5FD25F',
    padding: 15,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PasswordScreen;
