// the main screen after sign in
import authService from '../services/AuthService';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import {StyleSheet} from 'react-native';


const HomeScreen = () => {
    // TODO: implement the actual home from figma. also make the bottom navigation as a component that will be reused across screens.

    const [authUser, setAuthUser] = useState({})
    const fetchAuthenticatedUser = async () => {
        const response = await authService.getAuthenticatedUser()
        if (response.ok) {
            setAuthUser(await response.json())
        }
    }

    useEffect(() => {
        fetchAuthenticatedUser()
    }, [])
    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>HomeScreen</Text>
            {authUser.email && 
                <View>
                    <Text>Welcome, {authUser.email}</Text> 
                    <Text>User Saccos</Text>
                    <Text>Sacco: {authUser['user_saccos'][0]['sacco_name']}</Text>
                    <Text>Your role in this Sacco: {authUser['user_saccos'][0].role}</Text>
                </View>
            }
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: '#000'
    },
}) 


export default HomeScreen;
