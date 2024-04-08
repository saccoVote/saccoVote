import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { getFormattedDateTimeFromTimeStamp } from '../utils'


const ElectionCard = ({ election, navigation }) => {
    const getElectionStatus = () => {
        // past
        if (new Date(election.end_date) < new Date()) {
            return 'past'
        }
        // ongoing
        else if (new Date(election.start_date) < new Date()) {
            return 'ongoing'
        } else {
            // upcoming
            return 'upcoming'
        }
    }

    return (
        <TouchableOpacity style={styles.electionCard} onPress={() => {
            if (getElectionStatus() == 'past') {
                navigation.navigate("HistoryTab", { screen: "PastElectionScreen", params: { id: election.id } })
            } else {
                navigation.navigate("ElectionCurrentAndUpcomingTab", { screen: "OngoingElectionScreen", params: { id: election.id } })
            }
        }}>
            <ImageBackground
                source={require('../assets/images/vote-background-image.jpg')}
                style={{
                    height: '100%',
                    width: '100%',
                    opacity: 0.3,
                    position: 'absolute',
                }}
            />
            <View style={styles.electionItem}>
                <Text style={styles.candidatesCount}>{election.candidates_count} candidates</Text>
                <Text style={styles.electionTitle}>{election.title}</Text>
                <Text style={styles.status(getElectionStatus())}>{getElectionStatus()}</Text>
                <Text style={styles.dates}>Starts on {getFormattedDateTimeFromTimeStamp(election.start_date)} until {getFormattedDateTimeFromTimeStamp(election.end_date)}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create(
    {
        electionCard: {
            borderRadius: 5,
            marginBottom: 15,
        },
        electionItem: {
            padding: 5,
            justifyContent: 'space-between',
            gap: 3,
            paddingHorizontal: 10,
            paddingVertical: 5,
        },
        electionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        candidatesCount: {
            fontSize: 16,
            textAlign: 'right',
            color: 'grey',
        },
        status: (status) => ({
            fontSize: 16,
            color: status === 'ongoing' ? 'green' :
                status === 'completed' ? 'blue' :
                    status === 'pending' ? 'orange' : 'grey',
            fontWeight: 'bold',
            textAlign: 'right',
        }),
        dates: {
            fontSize: 14,
            color: 'grey',
        },
    }
)

export default ElectionCard