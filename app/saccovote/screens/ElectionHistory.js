import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';7
import {getFormattedDateTimeFromTimeStamp} from '../utils'

const avatar = require('../assets/images/profile.png')

const ElectionHistoryScreen = ({navigation}) => {
  const electionsData = [
    { id: '1', title: 'Secretary - Risk Management Committee', candidates_count: 5, start_date: '2024-04-03T00:00:00Z', end_date: '2024-04-21T00:00:00Z' },
    { id: '2', title: 'Chairperson - Risk Management Committee', candidates_count: 5, start_date: '2024-03-29T00:00:00Z', end_date: '2024-04-17T00:00:00Z' },
    { id: '3', title: 'Credit Committee Member', candidates_count: 5, start_date: '2024-04-28T00:00:00Z', end_date: '2024-05-07T00:00:00Z' },
    { id: '4', title: 'Treasurer - Credit Management Committee', candidates_count: 5, start_date: '2024-04-28T00:00:00Z', end_date: '2024-05-07T00:00:00Z' },
    { id: '5', title: 'Secretary - Risk Management Committee', candidates_count: 5, start_date: '2024-04-28T00:00:00Z', end_date: '2024-05-07T00:00:00Z' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={{marginBottom: 20, paddingBottom: 80}}>
        <Text style={styles.title}>Elections | History</Text>
        {electionsData.map((election, index) => (
          <TouchableOpacity key={index} style={styles.recentElectionCard} onPress={() => {
            navigation.navigate("PastElectionScreen", {id: election.id})
        }}>
            <View style={styles.electionTextContainer}>
              <Text style={styles.electionTitle}>{election.title}</Text>
              {/* TODO: fetch winner name */}
              <Text style={styles.electionWinnerName}>John Doe</Text> 
              <Text style={styles.electionDates}>{getFormattedDateTimeFromTimeStamp(election.start_date)} until {getFormattedDateTimeFromTimeStamp(election.end_date)}</Text>
            </View>
            <Image source={avatar} style={styles.electionWinnerAvatar} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 60,
    textAlign: 'center',

  },
  roleContainer: {
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
  roleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
  },
  term: {
    fontSize: 14,
    color: 'grey',
  },

  // 


  horizontalScroll: {
    paddingBottom: 16,
  },
  electionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'left',
  },
  electionWinnerName: {
    fontSize: 15,
    textAlign: 'left',
  },
  recentElectionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 25,
  },
  electionTextContainer: {
    flex: 1,
    color: 'grey',
  },
  electionWinnerAvatar: {
    marginLeft: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  electionDates: {
    color: 'grey',
    fontSize: 14,
  }
  // topBar: {
  //   justifyContent: 'space-between',
  //   alignItems: 'flex-end',
  //   padding: 5,
  // },


});

export default ElectionHistoryScreen;
