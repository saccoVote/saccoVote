import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from './screens/Home';
import SignupScreen from './screens/Sign_up';
import SplashScreen from './screens/Splash';
import LoginScreen from './screens/Login';

const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="SplashScreen" component = {SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={HomeScreen}  options = {{headerShown:false}}/>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* </*Stack.Screen name="Dashboard" component={Dashboard} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
