import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import ElectionCard from '../components/ElectionCard'


const electionsData = [
  { id: '1', title: 'Secretary - Risk Management Committee', candidates_count: 5, start_date: '2024-04-03T00:00:00Z', end_date: '2024-04-21T00:00:00Z' },
  { id: '2', title: 'Chairperson - Risk Management Committee', candidates_count: 5, start_date: '2024-03-29T00:00:00Z', end_date: '2024-04-17T00:00:00Z' },
  { id: '3', title: 'Credit Committee Member', candidates_count: 5, start_date: '2024-04-28T00:00:00Z', end_date: '2024-05-07T00:00:00Z' },
  { id: '4', title: 'Treasurer - Credit Management Committee', candidates_count: 5, start_date: '2024-04-28T00:00:00Z', end_date: '2024-05-07T00:00:00Z' },
  { id: '5', title: 'Secretary - Risk Management Committee', candidates_count: 5, start_date: '2024-04-28T00:00:00Z', end_date: '2024-05-07T00:00:00Z' },
];

const ElectionCurrentAndUpcomingScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Elections | Upcoming & Ongoing</Text>
        <View style={styles.elections}>
          {electionsData.map((election) => (
            <ElectionCard key={election.id} election={election} navigation={navigation}/>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 80,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  elections: {
    gap: 15,
    padding: 10,
  }
});

export default ElectionCurrentAndUpcomingScreen;
