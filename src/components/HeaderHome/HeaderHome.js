import { StyleSheet, Text, View,  } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import { heightScreen } from '../../utility'

 
const HeaderHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shoes Store</Text>
      <View style={{flexDirection:  'row', alignItems: 'center'}}>
        <Ionicons name="location-sharp" size={24} color="#F87265" />
        <Text style={styles.address}>DaNang, VietNam</Text>
      </View>
    </View>
  )
}

export default HeaderHome

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: heightScreen * 0.013
    },
    text:{
        fontSize: 12,
        marginLeft: 4,
        color: '#707B81',
    },
    address :{
        fontSize: 14,
        color: '#1A2530',
    }
})