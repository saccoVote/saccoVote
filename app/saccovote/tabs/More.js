import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MoreTab = ({ navigation }) => {
  const handleSignout = async () => {
    await AsyncStorage.multiRemove(['token', 'user', 'selectedSaccoId', 'email']);
    navigation.reset({
      index: 0,
      routes: [{ name: 'SplashScreen' }],
    });
  };
  const handleManageSaccoPress = () => {
    navigation.navigate('ManageSacco');
  }

  const handleProfileManagementPress = () => {
    navigation.navigate('ProfileManagement');
  }

  const handleBiometricAuthenticationPress = () => {
    navigation.navigate('FingerPrint');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.notificationIcon} onPress={() => {/* Handle notification press */ }}>
          <MaterialCommunityIcons name="bell-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Icon name="account-circle" size={50} color="#444" />
        <Text style={styles.headerText}>John Doe, Admin</Text>
        <Text style={styles.subHeaderText}>Chairman at Mapambo Sacco</Text>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.menuItem} onPress={handleProfileManagementPress}>
          <Icon name="account-settings" size={20} color="#444" />
          <Text style={styles.menuItemText}>Profile Management</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleManageSaccoPress}>
          <Icon name="bank" size={20} color="#444" />
          <Text style={styles.menuItemText}>Sacco Management</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress = {handleBiometricAuthenticationPress}>
          <Icon name="fingerprint" size={20} color="#444" />
          <Text style={styles.menuItemText}>Enable Biometrics</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SaccoSwitcherScreen')}>
          <Icon name="swap-horizontal" size={20} color="#444" />
          <Text style={styles.menuItemText}>Switch Sacco</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="information-outline" size={20} color="#444" />
          <Text style={styles.menuItemText}>App Version v1.0</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleSignout}>
          <Icon name="exit-to-app" size={20} color="#444" />
          <Text style={styles.menuItemText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20, // Adjust if necessary
  },
  container2: {
    marginTop: 30,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subHeaderText: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 20,
  },
  topBar: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 20,
  },
});

export default MoreTab;
