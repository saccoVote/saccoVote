import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const HistoryScreen = () => {
  const roles = [
    { title: 'Chairperson', name: 'John Doe', term: '18th Sep, 2023 - 25 Oct, 2023', image: require('../assets/images/profile.png') },
    { title: 'Secretary', name: 'John Doe', term: '18th Sep, 2023 - 25 Oct, 2023', image: require('../assets/images/profile.png') },
    { title: 'Credit committee member', name: 'John Doe', term: '18th Sep, 2023 - 25 Oct, 2023', image: require('../assets/images/profile.png') },
    { title: 'Risk management committee member', name: 'John Doe', term: '18th Sep, 2023 - 25 Oct, 2023', image: require('../assets/images/profile.png') },
    { title: 'Chairperson', name: 'John Doe', term: '18th Sep, 2023 - 25 Oct, 2023', image: require('../assets/images/profile.png') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elections | History</Text>
      {roles.map((election, index) => (
        <View key={index} style={styles.recentElectionCard}>
          <View style={styles.recentElectionTextContainer}>
            <Text style={styles.recentElectionRole}>{election.title}</Text>
            <Text style={styles.recentElectionName}>{election.name}</Text>
            <Text style={styles.recentElectionName}>{election.term}</Text>
          </View>
          <Image source={election.image} style={styles.recentElectionAvatar} />
        </View>
      ))}
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
  // topBar: {
  //   justifyContent: 'space-between',
  //   alignItems: 'flex-end',
  //   padding: 5,
  // },


});

export default HistoryScreen;
