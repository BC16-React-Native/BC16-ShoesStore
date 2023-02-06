import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons"
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

console.disableYellowBox = true;

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator 
            tabBarOptions={{
            activeTintColor: '#FDA43C',
            showLabel: true,
            activeBackgroundColor:'#ced6e0',
            labelColor:'#FDA43C'
            }}
            screenOptions={{
            headerShown: false
            }}
        >
        <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon:({color,size}) => (
            <View>
            <Ionicons name="home" size={size} color={color}/>
            </View>
        ),
        tabBarLabel :({color}) => (
            <View>
            <Text fontSize={20} color={color}>Home</Text>
            </View>
        ),
        }}/>

        <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarIcon:({color,size}) => (
            <View>
            <Ionicons name="settings" size={size} color={color}/>
            </View>
        ),
        tabBarLabel :({color}) => (
            <View>
            <Text fontSize={20} color={color}>Profile</Text>
            </View>
        ),
        }}/>
    </Tab.Navigator>
  )
}

export default BottomTab

const styles = StyleSheet.create({})