import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView} from 'react-native';

const logo = require('../assets/images/logo2.png');

const SignupScreen = ({ navigation }) => {
    const [saccoName, setSaccoName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      };
  
      const validateName = (name) => {
        const re = /^[a-zA-Z]+$/;
        return re.test(name);
      };

    // to use this function later
    const handleSignUp = () => {
        
    // Validate the Sacco Name
    if (!validateName(saccoName)) {
        Alert.alert('Invalid Name', 'Please enter a valid sacco name.');
        return;
      }

      // Validate the Email
      if (!validateEmail(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return;
      }

      // Validate the Passwords
      if (password !== confirmPassword) {
        Alert.alert('Passwords Do Not Match', 'Please make sure your passwords match.');
        return;
      }


      // Checks if the sacco name and details exist in the database


    navigation.navigate('Dashboard');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.logoWrapper}>
                <Image source={logo} style={styles.logo} />
               {/*  <Text style={styles.voteText}>Vote</Text> */}
            </View>

            <Text style={styles.signupAsSacco}>Sign up as a sacco</Text>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
                <TextInput
                    style={styles.input}
                    placeholder="Sacco Name"
                    value={saccoName}
                    onChangeText={setSaccoName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    value={email}
                    keyboardType="email-address"
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    secureTextEntry
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingTop: 80,
        paddingBottom: 20,
    },
    logoWrapper: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    voteText: {
        fontSize: 22,
        fontWeight: '700',
        color: 'green',
        transform: [{ rotate: '-45deg' }],
        marginTop: -20,
    },
    signupAsSacco: {
        fontSize: 24,
        fontWeight: '700',
        color: 'black',
        alignSelf: 'center',
        marginBottom: 30,
    },
    keyboardAvoidingView: {
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
        padding: 20,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SignupScreen;
