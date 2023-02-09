import { Animated, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View, ScrollView,Switch, Keyboard, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { heightScreen, widthScreen, ORANGE_DARK, BLUE_DARK } from '../utility'
import { useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/Ionicons';

const SettingsScreen = () => {
    const navigation = useNavigation();
    const [isNotiEnabled, setIsNotiEnabled] = useState(true);
    const toggleSwitch1 = () => setIsNotiEnabled(previousState => !previousState);
    const [isLocaEnabled, setIsLocaEnabled] = useState(true);
    const toggleSwitch2 = () => setIsLocaEnabled(previousState => !previousState);
    const [isDarkEnabled, setIsDarkEnabled] = useState(false);
    const toggleSwitch3 = () => setIsDarkEnabled(previousState => !previousState);
    const Header = () => {
        return(
            <View style={styles.containerHeader}>
              <Text style={styles.textProfile}>Settings</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('Profile')} style={styles.buttonBack}>
                <Icon name='chevron-back-outline' color={'black'} size={30} style={styles.iconBack}/>
              </TouchableOpacity> 
            </View>
        )
    }
    const Body = () => {
        return(
            <View style={styles.containerBody}>
              <Text style={{fontSize:18, fontWeight: 'bold', color: '#1A2530'}}>App Settings</Text>
              <View style={styles.viewCheckBox}>
                <Text>Enable Push Notifications</Text>
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isNotiEnabled ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch1}
                    value={isNotiEnabled}
                />
              </View>
              <View style={styles.viewCheckBox}>
                <Text>Enable Location Services</Text>
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isLocaEnabled ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch2}
                    value={isLocaEnabled}
                />
              </View>
              <View style={styles.viewCheckBox}>
                <Text>Dark mode</Text>
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isDarkEnabled ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch3}
                    value={isDarkEnabled}
                />
              </View>
            </View>
        )
    }
    

    return (
        <View style= {styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
          <ScrollView>
            <Header/>
            <Body />
          </ScrollView>
        </KeyboardAvoidingView>
        </View>
    )


}

export default SettingsScreen

const styles = StyleSheet.create({
    container : {
      flex:1,
      height : heightScreen,
      width: widthScreen,
      backgroundColor:'#F8F9FA',
  },
  containerHeader: {
      height : heightScreen * 0.15,
      width: widthScreen,
      // borderWidth:1
  },
  containerBody: {
      height : heightScreen * 0.25,
      width: widthScreen * 0.85,
      alignSelf: 'center',
      justifyContent: 'space-between'
      // borderWidth:1
  },
  buttonBack: {
    position: 'absolute',
    width: widthScreen * 0.14,
    height: heightScreen * 0.067,
    backgroundColor: 'white',
    borderRadius: 40,
    marginLeft: widthScreen * 0.05,
    marginTop: heightScreen * 0.03,
    justifyContent: 'center'
  },
  iconBack:{
    alignSelf: 'center'
  },
  textProfile:{
    position: 'absolute',
    right: widthScreen * 0.45,
    marginTop: heightScreen * 0.045,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A2530'
  },
  viewCheckBox:{
    flexDirection: 'row',
    justifyContent:'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E9EDEF'
  }
  })