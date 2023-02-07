import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const AllCategory = () => {
  return (
    <TouchableOpacity style={[styles.container, {flexDirection: 'row', alignItems: 'center',        
        backgroundColor: '#5B9EE1',
    }]}>
            <View style={[styles.boxIcon ,{backgroundColor: 'white'}]}>
                <MaterialCommunityIcons name="dots-grid" size={24} color="black" />
            </View>
            <Text style={[styles.text, {color: '#fff'}]}>All</Text>
    </TouchableOpacity>
  )
}

export default AllCategory

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
        marginRight: 4,

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