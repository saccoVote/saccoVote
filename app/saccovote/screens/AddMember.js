import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddorEditMember from '../components/AddorEditMember'


const AddMemberScreen = () => {

  const handleAddSaccoUser = async (payload, setSubmitting) => {
    setSubmitting(true)
    const response = await SaccoUserService.addUser(payload)
    if (!response.ok) {
      Alert.alert('An error occured while adding')
    }
    else {
      setSubmitting(false)
      Alert.alert('Successfully added')
    }
  }

  return (
    <AddorEditMember handleSubmitMember={handleAddSaccoUser}/>
  )
}

export default AddMemberScreen

const styles = StyleSheet.create({})