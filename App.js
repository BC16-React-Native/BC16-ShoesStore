import {Button, StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState();

  useEffect(() => {
    Platform.OS === 'ios'? null: SplashScreen.hide();
  }, [])
  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
