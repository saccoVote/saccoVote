import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const FingerPrint = () => {
  const handleBiometricAuth = async () => {
    try {
      const supported = await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync();
      if (supported) {
        const result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
          // Biometric authentication succeeded
          Alert.alert('Success', 'Biometric authentication successful!');
        } else {
          // Biometric authentication failed
          Alert.alert('Error', 'Biometric authentication failed.');
        }
      } else {
        // Biometric authentication not supported or no fingerprints enrolled
        Alert.alert('Error', 'Biometric authentication is not available on this device or no fingerprints enrolled.');
      }
    } catch (error) {
      // Error occurred during biometric authentication
      Alert.alert('Error', 'An error occurred during biometric authentication.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Authenticate with Fingerprint" onPress={handleBiometricAuth} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: '#5FD25F',
    padding: 15,
    alignItems: 'center',
    borderRadius: 25,
  },
});

export default FingerPrint;
