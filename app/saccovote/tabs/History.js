import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ElectionHistoryScreen from '../screens/ElectionHistory';
import PastElectionScreen from '../screens/PastElection'


const HistoryTab = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='ElectionHistoryScreen'>
      <Stack.Screen name="ElectionHistoryScreen" component={ElectionHistoryScreen} options={{headerShown:false}} />
      <Stack.Screen name="PastElectionScreen" component={PastElectionScreen} options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

export default HistoryTab;