import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const Category = () => {
  return (
    <TouchableOpacity style={[styles.container, {flexDirection: 'row', alignItems: 'center',
            backgroundColor: '#fff',
        }]}>
            {/*  //not change  */}
        <View style={[styles.boxIcon ,{backgroundColor: '#fff'}]}> 
            {/*  //not change  */}
            <MaterialCommunityIcons name="shoe-sneaker" size={24} color="black" />
        </View>
        <Text style={[styles.text, {color: '#000'}]}>Sneaker</Text>
    </TouchableOpacity>
  )
}

export default Category

const styles = StyleSheet.create({
    text:{
        fontFamily: 'SF Pro',
        fontSize: 14,
        color: 'black',
        marginHorizontal: 8
    },
    container:{
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 20,
        flex: 1,
        marginHorizontal: 4,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    boxIcon:{
        borderRadius: 12
    }
})