import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import electionService from "../services/ElectionService";
import {getFormattedDateTimeFromTimeStamp} from '../utils'


const ManageElectionsScreen = ({ navigation }) => {
    const [elections, setElections] = useState([])

    const handleDeleteElectionPress = () => {

    }

    const fetchElections = async () => {
        response = await electionService.getElections()
        if (response.ok) {
            const data = await response.json()
            setElections(data.results.filter(e => new Date(e.start_date) > new Date()))
        } else {
        }
    }

    useFocusEffect(React.useCallback(() => {fetchElections()}, []))

    return (
        <ScrollView>
            <View style={{paddingVertical: 80, paddingHorizontal: 10,}}>
                <Text style={styles.heading}>Manage your upcoming elections</Text>
                {elections.length ?
                    <View style={styles.electionsContainer}>
                        {elections.map((election) => (
                            <View key={election.id} style={styles.electionItem}>
                                <View style={styles.electionItemInfo}>
                                    <Text style={styles.electionTitle}>{election.title}</Text>
                                    <Text style={styles.electionDates}>Starts on {getFormattedDateTimeFromTimeStamp(election.start_date)} until {getFormattedDateTimeFromTimeStamp(election.end_date)}</Text>
                                </View>
                                <View style={styles.actionsContainer}>
                                    <TouchableOpacity onPress={() => handleDeleteElectionPress(election.id, election.fullname)} style={styles.deleteButton}>
                                        <Text style={styles.deleteButtonText}>Delete</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('EditElectionScreen', {id: election.id})} style={styles.editButton}>
                                        <Text style={styles.editButtonText}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                    :
                    <Text style={{textAlign: 'center'}}>No upcoming elections to manage</Text>
                }
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 80,
      },
    electionsContainer: {
        marginHorizontal: 20,
        alignItems: 'center',
      },
    electionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        gap: 3,
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
      electionItemInfo: {
        flex: 1,
      },
      deleteButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10, // Adjusted for spacing
      },
      deleteButtonText: {
        color: 'red',
        fontWeight: 'bold',
      },
      editButton: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
      },
      editButtonText: {
        color: 'blue',
        fontWeight: 'bold',
      },
      heading:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        margin: 10,
      },
      actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Ensures buttons are aligned properly
        // Removed the gap property, adjusted spacing with marginRight in deleteButton
      }
})
export default ManageElectionsScreen