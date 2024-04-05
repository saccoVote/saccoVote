import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

const UpcomingElectionScreen = () => {
  const candidates = [
    { name: 'Jackson Smith', description: 'Candidate details, position', image: require('../assets/images/profile.png') },
    { name: 'Jackson Smith', description: 'Candidate details, position', image: require('../assets/images/profile.png') },
    { name: 'Jackson Smith', description: 'Lorem ipsum' , image: require('../assets/images/profile.png') },
    { name: 'Jackson Smith', description: 'Lorem ipsum' , image: require('../assets/images/profile.png') },
    { name: 'Jackson Smith', description: 'Lorem ipsum', image: require('../assets/images/profile.png') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Election</Text>
      <Text style={styles.subtitle}>Secretary - Risk Management Committee</Text>
      <Text style={styles.details}>5 candidates</Text>
      <Text style={styles.details}>Starts on 2nd Feb, 2024 until 7th Feb, 2024</Text>
      <Text style={styles.sectionTitle}>Candidates</Text>
      {candidates.map((election) => (
        <View key={election.id} style={styles.recentElectionCard}>
          <View style={styles.recentElectionTextContainer}>
            <Text style={styles.recentElectionRole}>{election.title}</Text>
            <Text style={styles.recentElectionName}>{election.name}</Text>
            <Text style={styles.recentElectionName}>{election.term}</Text>
          </View>
          <Image source={election.image} style={styles.recentElectionAvatar} />
        </View>
        ))}
      <Button title="Notify when voting begins" onPress={() => {}} />
      <Button title="Apply Candidacy" onPress={() => {}} />
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  candidateContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },

  // 
  horizontalScroll: {
    paddingBottom: 16,
  },
  recentElectionRole: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'left',
  },
  recentElectionName: {
    fontSize: 15,
    textAlign: 'left',
  },
  recentElectionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 25,
  },
  // recentElectionTextContainer: {
  //   flex: 1,
  // },
  recentElectionAvatar: {
    marginLeft: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
  },

});

export default UpcomingElectionScreen;
   