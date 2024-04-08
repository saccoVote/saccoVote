import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import electionService from '../services/ElectionService';
import saccoService from '../services/SaccoService';
import { useNavigation } from '@react-navigation/native';
import CustomDateTimePicker from './CustomDateTimePicker';


const AddorEditElection = ({ electionId, handleSubmitElection }) => {
  const [electionTitle, setElectionTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [closeDate, setCloseDate] = useState(new Date());
  const [submitting, setSubmitting] = useState(false)
  const [selectedSacco, setSelectedSacco] = useState(null)
  const navigation = useNavigation()
  const [electionTitleIsValidOrPristine, setElectionTitleIsValidOrPristine] = useState(true)
  const [startDateIsValidOrPristine, setStartDateIsValidOrPristine] = useState(true)
  const [closeDateIsValidOrPristine, setCloseDateIsValidOrPristine] = useState(true)

  const fetchSelectedSacco = async () => {
    response = await saccoService.getSelectedSacco()
    if (response.ok) {
      setSelectedSacco(await response.json())
    } else {
      // TODO: Either no sacco selected, it has been deleted, or network issues
      // Handle however you wish. e.g. show dialog to reload or go to sacco switcher
    }
  }

  const fetchElection = async () => {
    response = await electionService.getElection(electionId)
    if (response.ok) {
      const election = await response.json()
      setElectionTitle(election.title)
      setStartDate(new Date(election.start_date)) // TODO: convert date string to date object
      setCloseDate(new Date(election.end_date)) // TODO: convert date string to date object
    } else {
    }
  }

  useFocusEffect(React.useCallback(() => {
    // fetch sacco fullname
    fetchSelectedSacco()
    // fetch current election info and prepopulate form
    if (electionId) fetchElection()
  }, [electionId]))

  const formIsValid = () => {
    if (!electionTitle || !electionTitle.trim()) {
      setElectionTitleIsValidOrPristine(false)
    } else {
      setElectionTitleIsValidOrPristine(true)
    }
    if (new Date() > startDate) {
      setStartDateIsValidOrPristine(false)
    } else {
      setStartDateIsValidOrPristine(true)
    }
    if (new Date() > closeDate || startDate > closeDate) {
      setCloseDateIsValidOrPristine(false)
    } else {
      setCloseDateIsValidOrPristine(true)
    }

    return electionTitle.trim() && electionTitleIsValidOrPristine && startDateIsValidOrPristine && closeDateIsValidOrPristine
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Start a new election in {selectedSacco?.sacco_name}</Text>
      <View style={[
        styles.formErrors,
        (electionTitleIsValidOrPristine && startDateIsValidOrPristine && closeDateIsValidOrPristine)
          ? { display: 'none' }
          : { display: 'flex' }
      ]}>
        {!electionTitleIsValidOrPristine && <Text>Election title is required</Text>}
        {!startDateIsValidOrPristine && <Text>Election start date is not valid</Text>}
        {!closeDateIsValidOrPristine && <Text>Election end date is not valid</Text>}
      </View>
      <View style={styles.form}>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Election Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Chairman - committee A"
              value={electionTitle}
              onChangeText={setElectionTitle}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Start Date</Text>
            <CustomDateTimePicker date={startDate} onChange={(event, selectedDate) => setStartDate(selectedDate || date)} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Close Date</Text>
            <CustomDateTimePicker date={closeDate} onChange={(event, selectedDate) => setCloseDate(selectedDate || date)} />
          </View>
        </View>
        <View style={styles.actionsContainer}>
          {electionId ?
            <>
              <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('ManageElectionsScreen')}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={submitting} style={styles.updateButton} onPress={() => {
                if (formIsValid()) {
                  handleSubmitElection({
                    title: electionTitle, start_date: startDate.toISOString(), end_date: closeDate.toISOString(),
                  }, setSubmitting)
                }
              }}>
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
            </>
            :
            <TouchableOpacity disabled={submitting} style={styles.addButton} onPress={() => {
              if (formIsValid()) {
                handleSubmitElection({
                  title: electionTitle, start_date: startDate.toISOString(), end_date: closeDate.toISOString(),
                }, setSubmitting)
              }
            }}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    alignSelf: 'stretch',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  inputsContainer: {
    marginBottom: 48
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
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
  actionsContainer: {
    flexDirection: 'row',
    gap: 15
  },
  formErrors: {
    color: 'red',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 5,
    margin: 5,
    padding: 5,
  }
});

export default AddorEditElection;
