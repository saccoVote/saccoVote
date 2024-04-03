import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const DashboardTab = ({ navigation }) => {
  const handleAdminDashboardPress = () => {
    navigation.navigate('AdminDashboard');
  };

  return (
    <View>
      <Text>Dashboard</Text>
      <TouchableOpacity onPress={handleAdminDashboardPress}>
        <Text style={styles.button}>AdminDashboard</Text>
      </TouchableOpacity>
    </View>
  );
};



export default DashboardTab;

const styles = StyleSheet.create({
  button: {
  },
});