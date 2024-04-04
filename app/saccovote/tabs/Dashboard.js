import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../Dashboard/Dashboard';
import AddMemberScreen from '../screens/AddMember';
import ManageSaccoScreen from '../screens/ManageSacco';
import ViewMembersScreen from '../screens/ViewMembers';


const DashboardTab = ({ navigation }) => {

  const Stack = createNativeStackNavigator();

// TODO: if user admin render admin dashboard otherwise user dashboard
  return (
    <Stack.Navigator initialRouteName="DashboardScreen">
      <Stack.Screen name="DashboardScreen" component={Dashboard} options = {{headerShown:false}}/>
      <Stack.Screen name="AddMemberScreen" component={AddMemberScreen} options = {{headerShown:false}}/>
      <Stack.Screen name="ManageSaccoScreen" component={ManageSaccoScreen} options = {{headerShown:false}}/>
      <Stack.Screen name="ViewMembersScreen" component={ViewMembersScreen} options = {{headerShown:false}}/>
    </Stack.Navigator>

    // <View>
    //   <Text>Dashboard</Text>
    //   <TouchableOpacity onPress={handleAdminDashboardPress}>
    //     <Text style={styles.button}>AdminDashboard</Text>
    //   </TouchableOpacity>
    // </View>
  );
};


export default DashboardTab;

const styles = StyleSheet.create({
  button: {
  },
});