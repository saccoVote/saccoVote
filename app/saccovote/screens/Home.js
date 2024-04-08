// the main screen after sign in
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import electionService from "../services/ElectionService";
import { getFormattedDateTimeFromTimeStamp } from '../utils'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import saccoService from '../services/SaccoService'


const saccoLogo = require('../assets/images/logo2.png')

const recentElections = [
  { id: '1', role: 'Chairperson', name: 'John Doe', image: require('../assets/images/profile.png') },
  { id: '2', role: 'Treasurer', name: 'Jane Doe', image: require('../assets/images/profile.png') },
  { id: '3', role: 'Treasurer', name: 'Jane Doe', image: require('../assets/images/profile.png') },
  { id: '4', role: 'Treasurer', name: 'Jane Doe', image: require('../assets/images/profile.png') },
  { id: '5', role: 'Treasurer', name: 'Jane Doe', image: require('../assets/images/profile.png') },
];

// const upcomingElections = [
//   { id: '3', title: 'Secretary - Risk Management Committee', candidates_count: 5, start_date: '2024-02-02T00:00:00Z', end_date: '2024-02-07T00:00:00Z' },
//   { id: '4', title: 'Supervisory Committee Member', candidates_count: 5, start_date: '2024-02-02T00:00:00Z', end_date: '2024-02-07T00:00:00Z' },

// ];

// const ongoingElections = [
//   { id: '5', title: 'Credit Committee Internal Auditor', candidates_count: 4, start_date: '2024-02-02T00:00:00Z', end_date: '2024-02-07T00:00:00Z' },
// ];

const HomeScreen = ({navigation}) => {
  const [selectedSacco, setSelectedSacco] = useState(null)
  const fetchSelectedSacco = async () => {
    response = await saccoService.getSelectedSacco()
    if (response.ok) {
      setSelectedSacco(await response.json())
    } else {
      // TODO: Either no sacco selected, it has been deleted, or network issues
      // Handle however you wish. e.g. show dialog to reload or go to sacco switcher
    }
  }

  const [ongoingElections, setOngoingElections] = useState([])
  const [upcomingElections, setUpcomingElections] = useState([])
  const [pastElections, setPastElections] = useState([])

  const fetchElections = async () => {
    response = await electionService.getElections()
    if (response.ok) {
      const data = await response.json()
      setPastElections(data.results.filter(e => new Date(e.end_date) < new Date()))
      setOngoingElections(data.results.filter(e => new Date(e.start_date) < new Date() && new Date(e.end_date) > new Date()))
      setUpcomingElections(data.results.filter(e => new Date(e.start_date) > new Date()))
    } else {
    }
  }

  useFocusEffect(React.useCallback(() => { fetchSelectedSacco(); fetchElections() }, []))


  const renderElectionItem = ({ item, section, navigation }) => {
    return (
      <TouchableOpacity key={item.id} style={styles.electionItem} onPress={() => {
        navigation.navigate("ElectionCurrentAndUpcomingTab", { screen: new Date(item.start_date) < new Date ? "OngoingElectionScreen" : 'UpcomingElectionScreen', params: {id: item.id} })
      }}>
        <View style={styles.electionInfo}>
          {section !== 'recent' && (
            <MaterialCommunityIcons name="vote" size={20} color="black" style={styles.voteIcon} />
          )}
          <View>
            <Text style={styles.electionTitle}>{item.title || item.role} - <Text style={{ color: 'grey', fontSize: 14 }}>{item.candidates_count} candidates</Text></Text>
            {section !== 'recent' && (
              <Text style={styles.electionDateText}>{getFormattedDateTimeFromTimeStamp(item.start_date)} to {getFormattedDateTimeFromTimeStamp(item.end_date)}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.notificationIcon} onPress={() => {/* Handle notification press */ }}>
            <MaterialCommunityIcons name="bell-outline" size={30} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.saccoContainer}>
          <Image
            source={selectedSacco && selectedSacco.sacco_logo ? { uri: selectedSacco.sacco_logo } : saccoLogo}
            style={styles.saccoLogo} resizeMode='contain' />
          <Text style={styles.saccoText}>{selectedSacco?.sacco_name}</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Recent Elections</Text>
          {/* Additional components */}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {recentElections.map((election) => (
            <View key={election.id} style={styles.recentElectionCard}>
              <View style={styles.recentElectionTextContainer}>
                <Text style={styles.recentElectionRole}>{election.role}</Text>
                <Text style={styles.recentElectionName}>{election.name}</Text>
              </View>
              <Image source={election.image} style={styles.recentElectionAvatar} />
            </View>
          ))}
        </ScrollView>

        <View style={styles.electionsGroup}>
          <Text style={styles.headerTitle}>Ongoing Elections <Text style={{ color: 'grey', fontSize: 14 }}>showing {ongoingElections.length > 2 ? 2 : ongoingElections.length} of {ongoingElections.length}</Text></Text>
          <View style={styles.electionsContainer}>
            {ongoingElections.slice(0, 2).map((item) => renderElectionItem({ item, section: 'ongoing', navigation }))}
          </View>
        </View>

        <View style={styles.electionsGroup}>
          <Text style={styles.headerTitle}>Upcoming Elections <Text style={{ color: 'grey', fontSize: 14 }}>showing {upcomingElections.length > 2 ? 2 : upcomingElections.length} of {upcomingElections.length}</Text></Text>
          <View style={styles.electionsContainer}>
            {upcomingElections.slice(0, 2).map((item) => renderElectionItem({ item, section: 'upcoming', navigation }))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 10,
    paddingBottom: 80,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  electionsGroup: {
    paddingVertical: 10,
    gap: 5
  },
  electionsContainer: {
    gap: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 8,
  },
  electionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    //backgroundColor: '#1999f9',
    borderRadius: 5,
  },
  electionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteIcon: {
    marginRight: 10,
  },
  electionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  electionDateText: {
    fontSize: 14,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalScroll: {
    paddingBottom: 16,
  },
  recentElectionRole: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  recentElectionName: {
    fontSize: 12,
    textAlign: 'center',
  },
  recentElectionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //TODO:to change the background color
    backgroundColor: '#34C759',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  recentElectionTextContainer: {
    flex: 1,
  },
  recentElectionAvatar: {
    marginLeft: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  topBar: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 10,
  },
  saccoContainer: {
    alignItems: 'center',
    margin: 40,
    flex: 1,
  },
  saccoLogo: {
    flex: 1,
    width: 200,
    height: 100,
  },
  saccoText: {
    fontWeight: 'bold',
    fontSize: 24
  }
})


export default HomeScreen;
