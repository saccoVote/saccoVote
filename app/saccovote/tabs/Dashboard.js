import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import AdminDashboard from '../Dashboard/AdminDashboard';


const DashboardTab = ({ navigation }) => {

// TODO: if user admin render admin dashboard otherwise user dashboard
  return (
    <AdminDashboard/>
  );
};



export default DashboardTab;

const styles = StyleSheet.create({
  button: {
  },
});