import React, { useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, RefreshControl
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import saccoUserService from '../services/SaccoUserService';

const avatar = require('../assets/images/profile.png');

const ViewMembersScreen = ({ navigation }) => {
  const [members, setMembers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await saccoUserService.getUsers();
      if (!response.ok) {
        setRefreshing(false);
        Alert.alert('An error occurred while fetching users');
      } else {
        setRefreshing(false);
        setMembers((await response.json()).results);
      }
    } catch (error) {
      setRefreshing(false);
      Alert.alert('An error occurred');
      console.debug(error);
    }
  };

  useFocusEffect(React.useCallback(() => {
    handleRefresh();
  }, []));

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

  const handleEditMemberPress = (id) => {
    console.debug('edit member btn clicked', id);
    navigation.navigate('EditMemberScreen', { id });
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
        <View style={styles.membersContainer}>
          <Text style={styles.heading2}>Members</Text>
          {members.map((member) => (
            <View key={member.id} style={styles.memberItem}>
              <View style={styles.memberItemInfo}>
                <Image source={avatar} style={styles.avatar} />
                <Text style={styles.memberName}>{member.fullname}</Text>
              </View>
              <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => handleDeleteMember(member.id, member.fullname)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEditMemberPress(member.id)} style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20, 
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
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  memberItemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10, // Adjusted for spacing
  },
  deleteButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  editButton: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  editButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Ensures buttons are aligned properly
    // Removed the gap property, adjusted spacing with marginRight in deleteButton
  }
});

export default ViewMembersScreen;
