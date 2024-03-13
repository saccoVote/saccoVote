import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const logo = require('../assets/images/logo2.png');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('email@example.com');
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignIn = () => {

    // Validate the password
    if (!validatePassword(password)) {
      Alert.alert('Invalid Password', 'Please enter the correct password.');
      return;
    }

    navigation.navigate('Dashboard');
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
        <Text style={Styles.emailText}>{email}</Text>
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

        <TouchableOpacity style={Styles.button} onPress={handleSignIn}>
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
  emailText: {
    fontSize: 16,
    paddingBottom: 50,
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

export default LoginScreen;
