import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React, { useEffect, useState } from 'react'

import { heightScreen, widthScreen } from '../utility/index'
import Feather from "react-native-vector-icons/Feather"
import { get_ProductID } from '../api/controller/products/getProducts'

const ShoesBoxOrder = ({item}) => {
    const [data, setData] = useState();
    useEffect(() => {
        get_ProductID(setData, item?.productid);
      }, [])
    return (
        <View style = {styles.container}>
            <View style = {[styles.containerv1]}>
                <Text numberOfLines={1} style = {[styles.titleid]}>{data?.name}</Text>
                <Text style = {[styles.titletotal]}>${data?.prices}</Text>
                <Text style = {[styles.titleam]}>Quantity: {item?.quantity}</Text>
            </View>
            <View style = {[styles.containerv2]}>
                {/* <Image 
                    source = {{uri: data?.images[0]}}
                    style = {styles.img} 
                /> */}
                {data ? 
                    <Image
                        style={[styles.img]}
                        source={{
                            uri: data?.images[0]
                        }}
                    />
                : null
                }
            </View>
        </View>
    )
}

export default ShoesBoxOrder

const styles = StyleSheet.create({
    container:{
        height: heightScreen * 0.13,
        width: widthScreen * 0.9,
        backgroundColor: "#FFFFFF",
        alignSelf:'center',
        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: heightScreen * 0.004,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        marginVertical: heightScreen * 0.01
    },
    containerv1:{
        position:'absolute',
        marginLeft: widthScreen * 0.35,
        marginTop: heightScreen * 0.02,
        paddingRight: widthScreen * 0.02
    },
    containerv2:{
        position:'absolute',
        marginLeft: widthScreen * 0.035,
    },
    img:{
        position: 'absolute',
        // height: heightScreen * 0.15,
        // width: widthScreen * 0.2,
        padding: heightScreen * 0.055,
        borderRadius: 10,
        alignItems: 'flex-start',
        transform: [{rotate: '-10deg'}],
    },
    titleid:{
        fontSize:16,
        fontWeight:'bold',
        color: '#1A2530'
    },
    titletotal:{
        fontSize:16,
        marginVertical: heightScreen * 0.01,
        fontWeight:'bold',
        color: '#1A2530'
    },
    titleam:{
        fontSize:15,
        fontWeight:'bold',
    },
})