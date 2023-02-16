
import { Animated, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View, ScrollView, Keyboard,Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import auth from "@react-native-firebase/auth"
import { heightScreen, widthScreen } from '../utility/index'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import SearchItem from '../components/SearchItem'


const SearchScreen = () => {
   const navigation = useNavigation();
  
   const Header = () => {
     const [search, setSearch] = useState('')

       return(
           <View style = {styles.containerHeader}>
             <Text style={styles.textSearch}>Search</Text>
             <TouchableOpacity onPress={()=>navigation.navigate('BottomTab')} style={styles.buttonBack}>
               <Icon name='chevron-back-outline' color={'black'} size={30} style={styles.iconBack}/>
             </TouchableOpacity>
             <View
                   style={styles.serachBar}>
                   <Icon name="search" size={24} color="#707B81" style={{marginLeft:widthScreen*0.05}}/>
                   <TextInput
                      value={search}
                      onChangeText={setSearch}
                       style= {styles.input }
                       placeholder='Search your shoes'
                       onSubmitEditing={()=>navigation.navigate('Result',{searchwword: search})}
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
                   nameitem='Air Jordan'
               />
               <SearchItem
                   nameicon={'hearto'}
                   nameitem='Boot Company'
               />
               <SearchItem
                   nameicon={'hearto'}
                   nameitem='Sandal Adidas'
               />
               <Text style={{fontSize:18, color: '#1A2530', fontWeight: 'bold', marginBottom: heightScreen*0.02}}>History</Text>
               <SearchItem
                   nameicon={'clockcircleo'}
                   nameitem='Stan Smith'
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
 justifyContent: 'center',
 shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,

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
   alignSelf: 'center',
   shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  
  elevation: 3,
},
input:{
   marginLeft: widthScreen * 0.05,
}


})

