import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView,} from 'react-native';
import ElectionCard from '../components/ElectionCard';


const avatar = require('../assets/images/profile.png')

const PastElectionScreen = ({navigation}) => {
  const [election, setElection] = useState({ id: '1', title: 'Secretary - Risk Management Committee', candidates_count: 5, start_date: '2024-01-03T00:00:00Z', end_date: '2024-02-07T00:00:00Z' })
  const candidates = [
    { id: '1', fullname: 'Jackson Smith' },
    { id: '2', fullname: 'Jackson Smith' },
    { id: '3', fullname: 'Jackson Smith' },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Past Election</Text>
        <ElectionCard election={election} navigation={navigation}/>
        <Text>Candidates</Text>
        <View style={styles.candidates}>
          {candidates.map((candidate, index) => (
            <View key={index}>
                <View key={candidate.id} style={styles.candidateRadioCard}>
                  <View style={styles.candidateTextContainer}>
                    <Text style={styles.candidateName}>{candidate.fullname}</Text>
                  </View>
                  <Image source={avatar} style={styles.candidateAvatar} />
                </View>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.voteButton}>
          <Text style={styles.voteButtonText}>Vote</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    paddingVertical: 80,
    gap: 20,
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
  // candidateContainer: {
  //   flexDirection: 'row',
  //   padding: 10,
  //   alignItems: 'center',
  //   borderColor: 'green',
  //   borderWidth: 2,
  //   borderRadius: 10,
  //   marginBottom: 10,
  // },
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
    textAlign: 'left',
  },
  candidateName: {
    fontSize: 15,
    textAlign: 'left',
  },
  candidateRadioCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FOFOFO',
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
  // candidateTextContainer: {
  //   flex: 1,
  // },
  candidateAvatar: {
    marginLeft: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
  },

});

export default PastElectionScreen;
