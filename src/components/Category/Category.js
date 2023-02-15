import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { heightScreen, widthScreen } from '../../utility'

const Category = ({item, index, focus_index, setFocus_index}) => {
    // console.log(index);
  return (
    <TouchableOpacity 
        onPress={() => {setFocus_index(index)}}
        style={[styles.container, {flexDirection: 'row', alignItems: 'center',
            backgroundColor: index == focus_index ? '#5B9EE1' : '#FFFFFF',
        }]}
    >
            {/*  //not change  */}
        <View style={[styles.boxIcon ,{backgroundColor: '#fff'}]}> 
            {/*  //not change  */}
            {item?.name == 'All' ? 
                <MaterialCommunityIcons name="dots-grid" size={28} color="black" /> 
                : 
                <MaterialCommunityIcons name="shoe-sneaker" size={28} color="black" />
            }
        </View>
        <Text style={[styles.text, 
            {color: index == focus_index ? '#fff' : '#000'}]}
        >
            {item?.name}
        </Text>
    </TouchableOpacity>
  )
}

export default Category

const styles = StyleSheet.create({
    text:{
        fontFamily: 'SF-Pro',
        fontSize: 14,
        color: 'black',
        marginHorizontal: widthScreen * 0.02,
    },
    container:{
        paddingVertical: heightScreen * 0.01,
        paddingHorizontal: widthScreen * 0.015,
        borderRadius: 20,
        marginHorizontal: widthScreen * 0.01,
        marginVertical: heightScreen * 0.016,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: heightScreen * 0.004,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
    },
    boxIcon:{
        borderRadius: 14,
        marginLeft: widthScreen * 0.01
    }
})