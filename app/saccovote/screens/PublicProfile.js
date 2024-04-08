import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const avatar = require('../assets/images/profile.png');

const PublicProfileScreen = ({ navigation, route }) => {
  const [user, setUser] = useState({
    name: 'Alessandro Koome',
    role: 'sacco member',
    email: 'email@example.com',
    phone: '+254712345678',
    memberID: 'j01doe',
    age: 26,
    memberSince: '28 September 2021',
  })

  // Functions to handle button actions
  const handleApprove = () => {
    // Implement approval logic
    console.log('Candidacy approved for:', user.name);
  };

  const handleDecline = () => {
    // Implement decline logic
    console.log('Candidacy declined for:', user.name);
  };

  const handleDelete = () => {
    // Implement delete logic
    console.log('User deleted:', user.name);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <MaterialCommunityIcons name="bell-outline" size={30} color="#000" />
      </View >
      <View style = {{borderBottomWidth: 1,borderBottomColor: '#ccc', paddingBottom: 20,}}>
        <View style={{ ...styles.profileSection, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userRole}>{user.role}</Text>
          </View>
          <View>
            <Image source={avatar} style={styles.avatar} />
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.deleteButtonText}>delete user</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
     <View></View> 


      <View style = {{paddingVertical:20, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 20,}}>
      <Text style={styles.status}>Awaiting candidacy approval for the upcoming Secretary - Risk Management Committee elections</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.declineButton} onPress={handleDecline}>
            <Text style={styles.buttonText}>decline candidacy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
            <Text style={styles.buttonText}>Approve Candidacy</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{user.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Member ID</Text>
          <Text style={styles.infoValue}>{user.memberID}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Age</Text>
          <Text style={styles.infoValue}>{user.age} years</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Member Since</Text>
          <Text style={styles.infoValue}>{user.memberSince}</Text>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userRole: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 60,
    marginRight: 10,
  },
  deleteButton: {
    //TODO:
    //Check on border colours 
    //borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    marginTop: 10,

  },
  status: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  declineButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 25,
  },
  approveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 25,
  },
  deleteButtonText: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoSection: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    color: 'grey',
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
    padding: 15,
  }
});

export default PublicProfileScreen;

