import React, {useState} from 'react';
import { 
    StyleSheet, View, Text, TextInput, TouchableOpacity,
    Image, Alert, KeyboardAvoidingView, ScrollView, Platform, Animated} from 'react-native';
import authService from '../services/AuthService';
import Success from '../components/Success'


const logo = require('../assets/images/logo2.png');

// TODO: use toast instead of alert for most informational components
const SignupScreen = ({ navigation }) => {
    //Working with states for user inputs, intial value is empty string
    const [saccoName, setSaccoName] = useState('sacco no ');
    const [email, setEmail] = useState('koomealessandro@gmail.com');
    const [password, setPassword] = useState('Data@123');
    const [confirmPassword, setConfirmPassword] = useState('Data@123');

    const [showSuccess, setShowSuccess] = useState(false);

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };
  
    const validateName = (name) => {
        const re = /^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/;
        return re.test(name);
    };

    const handleSignUp = async () => {
        // TODO add redish border to fields with errors. validate fields on input i.e. real time
    
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

        try {
            const response = await  authService.signup({sacco_name: saccoName, email, password})
            if (!response.ok){
                Alert.alert('An error occurred', 'please try again.');
                return;
            }else{
                setShowSuccess(true)
                return;
            }
        } catch(e) {
            Alert.alert('An error occurred', 'please try again');
            return;
        }
    };

    return (
        <>
        {showSuccess ?
            (<ScrollView contentContainerStyle={styles.container}>
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
                            placeholder="email@example.com"
                            value={email}
                            keyboardType="email-address"
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="********"
                            value={password}
                            secureTextEntry
                            onChangeText={setPassword}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="********"
                            value={confirmPassword}
                            secureTextEntry
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                            <Text style={styles.buttonText}>Sign up</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
            </ScrollView>)
            
            : (<Success navigation={navigation}/>)}
            </>
    )
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
        width: 200,
        height: 200,
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
        //backgroundColor: '#D9D9D9',
        //borderTopRightRadius: 25,
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

export default SignupScreen;
