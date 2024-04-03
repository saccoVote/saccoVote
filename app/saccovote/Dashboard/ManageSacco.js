import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import authService from '../services/AuthService';


const ManageSacco = () => {
  const [name, setName] = useState('Mapambo');
  const [logo, setLogo] = useState('');
  const [save, setSave] = useState('');

  const validateName = (name) => {
    const re = /^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/;
    return re.test(name);
  };

  const handleSavePress = async () => {
    try {
      setSave('saving'); 
      if (!validateName(name)) {
        Alert.alert('Invalid Name', 'Please enter a valid sacco name.');
        return;
      }
      
      //TODO:
      //Check whether the endpoint is implemented

      const response = await authService.manageSacco({ name, image: logo });

      if (!response.ok) {
        Alert.alert('An error occurred', 'Please try again.');
        return;
      }

      setSave('saved'); // Indicate that saving is successful
    } catch (error) {
      Alert.alert('An error occurred', 'Please try again!'); // Show an alert if an error occurs
    } finally {
      setSave(''); // Reset the save state after the operation completes
    }
  };

  const [members, setMembers] = useState([
    { id: 1, name: 'Alessandro Koome', avatar: require('../assets/images/profile.png') },
    { id: 2, name: 'EveCandy Mwende', avatar: require('../assets/images/profile.png') },
    { id: 3, name: 'Evalyne Mbogo', avatar: require('../assets/images/profile.png') },
    { id: 4, name: 'Shallom Nyawira', avatar: require('../assets/images/profile.png') },
  ]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topBar}>
          <MaterialCommunityIcons name="bell-outline" size={30} color="#000" />
        </View>
        <Text style={styles.heading1}>Sacco Management</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Logo"
            value={logo}
            onChangeText={setLogo}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          {save === 'saving' && <Text>Saving...</Text>}
          {save === 'saved' && <Text>Save successful</Text>}
        </View>
        <View style={styles.membersContainer}>
          <Text style={styles.heading2}>Members</Text>
          {members.map((member) => (
            <View key={member.id} style={styles.memberItem}>
              <Image source={member.avatar} style={styles.avatar} />
              <Text style={styles.memberName}>{member.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16, // Add paddingBottom to ensure content doesn't get cut off at the bottom
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  heading1: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 16,
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    height: 40,
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
  membersContainer: {
    flex: 1,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  memberName: {
    fontSize: 16,
  },
});

export default ManageSacco;
