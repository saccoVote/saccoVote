import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileManagement = () => {
  const [phoneNumber, setPhoneNumber] = useState('07 xxxxxxx'); 

  const handleSavePress = () => {
    
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.notificationIcon} onPress={() => {/* Handle notification press */ }}>
            <MaterialCommunityIcons name="bell-outline" size={30} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>Profile Management</Text>

        <View style={styles.header}>
          <Image source={require('../assets/images/profile.png')} style={styles.profileIcon} />
          <Text style={styles.headerText}>John Doe, Admin</Text>
          <Text style={styles.subHeaderText}>Chairman at Mapambo Sacco</Text>
        </View>

        <View style={styles.phoneContainer}>
          <Text style={styles.phoneLabel}>Phone number</Text>
          <TextInput
            style={styles.phoneNumberInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter phone number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 18,
    color: '#666',
  },
  profileIcon: {
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    marginRight: 20,
    marginBottom: 10,
  },
  phoneContainer: {},
  phoneLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  phoneNumberInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingBottom: 5,
    color: '#000',
  },
  topBar: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 10,
  },
  saveButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginBottom: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileManagement;
