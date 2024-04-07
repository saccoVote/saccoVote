import React, { useState, useEffect } from "react"; // Import useEffect
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from "../services/AuthService";


const SaccoSwitcherScreen = ({ navigation }) => {
  const [saccos, setSaccos] = useState([]);

  const fetchSaccos = async () => { 
    const response = await AuthService.getAuthenticatedUser();
    if (response.ok) { 
      const jsonResponse = await response.json();
      setSaccos(jsonResponse["user_saccos"]);
    } else {
      console.error('Failed to fetch sacco details:', response.statusText);
    }
  };

  useEffect(() => {
    fetchSaccos();
  }, []); 

  const handleSelectSacco = async (saccoId) => {
    await AsyncStorage.setItem('selectedSaccoId', saccoId);
    navigation.navigate('Tabs');
  };

  const renderSacco = (sacco) => ( 
    <TouchableOpacity key={sacco.sacco_id} style={styles.saccoButton}
      onPress={() => handleSelectSacco(sacco.sacco_id.toString())}>
      <Text style={styles.saccoButtonText}>{sacco.sacco_name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Sacco</Text>
      {}
      {saccos.map(renderSacco)}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    paddingTop: 100,
  },
  listcontainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  saccoButton: {
    backgroundColor: 'lightgreen',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    marginVertical: 10,
    marginBottom: 30,
  },
  saccoButtonText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    // paddingTop: 20,
  },
});

export default SaccoSwitcherScreen;