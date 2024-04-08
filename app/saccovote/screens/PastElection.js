import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, } from 'react-native';
import ElectionCard from '../components/ElectionCard';
import electionService from '../services/ElectionService'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const avatar = require('../assets/images/profile.png')

const PastElectionScreen = ({ navigation, route }) => {
  // const [election, setElection] = useState({ id: '1', title: 'Secretary - Risk Management Committee', candidates_count: 5, start_date: '2024-01-03T00:00:00Z', end_date: '2024-02-07T00:00:00Z' })
  // const candidates = [
  //   { id: '1', fullname: 'Jackson Smith' },
  //   { id: '2', fullname: 'Jackson Smith' },
  //   { id: '3', fullname: 'Jackson Smith' },
  // ];
  const [election, setElection] = useState(null)
  const [selectedSaccoInfo, setSelectedSaccoInfo] = useState(null)
  const [approvedCandidates, setApprovedCandidates] = useState([])
  const [electionVotes, setElectionVotes] = useState([])

  const fetchElection = async () => {
    response = await electionService.getElection(route.params?.id)
    if (response.ok) {
      setElection(await response.json())
    } else {
    }
  }

  const fetchElectionVotes = async () => {
    response = await electionService.getElectionVotes(route.params?.id)
    if (response.ok) {
      setElectionVotes((await response.json()).results)
    } else {
    }
  }

  const fetchElectionCandidates = async () => {
    try {
      response = await electionService.getElectionCandidates(route.params?.id)
      if (response.ok) {
        const candidates = (await response.json()).results
        setApprovedCandidates(candidates.filter(c => c.is_approved).map(c => {
          // votes
          const votesCount = electionVotes.reduce((accum, vote) => {
            return vote.candidate == c.id ? accum + 1 : accum
          }, 0)
          const votesPercentage = (votesCount/electionVotes.length * 100).toFixed(2)
          // console.debug('>>>', votesCount, votesPercentage)
          // percentage
          return {...c, votesCount, votesPercentage}
        }).sort((a, b) => +b.votesCount - +a.votesCount))
      } else {
      }
    } catch { }
  }

  const fetchSelectedSaccoInfoFromAsyncStorage = async () => {
    const info = await AsyncStorage.getItem('selectedSaccoInfo')
    setSelectedSaccoInfo(info ? JSON.parse(info) : null)
  }

  const loadInfo = async () => {
    await fetchSelectedSaccoInfoFromAsyncStorage(); await fetchElection(); await fetchElectionVotes(); await fetchElectionCandidates();
  }

  useFocusEffect(React.useCallback(() => { loadInfo() }, [route.params?.id]))


  return (
<ScrollView>
  <View style={styles.container}>
    <Text style={styles.title}>Past Election</Text>
    
    {election ? (
      <ElectionCard election={{ ...election, candidates_count: approvedCandidates.length }} navigation={navigation} />
    ) : null}
    
    <Text>{approvedCandidates.length} Candidates and {electionVotes.length} votes cast</Text>
    
    <View style={styles.candidates}>
      {approvedCandidates.length > 0 ? (
        approvedCandidates.map((candidate, index) => (
          <View key={index}>
            <View key={candidate.id} style={[styles.candidateRadioCard, index == 0 ? {backgroundColor: '#34C759'} : {}]}>
              <View style={styles.candidateTextContainer}>
                <Text style={styles.candidateName}>{candidate.fullname}</Text>
                <Text>{candidate.votesCount}</Text>
                <Text>{candidate.votesPercentage}%</Text>
              </View>
              <Image source={avatar} style={styles.candidateAvatar} />
            </View>
          </View>
        ))
      ) : (
        <Text>No approved candidates</Text>
      )}
    </View>
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
