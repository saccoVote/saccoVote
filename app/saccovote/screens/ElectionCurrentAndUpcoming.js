import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import electionService from "../services/ElectionService";
import ElectionCard from '../components/ElectionCard'


const ElectionCurrentAndUpcomingScreen = ({ navigation }) => {
  const [elections, setElections] = useState([])

  const fetchElections = async () => {
    response = await electionService.getElections()
    if (response.ok) {
      const data = await response.json()
      setElections(data.results.filter(e => new Date(e.start_date) > new Date() || (new Date(e.start_date) < new Date() && new Date(e.end_date) > new Date())))
    } else {
    }
  }

  useFocusEffect(React.useCallback(() => { fetchElections() }, []))

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Elections | Upcoming & Ongoing</Text>
        {elections.length ?
          <View style={styles.elections}>
            {elections.map((election) => (
              <ElectionCard key={election.id} election={election} navigation={navigation} />
            ))}
          </View>
          :
          <Text style={{textAlign: 'center', color: 'grey'}}>No upcoming or ongoing elections available at the moment</Text>
        }
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
