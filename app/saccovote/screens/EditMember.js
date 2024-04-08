import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddorEditMember from '../components/AddorEditMember'
import { Alert } from 'react-native';
import saccoUserService from '../services/SaccoUserService';


const EditMemberScreen = ({route, navigation}) => {

  const handleEditSaccoUser = async (payload, setSubmitting) => {
    setSubmitting(true)
    try {
      const response = await saccoUserService.editUser(route.params?.id, payload)
      if (!response.ok) {
        setSubmitting(false)
        Alert.alert('An error occured while updating')
      }
      else {
        setSubmitting(false)
        Alert.alert('Successfully updated', null, [{text: 'OK', onPress: () => navigation.goBack()}])
      }
    } catch (error) {
      setSubmitting(false)
      Alert.alert('An error occured')
    }
  }

  return (
    <AddorEditMember userId={route.params?.id} handleSubmitMember={handleEditSaccoUser}/>
  )
}

export default EditMemberScreen

const styles = StyleSheet.create({})
