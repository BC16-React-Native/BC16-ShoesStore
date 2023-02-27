import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightScreen, widthScreen } from '../../utility'
import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
const ProductCart = ({
    stylesContainer,
    item,
    index,
    image,
    icon,
    stylesIcon,
    nextNavigator = 'OrderHistoryDetails',
}) => {
    const date = new Date(item?.datedone || item?.datecreate)
    const navigation = useNavigation();
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const localDateString = date.toLocaleDateString("en-US", options);
return (
    <TouchableOpacity onPress ={() => navigation.push(nextNavigator , {
        item: item,
        type: nextNavigator == 'OrderHistoryDetails' ?  'admin' : 'user',
      })} style = {[styles.container, stylesContainer]}>
    <View style = {[styles.containerv2]}>
        {/* <Image 
        source = {{uri: item.images?.[0]}}
        style = {styles.img} 
        /> */}
        {item ? 
                <Image
                    style={[styles.img]}
                    source={{
                        uri: item?.images[0]
                    }}
                />
            : null
            }
    </View>
    <View style = {[styles.containerv1]}>
        <Text style = {[styles.titleid]}>ORDER ID: {(item?.id).slice(-6)}</Text>
        <Text style = {[styles.titletotal]}>${item?.total}</Text>
        <Text style = {[styles.titledate]}>Done: {localDateString}</Text>
    </View>
    </TouchableOpacity>
    )
}

export default ProductCart

const styles = StyleSheet.create({
    container:{
        height: heightScreen * 0.14,
        width: widthScreen * 0.9,
        backgroundColor:"#FFFFFF",
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'center',
        alignSelf:'center',
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
        paddingLeft: widthScreen * 0.1
    },
    containerv2:{
        marginLeft: widthScreen * 0.03,
        alighItems: 'center',
        justifyContent: 'center',
    },
    titleid:{
        fontSize:15,
        color:'#5B9EE1',
        fontWeight:'bold',
    },
    titleitem:{
        fontSize:16,
    },
    titletotal:{
        fontSize:18,
        marginVertical: heightScreen * 0.01,
        fontWeight:'bold',
    },
    titledate:{
        fontSize:15,
        color:'green',
        fontWeight:'bold',
    },
    img:{
        height: heightScreen * 0.15,
        width: widthScreen * 0.3,
        borderRadius: 10,
        alignItems: 'flex-start',
        transform: [{rotate: '-10deg'}],
    },
})
