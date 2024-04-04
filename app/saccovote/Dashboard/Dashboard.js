import { StyleSheet, Text, View } from 'react-native'
import {useFocusEffect} from '@react-navigation/native';
import React, { useState } from 'react'
import saccoService from '../services/SaccoService'
import AdminDashboard from './AdminDashboard'
import MemberDashboard from './MemberDashboard'


const Dashboard = ({navigation}) => {
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

    useFocusEffect(React.useCallback(() => {
        fetchSelectedSacco()
    }, []))

    //TODO: later handle staff role
    return selectedSacco && selectedSacco.role == 'admin'
        ? <AdminDashboard/>
            : selectedSacco && selectedSacco.role == 'member' 
                ? <MemberDashboard/>
                : null
}



const styles = StyleSheet.create({})

export default Dashboard
