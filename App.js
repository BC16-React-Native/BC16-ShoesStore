import { StyleSheet, Text, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { useEffect } from 'react'

import React from 'react'

const App = () => {

  useEffect(() => {
    Platform.OS === 'ios'? null: SplashScreen.hide();
  }, [])
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})