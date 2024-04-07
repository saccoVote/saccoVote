import { View, Text } from 'react-native'
import React from 'react'
import ElectionCurrentAndUpcomingScreen from '../screens/ElectionCurrentAndUpcoming';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpcomingElectionScreen from '../screens/UpcomingElection';
import OngoingElectionScreen from '../screens/OngoingElection';


const ElectionCurrentAndUpcomingTab = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='ElectionCurrentAndUpcomingScreen'>
      <Stack.Screen name="ElectionCurrentAndUpcomingScreen" component={ElectionCurrentAndUpcomingScreen} options={{headerShown:false}} />
      <Stack.Screen name="UpcomingElectionScreen" component={UpcomingElectionScreen} options={{headerShown:false}} />
      <Stack.Screen name="OngoingElectionScreen" component={OngoingElectionScreen} options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

export default ElectionCurrentAndUpcomingTab;