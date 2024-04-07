import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddorEditElection from '../components/AddorEditElection'
import electionService from '../services/ElectionService'


const EditElectionScreen = ({route}) => {
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
        Alert.alert('Successfully added')
      }
    } catch {
      setSubmitting(false)
      Alert.alert('A network error occured')
    }
  }

  return (
    <AddorEditElection handleSubmitElection={handleUpdateElection} electionId={route.params?.id}/>
  )
}


const styles = StyleSheet.create({})

export default EditElectionScreen