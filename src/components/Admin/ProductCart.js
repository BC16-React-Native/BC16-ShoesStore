import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightScreen, widthScreen } from '../../utility'
import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';
const ProductCart = ({
    stylesContainer,
    item,
    index,
    image,
    icon,
    stylesIcon
}) => {
    const date = new Date(item.datedone)
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const localDateString = date.toLocaleDateString("en-US", options);
return (
    <TouchableOpacity style = {[styles.container, stylesContainer]}>
    <View>
    <View style = {[styles.containerv1]}>
        <Text style = {[styles.titleid]}>ORDER ID: {(item.id).slice(-6)}</Text>
        <Text style = {[styles.titleitem]}>{item.productsid.length} items</Text>
        <Text style = {[styles.titletotal]}>${item.total}</Text>
        <Text style = {[styles.titledate]}>Done: {localDateString}</Text>
    </View>
    <Image
        style= {[styles.icon, stylesIcon]}
        source = {icon}>
    </Image>
    <View style = {[styles.containerv2]}>
        <Image 
        source = {{uri: item.images?.[0]}}
        style = {styles.img} />
    </View>

    </View>
    </TouchableOpacity>
    )
}

export default ProductCart

const styles = StyleSheet.create({
    container:{
        height: heightScreen * 0.16,
        width: widthScreen * 0.9,
        backgroundColor:"#FFFFFF",
        justifyContent:'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'center',
        alignSelf:'center',
        paddingTop: heightScreen * 0.01,
        borderRadius:16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: heightScreen * 0.001,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    containerv1:{
        position:'absolute',
        marginLeft: widthScreen * 0.38,
        marginTop: heightScreen * 0.002,
    },
    containerv2:{
        position:'absolute',
        marginLeft: widthScreen * 0.03,
        marginTop: heightScreen * 0.004
    },
    titleid:{
        fontSize:15,
        color:'#5B9EE1',
        fontWeight:'bold',
    },
    titleitem:{
        fontSize:16,
        marginVertical: heightScreen * 0.01,
    },
    titletotal:{
        fontSize:18,
        marginVertical: heightScreen * 0.01,
        fontWeight:'bold',
    },
    titledate:{
        fontSize:15,
        marginVertical: heightScreen * 0.009,
        color:'green',
        fontWeight:'bold',
    },
    img:{
        position: 'absolute',
        // height: heightScreen * 0.15,
        // width: widthScreen * 0.2,
        padding: heightScreen * 0.065,
        borderRadius: 10,
        alignItems: 'flex-start',
        transform: [{rotate: '-10deg'}],
    },
})
