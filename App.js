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
const Stack = createNativeStackNavigator();

const App = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
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

  console.log(data);
  if (loading) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {!authenticated ?(<>
        <Stack.Screen options={{headerShown: false}} name="Getting" component={GettingStarted}/>
        <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignInScreen} />
        <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUpScreen} />
      </>)
        :(<>
          <Stack.Screen options = {{headerShown: false}} name="BottomTab" component={BottomTab} />
          {/* <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} /> */}
        </>)
      }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
