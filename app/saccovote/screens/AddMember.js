import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';

const AddMemberScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [memberId, setMemberId] = useState('');

  // Dummy data
  const dummyName = "John Doe";
  const dummyEmail = "email@example.com";
  const dummyPosition = "member";
  const dummyMemberId = "M18JH";

  
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Mapambo Sacco</Text>
          <Text style={styles.headerDescription}>
            New members you add will receive an email with their credentials together with instructions on how to download and use the app. A randomly secure generated password will be provided.
          </Text>
        </View>

        <KeyboardAvoidingView
          style={styles.formContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <Text style={styles.formTitle}>Add new member</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput style={styles.input} value={name || dummyName} onChangeText={setName} placeholder="Enter Full Name" />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput style={styles.input} value={email || dummyEmail} onChangeText={setEmail} placeholder="Enter Email Address" />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Position</Text>
            <TextInput style={styles.input} value={position || dummyPosition} onChangeText={setPosition} placeholder="Enter Position" />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Member ID</Text>
            <TextInput style={styles.input} value={memberId || dummyMemberId} onChangeText={setMemberId} placeholder="Enter Member ID" />
          </View>

          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerDescription: {
    fontSize: 16,
    color: '#888',
  },
  formContainer: {
    backgroundColor: '#E5E5E5',
    borderRadius: 25,
    padding: 20,
  },
  formTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    paddingBottom: 5,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddMemberScreen;
