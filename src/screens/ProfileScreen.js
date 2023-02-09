import { Animated, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View, ScrollView, Keyboard, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import auth from "@react-native-firebase/auth"
import FieldButton from '../components/Auth/FieldButton'
import { heightScreen, widthScreen, ORANGE_DARK, BLUE_DARK } from '../utility'
import { useNavigation } from '@react-navigation/native'
import FieldTextInput from '../components/Auth/FieldTextInput'
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native'

const ProfileScreen = () => {
  
  const headerMotion = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    // function handle animation 
    const animatedKeyBoard = (motion, value, duration) => {
        Animated.timing(
            motion,
            {
                toValue:value,
                duration: duration,
                speed: Platform.OS == 'ios'? 60 : 50,
                useNativeDriver:false
                
            }
        ).start();
    }
    // hanlde to avoid view when showing key board
    useEffect(()=> {
        const SHOW_KEYBOARD_EVENT = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
        const HIDE_KEYBOARD_EVENT = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
        const showSubscription = Keyboard.addListener(SHOW_KEYBOARD_EVENT,() =>{
            animatedKeyBoard(headerMotion, heightScreen * -0.27, 400);

        })
        const hideSubscription = Keyboard.addListener(HIDE_KEYBOARD_EVENT, () => {
            animatedKeyBoard(headerMotion, 0, 400);
        })
        return () => {
            showSubscription.remove()
            hideSubscription.remove();
        }
    },[]);
    
    const Header = () => {
        return(
            <Animated.View style = {[styles.containerHeader, {marginTop: headerMotion}]}>
              <Text style={styles.textProfile}>Profile</Text>
              <TouchableOpacity onPress={()=>console.log('press button back')} style={styles.buttonBack}>
                <Icon name='chevron-back-outline' color={'black'} size={30} style={styles.iconBack}/>
              </TouchableOpacity> 
              <TouchableOpacity onPress={()=>navigation.navigate('Settings')} style={styles.buttonSettings}>
                <Icon name='settings-outline' color={'black'} size={30} style={styles.iconBack}/>
              </TouchableOpacity> 
              <TouchableOpacity onPress={handleEdit} style={styles.buttonEdit}>
                <Icon name='pencil' color={'black'} size={30} style={styles.iconBack}/>
              </TouchableOpacity> 
              <Image 
                source={require('../assets/images/avtgerrard.png')}  
                style={{width: 100, height: 100, borderRadius: 100/ 2, alignSelf: 'center'}} 
              />
              <TouchableOpacity onPress={()=>console.log('press button Edit avatar')} style={styles.buttonCamera}>
                <Icon name='camera-outline' color={'white'} size={20} style={styles.iconBack}/>
              </TouchableOpacity> 
            </Animated.View>
        )
    }
    const [name, setName] = useState('Gerrard Nguyen');
    const [phone, setPhone] = useState('gerard@enclave.vn');
    const [email, setEmail] = useState('+84935283204');
    const [address, setAddress] = useState('Hoa Khanh, Lien Chieu');
    const Body = () => {
      
        return (       
            <View style={styles.containerBody}>
              <Text style={{fontSize:20, alignSelf: 'center', fontWeight: 'bold', marginTop: heightScreen * -0.05}}>{name}</Text>
                {/* Text input Name*/}
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Full Name'}
                onChangeText={setName}
                value={name}
                editable={edit}
                stylesTitle={{fontWeight: 'bold'}}
                />
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Email Address'}
                onChangeText={setEmail}
                value={email}
                editable={edit}
                stylesTitle={{fontWeight: 'bold'}}
                />
                {/* Text input Phone*/}
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Phone Number'}
                onChangeText={setPhone}
                value={phone}
                editable={edit}
                stylesTitle={{fontWeight: 'bold'}}
                />
                
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Address'}
                onChangeText={setAddress}
                value={address}
                editable={edit}
                stylesTitle={{fontWeight: 'bold'}}
                />
                {edit ? <FieldButton
                title={'Save'}
                // stylesTitle={{color:"#5B9EE1"}}
                onPress={handleSave}
                stylesContainer = {{ marginVertical:heightScreen * 0.02}}
                /> : <FieldButton
                title={'Logout'}
                // stylesTitle={{color:"#5B9EE1"}}
                onPress={() => pressLogout()}
                stylesContainer = {{ marginVertical:heightScreen * 0.02}}
                />}
            </View>
        )
    }
    const [edit, setEdit] = useState(false);
    const handleEdit = () => {
      setEdit(!edit);
    }
    const handleSave = () => {
      console.log(name, phone, email, address);
    }
    const pressLogout = () => {
      auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  
    }

    return (
        <SafeAreaView style= {styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
          <ScrollView>
            <Header/>
            <Body>
            </Body>
          </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    )


}

export default ProfileScreen

const styles = StyleSheet.create({
  container : {
    flex:1,
    height : heightScreen,
    width: widthScreen,
    backgroundColor:'#F8F9FA',
},
containerHeader: {
    height : heightScreen * 0.32,
    width: widthScreen,
    paddingVertical: heightScreen * 0.10,
    paddingHorizontal: widthScreen * 0.075,
    // borderWidth:1
},
title: {
    fontSize: 28,
    fontWeight: 'bold',
    // height:heightScreen*0.2,
    // color: ORANGE_DARK,
    alignSelf:"center",
    textAlign:"center",
},
containerBody: {
    height : heightScreen ,
    paddingHorizontal: widthScreen * 0.075,
    
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
buttonSettings:{
  position: 'absolute',
  width: widthScreen * 0.14,
  height: heightScreen * 0.067,
  backgroundColor: 'white',
  borderRadius: 40,
  right: widthScreen * 0.05,
  marginTop: heightScreen * 0.03,
  justifyContent: 'center'
},
buttonEdit:{
  position: 'absolute',
  width: widthScreen * 0.14,
  height: heightScreen * 0.067,
  backgroundColor: 'white',
  borderRadius: 40,
  right: widthScreen * 0.2,
  marginTop: heightScreen * 0.03,
  justifyContent: 'center'
}
,
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
buttonCamera:{
  width: widthScreen * 0.07,
  height: heightScreen * 0.033,
  backgroundColor: '#5B9EE1',
  borderRadius: 40,
  justifyContent: 'center',
  alignSelf: 'center',
  marginTop: heightScreen * -0.015
}
})