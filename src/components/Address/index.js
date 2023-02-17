import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"

const Address = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.infor_text}>214-216-218 Nguyen Phuoc Lan, Danang, </Text>
        <TouchableOpacity>
            <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
    </View>
  )
}

export default Address

const styles = StyleSheet.create({
    infor_text:{
        fontFamily: 'SF-Pro',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        color: '#1A2530',
        flex: 1
    },
})