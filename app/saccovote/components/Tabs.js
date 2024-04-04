import {  Text, View } from 'react-native';
import HomeScreen from '../screens/Home';
import DashboardTab from '../tabs/Dashboard';
import ElectionCurrentTab from '../tabs/ElectionCurrent';
import HistoryTab from '../tabs/History';
import MoreTab from '../tabs/More';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab =createBottomTabNavigator();
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
  },
  tabBarActiveBackgroundColor: '#5FD25F'
}
const Tabs = ({navigation}) => {
  return (
      <Tab.Navigator screenOptions={screenOptions} initialRouteName='HomeScreen' >
        <Tab.Screen 
        name="History" 
        component={HistoryTab} 
        options={{
          tabBarIcon: ({focused})=>{
            return (
              <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <MaterialCommunityIcons name="history" size={30} color="#000" />
                  <Text style={{fontSize: 12, color: "#16247d"}}>History</Text>
              </View>
            )
          }
        }}
        />
        <Tab.Screen 
      //Both admin and normal user dahsboard
        name="DashboardTab" 
        component={DashboardTab} 
        options={{
          tabBarIcon: ({focused})=>{
            return (
              <View style={{alignItems: "center", justifyContent: "center"}}> 
                <MaterialCommunityIcons name="view-dashboard-outline" size={30} color="#000" />
                <Text style={{fontSize: 12, color: "#000"}}>Dashboard</Text>
          </View>
            )
          }
        }}
        />
        <Tab.Screen 
        //change the icon
        name="HomeScreen" 
        component={HomeScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({focused})=>{
            return ( 
              <View style={{alignItems: "center", justifyContent: "center"}}> 
                <MaterialCommunityIcons name="home-outline" size={30} color="#000" />
                <Text style={{fontSize: 12, color: "#000"}}>Home</Text>
              </View>)
              }
          }}
        />
        <Tab.Screen
          name="ElectionCurrent" 
          component={ElectionCurrentTab}
          options={{
            tabBarIcon: ({focused})=>{
              return (
              <View style={{alignItems: "center", justifyContent: "center"}}> 
                <MaterialCommunityIcons name="vote" size={30} color="#000" />
                <Text style={{fontSize: 12, color: "#000"}}>Election</Text>
          </View>
            )
          }
        }}
          />
        <Tab.Screen 
        name="More" 
        component={MoreTab} 
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
)
}

export default Tabs;

