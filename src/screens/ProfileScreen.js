import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import auth from "@react-native-firebase/auth"
import FieldButton from '../components/FieldButton'
import { heightScreen, widthScreen, ORANGE_DARK, BLUE_DARK } from '../utility'

const ProfileScreen = () => {

  const pressLogout = () => {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));

  }

  return (
    <SafeAreaView>
      <Text>ProfileScreen</Text>
      <FieldButton
                stylesContainer={{marginVertical:heightScreen * 0.01 }}
                title={'Logout'}
                // stylesTitle={{color:"#5B9EE1"}}
                onPress={() => pressLogout()}
                />
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})