import Checkbox from 'expo-checkbox';
import React, { useState, useEffect } from "react";
import {useFocusEffect} from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import saccoUserService from '../services/SaccoUserService';
import saccoService from '../services/SaccoService';
import { useNavigation } from '@react-navigation/native';
//import  AsyncStorage  from '@react-native-async-storage/async-storage';


const AddorEditMember = ({ userId, handleSubmitMember }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [memberId, setMemberId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedSacco, setSelectedSacco] = useState(null)
  const navigation = useNavigation()

  const fetchSelectedSacco = async () => {
    response = await saccoService.getSelectedSacco()
    if (response.ok) {
      setSelectedSacco(await response.json())
    } else {
      // TODO: Either no sacco selected, it has been deleted, or network issues
      // Handle however you wish. e.g. show dialog to reload or go to sacco switcher
    }
  }

  const fetchUser = async () => {
    response = await saccoUserService.getUser(userId)
    if (response.ok) {
      const user = await response.json()
      setFullname(user.fullname)
      setEmail(user.email)
      setMemberId(user.member_id)
      setPosition(user.position)
      setIsAdmin(user.role == 'admin')
    } else {
    }
  }

  useFocusEffect(React.useCallback(() => {
    console.debug('inside add or edit member component');
    // fetch sacco fullname
    fetchSelectedSacco()
    // fetch current user info and prepopulate form
    if(userId) fetchUser()
  }, [userId]))

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{selectedSacco?.sacco_name}</Text>
          {userId ?
            <Text style={styles.headerDescription}>
              If you edit a user's email, they will be sent a confirmation email to both of their emails about this change.
            </Text>
            :
            <Text style={styles.headerDescription}>
              New members you add will receive an email with their credentials together with instructions on how to download and use the app. A randomly secure generated password will be provided.
            </Text>
          }
        </View>

        <KeyboardAvoidingView
          style={styles.formContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <Text style={styles.formTitle}>{userId ? 'Edit' : 'Add new'} member</Text>

          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Fullname</Text>
              <TextInput style={styles.input} value={fullname} onChangeText={setFullname} placeholder="Enter Fullname" />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter Email Address" />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Position</Text>
              <TextInput style={styles.input} value={position} onChangeText={setPosition} placeholder="Enter Position" />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Member ID</Text>
              <TextInput style={styles.input} value={memberId} onChangeText={setMemberId} placeholder="Enter Member ID" />
            </View>

            <View>
              <View style={styles.section}>
                <Checkbox style={styles.checkbox} value={isAdmin} onValueChange={setIsAdmin} />
                <Text style={styles.paragraph}>Admin <Text style={styles.finePrint}>(If not checked, user's role in the sacco is set to member)</Text></Text>
              </View>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            {userId ?
              <>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('ViewMembersScreen')}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.updateButton} disabled={submitting}
                  onPress={()=> handleSubmitMember({ fullname, email, position, memberId, role: isAdmin ? 'admin' : 'member' }, setSubmitting)}>
                  <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
              </>
              :
              <TouchableOpacity style={styles.addButton} disabled={submitting}
                onPress={() => handleSubmitMember({ fullname, email, position, memberId, role: isAdmin ? 'admin' : 'member' }, setSubmitting)}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            }
          </View>
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
    paddingBottom: 80,
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
  inputsContainer: {
    marginBottom: 48
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
    flex: 1
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    // backgroundColor: '#34C759',
    borderColor: 'grey',
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1
  },
  cancelButtonText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  paragraph: {
    fontSize: 16,
    width: '80%'
  },
  checkbox: {
    margin: 8,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 15
  },
  finePrint: {
    color: 'grey'
  }

});


export default AddorEditMember;
