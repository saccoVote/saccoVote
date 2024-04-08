import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const recentElections = [
  { id: '1', role: 'Chairperson', name: 'John Doe', image: require('../assets/images/profile.png') },
  { id: '2', role: 'Treasurer', name: 'Jane Doe', image: require('../assets/images/profile.png') },
  { id: '3', role: 'Treasurer', name: 'Jane Doe', image: require('../assets/images/profile.png') },
  { id: '4', role: 'Treasurer', name: 'Jane Doe', image: require('../assets/images/profile.png') },
  { id: '5', role: 'Treasurer', name: 'Jane Doe', image: require('../assets/images/profile.png') },
];

const upcomingElections = [
  { id: '3', title: 'Secretary - Risk Management Committee', candidates_count: 5, start_date: '2024-02-02T00:00:00Z', end_date: '2024-02-07T00:00:00Z' },
  { id: '4', title: 'Supervisory Committee Member', candidates_count: 5, start_date: '2024-02-02T00:00:00Z', end_date: '2024-02-07T00:00:00Z' },
  
];

const ongoingElections = [
  { id: '5', title: 'Credit Committee Internal Auditor', candidates_count: 4, start_date: '2024-02-02T00:00:00Z', end_date: '2024-02-07T00:00:00Z' },
  
];

const ElectionScreen = () => {
  const renderElectionItem = ({ item, section }) => {
    return (
      <TouchableOpacity style={styles.electionItem} onPress={() => {/* Handle press event */ }}>
        <View style={styles.electionInfo}>
          {section !== 'recent' && (
            <MaterialCommunityIcons name="vote" size={20} color="black" style={styles.voteIcon} />
          )}
          <View>
            <Text style={styles.electionTitle}>{item.title || item.role}</Text>
            {section !== 'recent' && (
              <Text style={styles.candidateText}>{item.candidates_count} candidates - {item.start_date} to {item.end_date}</Text>
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
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Recent Elections</Text>
          {/* <MaterialCommunityIcons name="account-group-outline" size={30} color="#000" /> */}
        </View>
        {/* {recentElections.map((item) => renderElectionItem({ item, section: 'recent' }))} */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {recentElections.map((election) => (
            <View key={election.id} style={styles.recentElectionCard}>
              <View style={styles.recentElectionTextContainer}>
                <Text style={styles.recentElectionRole}>{election.role}</Text>
                <Text style={styles.recentElectionName}>{election.name}</Text>
              </View>
              {/* <MaterialCommunityIcons name={election.image} size={50} color="#000" /> */}
              <Image source={election.image} style={styles.recentElectionAvatar} />
            </View>
          ))}
        </ScrollView>
        <Text style={styles.headerTitle}>Upcoming Elections (2)</Text>
        {upcomingElections.map((item) => renderElectionItem({ item, section: 'upcoming' }))}

        <Text style={styles.headerTitle}>Ongoing Elections (1)</Text>
        {ongoingElections.map((item) => renderElectionItem({ item, section: 'ongoing' }))}
      </ScrollView>

      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="format-list-bulleted" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="account-circle-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="home-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="vote" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="dots-horizontal" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  electionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#1999f9',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
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
  candidateText: {
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
    backgroundColor: '#1999f9', 
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
    padding: 5,
  },
});

export default ElectionScreen;
