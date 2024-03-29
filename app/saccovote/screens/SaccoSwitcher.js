import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const saccos = [
  {id: '1', name: 'Mapambo sacco'},
  {id: '2', name: 'Sacco Name'},
  {id: '3', name: 'Sacco Name'},
];

const SaccoSwitcherScreen = ({ navigation }) => {
  const handleSelectSacco = async (saccoId) => {
    await AsyncStorage.setItem('selectedSaccoId', saccoId)
    navigation.navigate('Tabs');
  };

  const renderSacco = ({ item }) => (
    <TouchableOpacity key={item.id} style={styles.saccoButton}
onPress={() => handleSelectSacco(item.id)} >
  <Text style={styles.saccoButtonText}>{item.name}</Text>
</TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Sacco</Text>
      <FlatList
      data={saccos}
      renderItem={renderSacco}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listcontainer} />
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