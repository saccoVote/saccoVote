import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import ElectionCard from '../components/ElectionCard';
import { useFocusEffect } from '@react-navigation/native';
import electionService from "../services/ElectionService";
import CustomRadioButtonGroup from '../components/CustomRadioButtonGroup';
import AsyncStorage from '@react-native-async-storage/async-storage';


const avatar = require('../assets/images/profile.png')

const UpcomingElectionScreen = ({ navigation, route }) => {
  const [election, setElection] = useState(null)
  const [chosenCandidate, setChosenCandidate] = useState(null)
  const [selectedSaccoInfo, setSelectedSaccoInfo] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [approvedCandidates, setApprovedCandidates] = useState([])
  const [unapprovedCandidates, setUnapprovedCandidates] = useState([])
  const [userCandidacyStatus, setUserCandidacyStatus] = useState('') // applied, approved, notApplied

  const fetchElection = async () => {
    response = await electionService.getElection(route.params?.id)
    if (response.ok) {
      setElection(await response.json())
    } else {
    }
  }

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
            setUserCandidacyStatus('approved')
          } else {
            unapproved.push(candidate)
            setUserCandidacyStatus('applied')
          }
        })
        setApprovedCandidates([...approved])
        setUnapprovedCandidates([...unapproved])
        if (!candidates.find(c => c.sacco_user_id == selectedSaccoInfo.id)) setUserCandidacyStatus('notApplied')
      } else {
      }
    } catch { }
  }

  const fetchSelectedSaccoInfoFromAsyncStorage = async () => {
    const info = await AsyncStorage.getItem('selectedSaccoInfo')
    setSelectedSaccoInfo(info ? JSON.parse(info) : null)
  }

  const handleSelectCandidate = (value) => setChosenCandidate(value);
  const handleApplyCandidacyPress = async () => {
    try {
      setSubmitting(true)
      const response = await electionService.applyCandidacy(route.params?.id)
      setSubmitting(false)
      if (response.ok) {
        fetchElectionCandidates()
        Alert.alert('Candidacy application successful')
      } else {
        Alert.alert('Failed to apply candidacy')
      }
    } catch {
      setSubmitting(false)
      Alert.alert('An error occured')
    }
  }

  const handleVet = async (candidateId, payload) => {
    await electionService.vetCandidate(route.params?.id, candidateId, payload)
    fetchElectionCandidates()
  }

  const loadInfo = async () => {
    await fetchSelectedSaccoInfoFromAsyncStorage(); fetchElection(); fetchElectionCandidates()
  }

  useFocusEffect(React.useCallback(() => { loadInfo() }, [route.params?.id]))


  return (
    <ScrollView>
      {election ?
        <View style={styles.container}>
          <Text style={styles.title}>Upcoming Election</Text>
          <ElectionCard election={election} navigation={navigation} />
          <Text style={{ fontWeight: 'bold', fontSize: 16, }}>Candidates</Text>

          {approvedCandidates.length ?
            <View>
              {approvedCandidates.map(c => (
                <View key={c.id} style={styles.candidateRadioCard}>
                  <View style={styles.candidateTextContainer}>
                    <Text style={styles.candidateName}>{c.fullname}</Text>
                  </View>
                  <Image source={avatar} style={styles.candidateAvatar} />
                </View>
              ))}
            </View>
            : <Text style={{ textAlign: 'center' }}>This election has no approved candidates yet.</Text>
          }

          {(selectedSaccoInfo && selectedSaccoInfo.is_vetter) && <Text style={{fontWeight: 'bold', fontSize: 16,}}>Candidates Being Vetted</Text>}
          {(selectedSaccoInfo && selectedSaccoInfo.is_vetter) &&
            unapprovedCandidates.map(candidate =>
              // here
              <View key={candidate.id} style={styles.candidateItem}>
                <View style={styles.candidateItemInfo}>
                  {/* TODO:
                Add more data on handlecandidateProfilePress...... */}

                  <TouchableOpacity
                    onPress={() => navigation.navigate('PublicProfileScreen', { id: candidate.sacco_user_id })}
                    style={{ flexDirection: 'row', alignItems: 'center' }} // Add your additional in-line styles here
                  >
                    <Image source={avatar} style={styles.avatar} />
                    <Text style={styles.candidateName}>{candidate.fullname}</Text>
                  </TouchableOpacity>

                </View>
                {candidate.vetting_status_by_authenticated_user != null ?
                  <Text style={{color: 'orange', fontWeight: 'bold'}}>{candidate.vetting_status_by_authenticated_user ? 'Approved' : 'Declined'} By You</Text>
                  :
                  <View style={styles.actionsContainer2}>
                    <TouchableOpacity onPress={() => {
                      Alert.alert(
                        'Decline Candidate?',
                        'If you approve, the candidate will be available to be picked in this election once 51% of all vetters have aproved. This action cannot be undone.',
                        [
                          { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                          { text: 'Decline Candidacy', onPress: () => handleVet(candidate.id, {approved: false}) },
                        ]
                      )
                    }} style={styles.declineButton}>
                      <Text style={styles.declineButtonText}>decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      Alert.alert(
                        'Approve Candidate?',
                        'If you approve, the candidate will be available to be picked in this election once 51% of all vetters have aproved. This action cannot be undone.',
                        [
                          { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                          { text: 'Approve Candidacy', onPress: () => handleVet(candidate.id, { approved: true }) },
                        ]
                      )
                    }} style={styles.approveButton}>
                      <Text style={styles.approveButtonText}>Approve</Text>
                    </TouchableOpacity>
                  </View>
                }
              </View>
            )
          }

          {/* ongoing */}
          {(new Date(election.start_date) < new Date() && new Date(election.end_date) > new Date()) &&
            (() => {
              if (selectedSaccoInfo && selectedSaccoInfo.is_vetter) {
                return <Text style={{ textAlign: 'center' }}>Vetters can not vote</Text>;
              } else {
                return (
                  <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.voteButton}>
                      <Text style={styles.voteButtonText}>Vote</Text>
                    </TouchableOpacity>
                  </View>
                );
              }
            })()
          }


          {/* upcoming */}
          {(new Date(election.start_date) > new Date()) &&
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.notifyButton}>
                <Text style={styles.notifyButtonText}>Notify when voting begins</Text>
              </TouchableOpacity>

              {selectedSaccoInfo && selectedSaccoInfo.is_vetter ? (
                <Text style={{ textAlign: 'center' }}>Vetters can not apply for candidacy</Text>
              ) : (
                userCandidacyStatus == 'notApplied' ?
                  <TouchableOpacity style={styles.applyCandidacyButton} onPress={handleApplyCandidacyPress} disabled={submitting}>
                    <Text style={styles.applyCandidacyButtonText}>Apply Candidacy</Text>
                  </TouchableOpacity>
                  : userCandidacyStatus == 'applied' ?
                    <Text>Awaiting candidacy approval</Text>
                    : <></>
              )}
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
  // candidateTextContainer: {
  //   flex: 1,
  // },
  candidateAvatar: {
    marginLeft: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
  },



  candidateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  candidateItemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  candidateName: {
    fontSize: 16,
  },
  declineButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10, // Adjusted for spacing
  },
  declineButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  approveButton: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  approveButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  actionsContainer2: {
    flexDirection: 'row',
    alignItems: 'center', // Ensures buttons are aligned properly
    // Removed the gap property, adjusted spacing with marginRight in deleteButton
  }
});

export default UpcomingElectionScreen;
