import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


const AdminDashboard = ({selectedSacco}) => {
  const navigation = useNavigation()

  const handleManageSaccoPress = () => {
      navigation.navigate('ManageSaccoScreen');
  }

  const handleAddMemberPress = () => {
    // 3 nested step navigation. use for reference if needed
    // navigation.navigate('Tabs', {screen: "DashboardTab", params: {screen: "AddMemberScreen"}});
    navigation.navigate("AddMemberScreen")
  }
  const handleViewMemberPress = () => {
    navigation.navigate('ViewMembersScreen');
  }
  const handleNewElectionPress = () => {
    navigation.navigate('NewElectionScreen');
  }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <HeaderSection />
            <SaccoSection handleManageSaccoPress={handleManageSaccoPress} selectedSacco={selectedSacco}/>
            <MembersSection handleAddMemberPress={handleAddMemberPress} handleViewMemberPress={handleViewMemberPress} selectedSacco={selectedSacco} />
            <ElectionsSection handleNewElectionPress={handleNewElectionPress} />
        </ScrollView>
    );
    
};



const HeaderSection = ({selectedSacco}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.topBar}>
        <MaterialCommunityIcons name="bell-outline" size={30} color="#000" />
      </View>
      <Text style={styles.headerText}>Welcome Back, Doe</Text>
      <Text style={styles.subHeaderText}>Manage your sacco {selectedSacco?.sacco_name}</Text>
    </View>
  );
};

const SaccoSection = ({ handleManageSaccoPress, selectedSacco }) => {
  return (
      <View style={styles.saccoContainer}>
        {/* <View style = {styles.container2}>
         <MaterialCommunityIcons name="account-group" size={24} color="#000" style={styles.icon} />
        </View> */}
          <View>
              <Text style={styles.sectionTitle}>Sacco</Text>
              <Text style={styles.saccoName}>{selectedSacco?.sacco_name}</Text>
          </View>
          <View>
              <Text>members</Text>
              <Text style={styles.saccoName}>29 members</Text>
          </View>
         
          <View  style = {styles.saccoDetails}>
              <Text>elections</Text>
              <Text style={styles.saccoName}>5 ongoing | 3 upcoming</Text>
          </View>
          <TouchableOpacity style={styles.manageSaccoButton} onPress = {handleManageSaccoPress}>
              <Text style={styles.manageSaccoButtonText}>manage sacco</Text>
          </TouchableOpacity>
      </View>
  );
};

const MembersSection = ({ handleAddMemberPress, handleViewMemberPress }) => {
  return (
    <View style={styles.membersContainer}>
      <TouchableOpacity style={styles.button} onPress = {handleAddMemberPress}>
        <MaterialCommunityIcons name="account-plus-outline" size={24} color="#000" style={styles.icon} />
        <Text style={styles.buttonText}>Add new member</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress = {handleViewMemberPress}>
        <MaterialCommunityIcons name="account-multiple-outline" size={24} color="#000" style={styles.icon} />
        <Text style={styles.buttonText}>view members</Text>
      </TouchableOpacity>
    </View>
  );
};

const ElectionsSection = ({handleNewElectionPress}) => {
  return (
    <View style={styles.electionsContainer}>
      <TouchableOpacity style={styles.button} onPress={handleNewElectionPress}>
        <MaterialCommunityIcons name="vote-outline" size={24} color="#000" style={styles.icon} />
        <Text style={styles.buttonText}>Start a new election</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="format-list-checks" size={24} color="#000" style={styles.icon} />
        <Text style={styles.buttonText}>manage elections</Text>
      </TouchableOpacity>
      <Text style={styles.candidatesInfo}>
        13 candidates are awaiting vetting. Click on manage elections to vet.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  headerContainer: {
    marginBottom: 20,
  },
  topBar: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#888',
  },
  saccoContainer: {
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    marginBottom: 20,
    padding: 3,
  },
  saccoName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  saccoDetails: {
    marginBottom: 20,
  },
  electionsDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  manageSaccoButton: {
    backgroundColor: '#34C759', // Or any color that matches your design
    paddingVertical: 12,
    // You can reduce paddingHorizontal to reduce the width or remove it if you want the button to wrap content
    paddingHorizontal: 50, // Reduced padding
    borderRadius: 20,
    alignSelf: 'flex-end', // Aligns the button to the right
    marginBottom: 20, // You might want to add this if it's in your design
  },
  
  manageSaccoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  membersContainer: {
    marginBottom: 20,
  },
  electionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  button: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row', // To align icon and text
    alignItems: 'center', // To align icon and text vertically
    marginBottom: 8,
  },
  buttonWithIcon: {
    justifyContent: 'flex-start',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    flex: 1, // Ensure the text takes up the available space
  },
  candidatesInfo: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
  icon: {
    marginRight: 10, // Adjust the number to increase spacing
  },
 /*  container2:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5
  } */
  // Add other styles that you see in the provided image that you wish to replicate
});

export default AdminDashboard;