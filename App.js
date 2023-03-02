import 'react-native-gesture-handler';
import {Button, StyleSheet, Text, View, LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './src/navigation/BottomTab';
import BottomTabAdmin from './src/navigation/BottomTabAdmin';
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
import { useDispatch, useSelector } from 'react-redux';
import { setLauch } from './src/redux/features/state/stateSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DetailScreen from './src/screens/DetailScreen';
import OrderDetail from './src/screens/Admin/OrderDetail';
import ProductDetail from './src/screens/Admin/ProductDetail';
import OrderDetailUser from './src/screens/OrderDetail';



LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

import SearchScreen from './src/screens/SearchScreen';
import ResultScreen from './src/screens/ResultScreen';
import MyCartScreen from './src/screens/MyCartScreen';
import Payment from './src/screens/Payment';
import ProductCreate from './src/screens/Admin/ProductCreate';
import OrderHistoryDetails from './src/screens/Admin/OrderHistoryDetails';

const Stack = createNativeStackNavigator();


const App = () => {
  const dispatch = useDispatch();
  const lauch = useSelector((state) => state.state.lauch);
  // console.log('launch_redux', lauch);
  const [loading, setLoading] = useState(true);
  // const [lauch, setLauch] = useState(false);
  const roles = useSelector((state) => state.auth.role);
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
      auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      // console.log(authenticated)
      setLoading(false);
    })
  }, []);

  useEffect(() => {
    Platform.OS === 'ios'? null: SplashScreen.hide();
  }, [])


  if (loading) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator>
      {!authenticated ?(<>
        {!lauch? <Stack.Screen options={{headerShown: false}} name="Getting" component={GettingStarted}/>

        : <></>}
        <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignInScreen} />
        <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{headerShown: false}} name="Forgot" component={ForgotScreen} />
      </>)
        :(<>
          {!roles ? (<>
          <Stack.Screen options = {{headerShown: false}} name="BottomTab" component={BottomTab}/>
          <Stack.Screen options={{
                  headerStyle: {
                      backgroundColor: '#F8F9FA',
                  },
                  headerShadowVisible: false,
                  headerTitleAlign: 'center',
              }}  
              name="MyCart" 
              component={MyCartScreen}
          />
          <Stack.Screen options={{headerShown: false}} name="Search" component={SearchScreen}/>
          <Stack.Screen options={{headerShown: false}} name="Result" component={ResultScreen}/>
          <Stack.Screen 
              options={{
                  headerStyle: {
                      backgroundColor: '#F8F9FA',
                  },
                  headerShadowVisible: false,
                  headerTitleAlign: 'center',
              }} 
              name="Detail" 
              component={DetailScreen}
          />
          <Stack.Screen 
              options={{
                  // headerShown: false,
                  headerStyle: {
                      backgroundColor: '#F8F9FA',
                  },
                  headerShadowVisible: false,
                  headerTitleAlign: 'center',
              }} 
              name="Payment" 
              component={Payment}
          />
          <Stack.Screen 
              options={{
                  // headerShown: false,
                  headerStyle: {
                      backgroundColor: '#F8F9FA',
                  },
                  headerShadowVisible: false,
                  headerTitleAlign: 'center',
              }} 
              name="OrderDetail"  
              component={OrderDetailUser}
          />
          <Stack.Screen options={{headerShown: false}} name="Settings" component={SettingsScreen}/>
        </>)
        : (<>
          <Stack.Screen options = {{headerShown: false}} name="BottomTabAdmin" component={BottomTabAdmin} /> 
          <Stack.Screen options={{headerShown: false}} name="Settings" component={SettingsScreen}/>
          <Stack.Screen 
              options={{
                  // headerShown: false,
                  headerStyle: {
                      backgroundColor: '#F8F9FA',
                  },
                  headerShadowVisible: false,
                  headerTitleAlign: 'center',
              }} 
              name="OrderDetail"  
              component={OrderDetail}
          />
          <Stack.Screen 
              options={{
                  // headerShown: false,
                  headerStyle: {
                      backgroundColor: '#F8F9FA',
                  },
                  headerShadowVisible: false,
                  headerTitleAlign: 'center',
              }} 
              name="OrderHistoryDetails"  
              component={OrderHistoryDetails}
          />
          <Stack.Screen options={{headerShown: false}} name="ProductDetail" component={ProductDetail}/>
          <Stack.Screen options={{headerShown: false}} name="ProductCreate" component={ProductCreate}/>
          </>)
        }
        </>)}
      
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});