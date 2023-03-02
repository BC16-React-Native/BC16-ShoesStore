import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { heightScreen, widthScreen } from '../utility/index';
import { useNavigation } from '@react-navigation/native';


const SearchItem = ({nameicon, nameitem}) => {
  const navigation = useNavigation();

 return (
   <TouchableOpacity style={styles.containerParent} onPress={()=>navigation.navigate('Result',{searchwword: nameitem})}>
       <AntDesign name={nameicon} color={'black'} size={25} style={styles.iconBack}/>
       <View style={styles.containerSon}>
       <Text style={{textAlign: 'left'}}>{nameitem}</Text>
       </View>
   </TouchableOpacity>
 )
}


export default SearchItem


const styles = StyleSheet.create({
   containerParent: {
       flexDirection: 'row',
       justifyContent:'space-between',
       height: heightScreen*0.05,
       width: widthScreen*0.55,
       alignItems: 'center',
       margin: 3,
       lineHeight: 150
   },
   containerSon:{
       width: '70%'
   }
})

