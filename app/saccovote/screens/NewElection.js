import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import AddorEditElection from '../components/AddorEditElection'
import electionService from '../services/ElectionService'


const NewElectionScreen = ({navigation}) => {
  const handleUpdateElection = async (payload, setSubmitting) => {
    setSubmitting(true)
    try {
      const response = await electionService.addElection(payload)
      if (!response.ok) {
        setSubmitting(false)
        Alert.alert('An error occured while adding election')
      }
      else {
        setSubmitting(false)
        Alert.alert('Successfully added', null, [{text: 'OK', onPress: () => navigation.goBack()}])
      }
    } catch {
      setSubmitting(false)
      Alert.alert('A network error occured')
    }
  }

  return (
    <AddorEditElection handleSubmitElection={handleUpdateElection}/>
  )
}


const styles = StyleSheet.create({})

export default NewElectionScreen