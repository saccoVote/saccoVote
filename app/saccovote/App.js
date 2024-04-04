import * as React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import EmailScreen from './screens/Email';
import SignupScreen from './screens/SignUp';
import SplashScreen from './screens/Splash';
import PasswordScreen from './screens/Password';
import SaccoSwitcherScreen from './screens/SaccoSwitcher'
import Tabs from './components/Tabs';
import AdminDashboard from './Dashboard/AdminDashboard';
import ManageSacco from './Dashboard/ManageSacco';


import NewElectionScreen from './screens/NewElection';
import AddMember from './Dashboard/AddMember';
import ViewMember from './Dashboard/ViewMember';
import ProfileManagement from './tabs/ProfileManagement';
import FingerPrint from './tabs/FingerPrint';


const App = () => {

  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component = {SplashScreen} options={{headerShown:false}} />
          <Stack.Screen name="EmailScreen" component={EmailScreen}  options = {{headerShown:false}}/>
          <Stack.Screen name="SignupScreen" component={SignupScreen} options = {{headerShown:false}}/>
          <Stack.Screen name="PasswordScreen" component={PasswordScreen} options = {{headerShown:false}}/>
          <Stack.Screen name="SaccoSwitcherScreen" component={SaccoSwitcherScreen} options = {{headerShown:false}}/>
          {/* <Stack.Screen name="TabScreen" component={TabScreen} options = {{headerShown:false}}/> */}
          <Stack.Screen name="Tabs" component={Tabs} options = {{headerShown:false}}/>
          {/* <Stack.Screen name="AdminDashboard" component={AdminDashboard} options = {{headerShown:false}}/> */}
          <Stack.Screen name="ManageSacco" component={ManageSacco} options = {{headerShown:false}}/>
          <Stack.Screen name="NewElection" component={NewElectionScreen} options={{headerShown:false}} />
          <Stack.Screen name="AddMember" component={AddMember} options = {{headerShown:false}}/>
          <Stack.Screen name="ViewMember" component={ViewMember} options = {{headerShown:false}}/>
          <Stack.Screen name="ProfileManagement" component={ProfileManagement} options = {{headerShown:false}}/>
          <Stack.Screen name="FingerPrint" component={FingerPrint} options = {{headerShown:false}}/>
          
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};


export default App;

/* 
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import { HomeScreen, DashboardScreen, ElectionCurrent, HistoryScreen, MoreScreen } from "./screens";
import EmailScreen from './screens/Email';
import SignupScreen from './screens/SignUp';
import SplashScreen from './screens/Splash';
import PasswordScreen from './screens/Password';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
    tabBarShowLabel:false,
    headerShown:false,
    tabBarStyle:{
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: 60,
      background: "#fff"
    }
  }

  const App = () => {
    // Define a new Stack for authentication screens
    function AuthStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
                <Stack.Screen name="EmailScreen" component={EmailScreen}  options={{headerShown: false}}/>
                <Stack.Screen name="SignupScreen" component={SignupScreen} options={{headerShown: false}}/>
                <Stack.Screen name="PasswordScreen" component={PasswordScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        );
    }


    function MyTabs(){
        return(
            <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen 
          name="History" 
          component={HistoryScreen} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                    <MaterialCommunityIcons name="format-list-bulleted" size={30} color="#000" />
                    <Text style={{fontSize: 12, color: "#16247d"}}>History</Text>
                </View>
              )
            }
          }}
          />
          <Tab.Screen 
        //Both admin and normal user dahsboard
          name="Dashboard" 
          component={DashboardScreen} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <MaterialCommunityIcons name="account-circle-outline" size={30} color="#000" />
                  <Text style={{fontSize: 12, color: "#000"}}>Dashboard</Text>
            </View>
              )
            }
          }}
          />
         <Tab.Screen
                    name="Home"
                    component={HomeScreen} // Or AuthStack if you want to navigate through the stack
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: "center", justifyContent: "center"}}>
                                <MaterialCommunityIcons name="home-outline" size={30} color="#000" />
                                <Text style={{fontSize: 12, color: "#000"}}>Home</Text>
                            </View>
                        ),
                    }}
          />
          <Tab.Screen
           name="ElectionCurrent" 
           component={ElectionCurrent}
           options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <MaterialCommunityIcons name="vote" size={20} color="#000" />
                  <Text style={{fontSize: 12, color: "#000"}}>Election</Text>
            </View>
              )
            }
          }}
           />
          <Tab.Screen 
          name="More" 
          component={MoreScreen} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <MaterialCommunityIcons name="dots-horizontal" size={30} color="#000" />
                  <Text style={{fontSize: 12, color: "#000"}}>More</Text>
            </View>
            )
            }
          }}
          />
       </Tab.Navigator>

        );
    }


  return (
    <NavigationContainer>
        <AuthStack />
        <MyTabs />
    </NavigationContainer>
  )
}

export default App; */