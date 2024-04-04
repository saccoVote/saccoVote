import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const NewElectionScreen = () => {
  const [electionTitle, setElectionTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [closeDate, setCloseDate] = useState('');

  const handleAddElection = () => {
    // Logic to handle adding a new election
    // const handleAddElection = async () => {
    //   if (!electionTitle || !startDate || !closeDate) {
    //     alert('Please fill all the fields.');
    //     return;
    //   }
    
    //   try {
    //     const response = await fetch('https://your-backend-service.com/elections', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         title: electionTitle,
    //         start_date: startDate,
    //         close_date: closeDate,
    //       }),
    //     });
    
    //     if (response.ok) {
    //       const jsonResponse = await response.json();
    //       console.log('Election added:', jsonResponse);
    //       alert('Election added successfully!');
    //       // Reset the form or navigate to another screen
    //     } else {
    //       throw new Error('Failed to add election');
    //     }
    //   } catch (error) {
    //     console.error('Error adding election:', error);
    //     alert('Error adding election. Please try again later.');
    //   }
    // };
    
    console.log({
      electionTitle,
      startDate,
      closeDate,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Start a new election</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Election Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Chairman - committee A"
          value={electionTitle}
          onChangeText={setElectionTitle}
        />
        <Text style={styles.label}>Start Date</Text>
        <TextInput
          style={styles.input}
          placeholder="2nd Jan 2024 at 12:00AM"
          value={startDate}
          onChangeText={setStartDate}
        />
        <Text style={styles.label}>Close Date</Text>
        <TextInput
          style={styles.input}
          placeholder="9th Jan 2024 at 12:00AM"
          value={closeDate}
          onChangeText={setCloseDate}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddElection}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
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
    fontSize: 18,
    marginBottom: 10,
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
    backgroundColor: '#5FD25F',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewElectionScreen;
