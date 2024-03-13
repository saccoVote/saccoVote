import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import EmailScreen from './screens/Email';
import SignupScreen from './screens/SignUp';
import SplashScreen from './screens/Splash';
import PasswordScreen from './screens/Password';


const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component = {SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name="EmailScreen" component={EmailScreen}  options = {{headerShown:false}}/>
        <Stack.Screen name="SignupScreen" component={SignupScreen} options = {{headerShown:false}}/>
        <Stack.Screen name="PasswordScreen" component={PasswordScreen} options = {{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
