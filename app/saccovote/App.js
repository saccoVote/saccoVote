import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from './screens/Home';
import SignupScreen from './screens/Sign_up';
import SplashScreen from './screens/Splash';

const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="SplashScreen" component = {SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={HomeScreen}  options = {{headerShown:false}}/>
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
