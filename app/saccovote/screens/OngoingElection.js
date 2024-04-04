import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const OngoingElectionScreen = () => {
  const candidates = [
    { id: '1', name: 'Jackson Smith', details: 'Lorem ipsum', image: require('../assets/images/profile.png') },
    { id: '2', name: 'Jackson Smith', details: 'Lorem ipsum', image: require('../assets/images/profile.png') },
    { id: '3', name: 'Jackson Smith', details: 'Lorem ipsum', image: require('../assets/images/profile.png') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ongoing Election</Text>
      <Text style={styles.subtitle}>Secretary - Risk Management Committee</Text>
      <Text style={styles.date}>Started on 27th Dec, 2023 until 21st Jan, 2024</Text>
      {candidates.map((candidate, index) => (
        <View key={index} style={styles.candidateContainer}>
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
          <View style={styles.avatarContainer} />
          <View style={styles.textContainer}>
            <Text style={styles.candidateName}>{candidate.name}</Text>
            <Text style={styles.candidateDetails}>{candidate.details}</Text>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.voteButton}>
        <Text style={styles.voteButtonText}>Vote</Text>
      </TouchableOpacity>
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
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  candidateContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  candidateName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  candidateDetails: {
    fontSize: 14,
  },
  voteButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  voteButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // 
  horizontalScroll: {
    paddingBottom: 16,
  },
  recentElectionRole: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'end',
  },
  recentElectionName: {
    fontSize: 15,
    textAlign: 'end',
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

export default OngoingElectionScreen;
