import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import ElectionCard from '../components/ElectionCard';
import { useFocusEffect } from '@react-navigation/native';
import electionService from "../services/ElectionService";
import CustomRadioButtonGroup from '../components/CustomRadioButtonGroup';
import AsyncStorage from '@react-native-async-storage/async-storage';


const avatar = require('../assets/images/profile.png')

const OngoingElectionScreen = ({ navigation, route }) => {
  const [election, setElection] = useState(null)
  const [chosenCandidate, setChosenCandidate] = useState(null)
  const [selectedSaccoInfo, setSelectedSaccoInfo] = useState(null)
  const [approvedCandidates, setApprovedCandidates] = useState([])
  const [unapprovedCandidates, setUnapprovedCandidates] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const fetchElection = async () => {
    response = await electionService.getElection(route.params?.id)
    if (response.ok) {
      setElection(await response.json())
    } else {
    }
  }

  const handleSelectCandidate = (value) => setChosenCandidate(value);

  const fetchElectionCandidates = async () => {
    try {
      response = await electionService.getElectionCandidates(route.params?.id)
      if (response.ok) {
        const candidates = (await response.json()).results
        const approved = []
        const unapproved = []
        candidates.forEach(candidate => {
          if (candidate.is_approved) {
            approved.push(candidate)
          } else {
            unapproved.push(candidate)
          }
        })
        setApprovedCandidates([...approved])
        setUnapprovedCandidates([...unapproved])
      } else {
      }
    } catch { }
  }

  const handleVote = async () => {
    try {
      setSubmitting(true)
      const response = await electionService.vote(route.params?.id, chosenCandidate)
      if(response.ok) {
        setSubmitting(false)
        fetchElectionCandidates()
        Alert.alert('Vote casted')
      } else {
        setSubmitting(false)
        Alert.alert('Unable to vote')
      }
    } catch {
      setSubmitting(false)
      Alert.alert('An error occured')
    }
  }

  const fetchSelectedSaccoInfoFromAsyncStorage = async () => {
    const info = await AsyncStorage.getItem('selectedSaccoInfo')
    setSelectedSaccoInfo(info ? JSON.parse(info) : null)
  }

  const loadInfo = async () => {
    await fetchSelectedSaccoInfoFromAsyncStorage(); fetchElection(); fetchElectionCandidates()
  }

  useFocusEffect(React.useCallback(() => { loadInfo() }, [route.params?.id]))


  return (
    <ScrollView>
      {election ?
        <View style={styles.container}>
          <Text style={styles.title}>Ongoing Election</Text>
          <ElectionCard election={election} navigation={navigation} />
          <Text style = {{fontWeight: 'bold', fontSize: 16,}}>Candidates <Text style={{color: 'grey'}}>select candidate to vote</Text></Text>
          
          <CustomRadioButtonGroup options={approvedCandidates.map(c => {
            return {
              ...c, value: c.id, label:
                <TouchableOpacity onPress={() => handleSelectCandidate(c.id)} style={[styles.candidateRadioCard, styles.selectedCandidate(c.id, chosenCandidate)]}>
                  <View style={styles.candidateTextContainer}>
                    <Text style={styles.candidateName}>{c.fullname}</Text>
                  </View>
                  <Image source={avatar} style={styles.candidateAvatar} />
                </TouchableOpacity>
            }
          })} selectedValue={chosenCandidate} onSelect={handleSelectCandidate} />

          {/* ongoing */}
          {(new Date(election.start_date) < new Date() && new Date(election.end_date) > new Date()) &&
            (() => {
              if (selectedSaccoInfo && selectedSaccoInfo.is_vetter) {
                return <Text style={{ textAlign: 'center' }}>Vetters can not vote</Text>;
              } else if(election.authenticated_user_has_voted) {
                return (<Text>You have cast your vote. Results will be available automatically once the election has ended.</Text>);
              } else {
                return (
                  <View style={styles.actionsContainer}>
                  <TouchableOpacity style={[styles.voteButton, (!chosenCandidate || submitting) && {backgroundColor: 'grey'} ]} onPress={handleVote} disabled={!chosenCandidate || submitting}>
                    <Text style={styles.voteButtonText}>Vote</Text>
                  </TouchableOpacity>
                </View>
                )
              }
            })()
          }

          {/* upcoming */}
          {(new Date(election.start_date) > new Date()) &&
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.notifyButton}>
                <Text style={styles.notifyButtonText}>Notify when voting begins</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyCandidacyButton}>
                <Text style={styles.applyCandidacyButtonText}>Apply Candidacy</Text>
              </TouchableOpacity>
            </View>
          }
          {/* past */}
        </View>
        :
        <Text>No election was found with id {route.params?.id} for this sacco</Text>
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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
    // backgroundColor: '#ddd',
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
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    flex: 1,
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

  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  notifyButton: {
    borderColor: 'grey',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1
  },
  notifyButtonText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 14,
  },
  applyCandidacyButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1
  },
  applyCandidacyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  candidateName: {
    fontSize: 15,
    textAlign: 'left',
  },
  candidateRadioCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 8,
    elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    marginBottom: 25,
  },
  selectedCandidate: (candidateId, selectedId) => ({
    borderColor: candidateId == selectedId ? '#34C759' : '#F0F0F0',
    borderWidth: candidateId == selectedId ? 5 : 0,
  }),
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

export default OngoingElectionScreen;
