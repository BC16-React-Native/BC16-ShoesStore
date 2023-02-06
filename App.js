import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import React, { useEffect, useState } from 'react';
import { get_AllProducts } from './src/api/controller/products/getProducts';
import Slider from './src/components/Slider/Slider';

const App = () => {
  const [data, setData] = useState();
  const getProductsAPi = async () => {
    // const result = await getJobs(dispatch);
    const result = await get_AllProducts();
    setData(result);
  }
  useEffect(() => {
    Platform.OS === 'ios'? null: SplashScreen.hide();
  }, [])
  useEffect(() => {
    getProductsAPi();
  }, []);
  console.log(data);
  return (
    <SafeAreaView>
      <Slider />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
