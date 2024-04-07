// the main screen after sign in
import authService from '../services/AuthService';
import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';
import saccoService from '../services/SaccoService'


const saccoLogo = require('../assets/images/logo2.png')

const recentElections = [
    { id: '1', role: 'Chairperson', name: 'John Doe', image: require('../assets/images/profile.png') },
    { id: '2', role: 'Treasurer', name: 'Jane Doe', image: require('../assets/images/profile.png') },
    { id: '3', role: 'Treasurer', name: 'Jane Doe', image: require('../assets/images/profile.png') },
    { id: '4', role: 'Treasurer', name: 'Jane Doe', image: require('../assets/images/profile.png') },
    { id: '5', role: 'Treasurer', name: 'Jane Doe', image: require('../assets/images/profile.png') },
  ];
  
  const upcomingElections = [
    { id: '3', title: 'Secretary - Risk Management Committee', candidates: 5, startDate: '2nd Feb, 2024', endDate: '7th Feb, 2024' },
    { id: '4', title: 'Supervisory Committee Member', candidates: 5, startDate: '2nd Feb, 2024', endDate: '7th Feb, 2024' },
    
  ];
  
  const ongoingElections = [
    { id: '5', title: 'Credit Committee Internal Auditor', candidates: 4, startDate: '2nd Feb, 2024', endDate: '7th Feb, 2024' },
    

  ];
const HomeScreen = () => {
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
    // TODO: implement the actual home from figma. also make the bottom navigation as a component that will be reused across screens.


    /* const [authUser, setAuthUser] = useState({})
    const fetchAuthenticatedUser = async () => {
        const response = await authService.getAuthenticatedUser()
        if (response.ok) {
            setAuthUser(await response.json())
        }
    }

    useEffect(() => {
        fetchAuthenticatedUser()
    }, [])

    


    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>HomeScreen</Text>
            {authUser.email && 
                <View>
                    <Text>Welcome, {authUser.email}</Text> 
                    <Text>User Saccos</Text>
                    <Text>Sacco: {authUser['user_saccos'][0]['sacco_name']}</Text>
                    <Text>Your role in this Sacco: {authUser['user_saccos'][0].role}</Text>
                </View>
            }
        </View>

    ); */

    useFocusEffect(React.useCallback(() => {
      fetchSelectedSacco()
    }, []))
  

    const renderElectionItem = ({ item, section }) => {
        return (
          <TouchableOpacity key={item.id} style={styles.electionItem} onPress={() => {/* Handle press event */ }}>
            <View style={styles.electionInfo}>
              {section !== 'recent' && (
                <MaterialCommunityIcons name="vote" size={20} color="black" style={styles.voteIcon} />
              )}
              <View>
                <Text style={styles.electionTitle}>{item.title || item.role}</Text>
                {section !== 'recent' && (
                  <Text style={styles.candidateText}>{item.candidates} candidates - {item.startDate} to {item.endDate}</Text>
                )}
              </View>
            </View>
            {/* {section === 'recent' && (
              <MaterialCommunityIcons name={item.image} size={40} color="#FFC0CB" style={styles.profileIcon} />
            )} */}
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
                source={selectedSacco && selectedSacco.sacco_logo ? {uri: selectedSacco.sacco_logo} : saccoLogo} 
                style={styles.saccoLogo} resizeMode='contain'/>
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
            <Text style={styles.headerTitle}>Ongoing Elections (1)</Text>
            {ongoingElections.map((item) => renderElectionItem({ item, section: 'ongoing' }))}
           
            <Text style={styles.headerTitle}>Upcoming Elections (2)</Text>
            {upcomingElections.map((item) => renderElectionItem({ item, section: 'upcoming' }))}
    
            
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
        //backgroundColor: '#1999f9',
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
