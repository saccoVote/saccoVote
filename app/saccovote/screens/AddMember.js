import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddorEditMember from '../components/AddorEditMember'
import saccoUserService from '../services/SaccoUserService';
import { Alert } from 'react-native';


const AddMemberScreen = () => {

  const handleAddSaccoUser = async (payload, setSubmitting) => {
    setSubmitting(true)
    try {
      const response = await saccoUserService.addUser(payload)
      if (!response.ok) {
        setSubmitting(false)
        Alert.alert('An error occured while adding')
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
    <AddorEditMember handleSubmitMember={handleAddSaccoUser}/>
  )
}

export default AddMemberScreen

const styles = StyleSheet.create({})