import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const electionsData = [
  { id: '1', status: 'ongoing', startDate: '3rd Jan, 2024', endDate: '7th Feb, 2024' },
  { id: '2', status: 'ongoing', startDate: '2nd Feb, 2024', endDate: '7th Feb, 2024' },
  { id: '3', status: 'soon', startDate: '2nd Feb, 2024', endDate: '7th Feb, 2024' },
  { id: '4', status: 'soon', startDate: '2nd Feb, 2024', endDate: '7th Feb, 2024' },
];

const ElectionCurrentAndUpcomingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Elections | Upcoming & Ongoing</Text>
      {electionsData.map((election, index) => (
        <TouchableOpacity onPress={() => {
          navigation.navigate("ElectionCurrentAndUpcomingTab",{screen:"OngoingElectionScreen"})
        }}>
          <View key={election.id} style={styles.electionItem}>
            <Text style={styles.position}>Secretary - Risk Management Committee</Text>
            <Text style={styles.candidatesCount}>5 candidates</Text>
            <Text style={styles.status(election.status)}>{election.status}</Text>
            <Text style={styles.dates}>Starts on {election.startDate} until {election.endDate}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  electionItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
  },
  position: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  candidatesCount: {
    fontSize: 16,
    marginBottom: 5,
  },
  status: (status) => ({
    fontSize: 16,
    color: status === 'ongoing' ? 'green' : 'grey',
    fontWeight: 'bold',
    textAlign: 'right',
  }),
  dates: {
    fontSize: 14,
  },
});

export default ElectionCurrentAndUpcomingScreen;
