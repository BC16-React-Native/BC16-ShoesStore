import { Animated, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View, ScrollView, Keyboard,Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import auth from "@react-native-firebase/auth"
import { heightScreen, widthScreen } from '../utility'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import SearchItem from '../components/SearchItem/SearchItem'

const SearchScreen = () => {
    // const headerMotion = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    // // function handle animation 
    // const animatedKeyBoard = (motion, value, duration) => {
    //     Animated.timing(
    //         motion,
    //         {
    //             toValue:value,
    //             duration: duration,
    //             speed: Platform.OS == 'ios'? 60 : 50,
    //             useNativeDriver:false
                
    //         }
    //     ).start();
    // }
    // // hanlde to avoid view when showing key board
    // useEffect(()=> {
    //     const SHOW_KEYBOARD_EVENT = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    //     const HIDE_KEYBOARD_EVENT = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
    //     const showSubscription = Keyboard.addListener(SHOW_KEYBOARD_EVENT,() =>{
    //         animatedKeyBoard(headerMotion, heightScreen * -0.27, 400);

    //     })
    //     const hideSubscription = Keyboard.addListener(HIDE_KEYBOARD_EVENT, () => {
    //         animatedKeyBoard(headerMotion, 0, 400);
    //     })
    //     return () => {
    //         showSubscription.remove()
    //         hideSubscription.remove();
    //     }
    // },[]);
    
    const Header = () => {
        return(
            <View style = {styles.containerHeader}>
              <Text style={styles.textSearch}>Search</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('BottomTab',{itemId: 86})} style={styles.buttonBack}>
                <Icon name='chevron-back-outline' color={'black'} size={30} style={styles.iconBack}/>
              </TouchableOpacity> 
              <View 
                    style={styles.serachBar}>
                    <Icon name="search" size={24} color="#707B81" style={{marginLeft:widthScreen*0.05}}/>
                    <TextInput
                        style= {styles.input }
                        placeholder='Search your shoes'
                    ></TextInput>
                </View>
            </View>
        )
    }
    
    const Body = () => {
      
        return (       
            <View style={styles.containerBody}>
                <Text style={{fontSize:18, color: '#1A2530', fontWeight: 'bold', marginBottom: heightScreen*0.02}}>Suggested</Text>
                <SearchItem 
                    nameicon={'hearto'}
                    nameitem='Nike Air Pod 1'
                />
                <SearchItem 
                    nameicon={'hearto'}
                    nameitem='Nike Pro Max'
                />
                <SearchItem 
                    nameicon={'hearto'}
                    nameitem='Nike kì'
                />
                <Text style={{fontSize:18, color: '#1A2530', fontWeight: 'bold', marginBottom: heightScreen*0.02}}>History</Text>
                <SearchItem 
                    nameicon={'clockcircleo'}
                    nameitem='Boot super'
                />
                <SearchItem 
                    nameicon={'clockcircleo'}
                    nameitem='Nice xu'
                />
                <SearchItem 
                    nameicon={'clockcircleo'}
                    nameitem='Boot rainy'
                />
                <SearchItem 
                    nameicon={'clockcircleo'}
                    nameitem='Scandal Bitis'
                />
            </View>
        )
    }

    return (
        <SafeAreaView style= {styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
          <ScrollView>
            <Header/>
            <Body />
          </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    )


}

export default SearchScreen

const styles = StyleSheet.create({
  container : {
    flex:1,
    height : heightScreen,
    width: widthScreen,
    backgroundColor:'#F8F9FA',
},
containerHeader: {
    width: widthScreen,
    alignSelf:'center',
},
title: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf:"center",
    textAlign:"center",
},
containerBody: {
    height : heightScreen ,
    marginTop: heightScreen*0.05,
    width: widthScreen*0.7,
    alignSelf: 'center',
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
textSearch:{
  position: 'absolute',
  right: widthScreen * 0.45,
  marginTop: heightScreen * 0.045,
  fontSize: 16,
  fontWeight: 'bold',
  color: '#1A2530'
},
serachBar:{
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff',
    width: widthScreen * 0.9,
    borderRadius: 20,
    marginTop: heightScreen * 0.12, 
    alignSelf: 'center'
},
input:{
    marginLeft: widthScreen * 0.05,
}

})