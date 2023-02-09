import {Button, StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './src/navigation/BottomTab';
import auth from '@react-native-firebase/auth'
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import { get_AllProducts } from './src/api/controller/products/getProducts';
import SignUpScreen from './src/screens/SignUpScreen';
import GettingStarted from './src/screens/GettingStarted';

import { storeData, getData } from './src/Storage/AsyncStorageHelper';
import ForgotScreen from './src/screens/ForgotScreen';

import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SearchScreen from './src/screens/SearchScreen';

const Stack = createNativeStackNavigator();


const App = () => {

  const [loading, setLoading] = useState(true);
  const [lauch, setLauch] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);
  const HAS_LAUNCHED = 'HAS_LAUNCHED';
  useEffect(() => {
    const getState = async () => {
      const lauch = await getData(HAS_LAUNCHED);
      if (lauch) {
        setLauch(true);
      }
      else {
        await storeData(HAS_LAUNCHED, 'true');
      }
    };
    getState().catch((error) => {console.log(error)});
    console.log('lauch:',lauch);
  },[])

  useEffect(() => {
    return auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      console.log(authenticated)
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    Platform.OS === 'ios'? null: SplashScreen.hide();
  }, [])


  // console.log(data);

  if (loading) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {/* <Stack.Screen options={{headerShown: false}} name="Search" component={SearchScreen}/> */}
      {!lauch? <Stack.Screen options={{headerShown: false}} name="Getting" component={GettingStarted}/>
      : <></>}
      {!authenticated ?(<>
        <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignInScreen} />
        <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{headerShown: false}} name="Forgot" component={ForgotScreen} />
      </>)
        :(<>
          <Stack.Screen options = {{headerShown: false}} name="BottomTab" component={BottomTab} />
          {/* <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} /> */}
          <Stack.Screen options={{headerShown: false}} name="Settings" component={SettingsScreen}/>
          <Stack.Screen options={{headerShown: false}} name="Profile" component={ProfileScreen}/>
        </>)}
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
