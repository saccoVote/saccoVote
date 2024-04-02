import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ViewMember = () => {
  const [members, setMembers] = useState([
    { id: 1, name: 'Alessandro Koome', avatar: require('../assets/images/profile.png') },
    { id: 2, name: 'EveCandy Mwende', avatar: require('../assets/images/profile.png') },
    { id: 3, name: 'Evalyne Mbogo', avatar: require('../assets/images/profile.png') },
    { id: 4, name: 'Shallom Nyawira', avatar: require('../assets/images/profile.png') },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Perform data fetching or any other asynchronous tasks here
    setTimeout(() => {
      // Update the members or perform any other actions after data fetching
      setRefreshing(false);
    }, 1000); // Simulating a delay of 1 second
  };

  const handleDeleteMember = (id, name) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete ${name}?`,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Delete', onPress: () => confirmDelete(id) }
      ],
      { cancelable: false }
    );
  };

  const confirmDelete = (id) => {
    const updatedMembers = members.filter(member => member.id !== id);
    setMembers(updatedMembers);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.topBar}>
          <MaterialCommunityIcons name="bell-outline" size={30} color="#000" />
        </View>
        <View>
          <View style={styles.membersContainer}>
            <Text style={styles.heading2}>Members</Text>
            {members.map((member) => (
              <View key={member.id} style={styles.memberItem}>
                <Image source={member.avatar} style={styles.avatar} />
                <Text style={styles.memberName}>{member.name}</Text>
                <TouchableOpacity onPress={() => handleDeleteMember(member.id, member.name)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
    padding: 15,
  },
  membersContainer: {
    marginHorizontal: 20,
  },
  heading2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  memberName: {
    fontSize: 16,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 'auto',
  },
  deleteButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default ViewMember;
