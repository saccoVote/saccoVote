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

  const AppNavigation = () => {
    // Define a new Stack for authentication screens
    function AuthStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
                <Stack.Screen name="EmailScreen" component={EmailScreen}  options={{headerShown: false}}/>
                <Stack.Screen name="SignupScreen" component={SignupScreen} options={{headerShown: false}}/>
                <Stack.Screen name="PasswordScreen" component={PasswordScreen} options={{headerShown: false}}/>
                // Remove HomeScreen from here
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

export default AppNavigation;