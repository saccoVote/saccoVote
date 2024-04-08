import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../Dashboard/Dashboard';
import AddMemberScreen from '../screens/AddMember';
import EditMemberScreen from '../screens/EditMember';
import ManageSaccoScreen from '../screens/ManageSacco';
import ViewMembersScreen from '../screens/ViewMembers';
import NewElectionScreen from '../screens/NewElection';
import PublicProfileScreen from '../screens/PublicProfile';
import ManageElectionsScreen from '../screens/ManageElections';
import EditElectionScreen from '../screens/EditElection';


const DashboardTab = ({ navigation }) => {

  const Stack = createNativeStackNavigator();

// TODO: if user admin render admin dashboard otherwise user dashboard
  return (
    <Stack.Navigator initialRouteName="DashboardScreen">
      <Stack.Screen name="DashboardScreen" component={Dashboard} options = {{headerShown:false}}/>
      <Stack.Screen name="AddMemberScreen" component={AddMemberScreen} options = {{headerShown:false}}/>
      <Stack.Screen name="EditMemberScreen" component={EditMemberScreen} options = {{headerShown:false}}/>
      <Stack.Screen name="ManageSaccoScreen" component={ManageSaccoScreen} options = {{headerShown:false}}/>
      <Stack.Screen name="ViewMembersScreen" component={ViewMembersScreen} options = {{headerShown:false}}/>
      <Stack.Screen name="NewElectionScreen" component={NewElectionScreen} options = {{headerShown:false}}/>
      <Stack.Screen name="EditElectionScreen" component={EditElectionScreen} options = {{headerShown:false}}/>
      <Stack.Screen name="PublicProfileScreen" component={PublicProfileScreen}/>
      <Stack.Screen name="ManageElectionsScreen" component={ManageElectionsScreen} options = {{headerShown:false}}/>
     </Stack.Navigator>
  );
};


export default DashboardTab;

const styles = StyleSheet.create({
  button: {
  },
});