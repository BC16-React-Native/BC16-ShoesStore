import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightScreen, widthScreen } from '../../utility'
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'
const ProductManage = ({
    stylesContainer,
    item,
    index,
    image,
    icon,
    stylesIcon
}) => {
    const date = new Date(item.datecreate)
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const localDateString = date.toLocaleDateString("en-US", options);
    const navigation = useNavigation();
return (
    <TouchableOpacity style = {[styles.container, stylesContainer]}>
    <View>
    <View style = {[styles.containerv1]}>
        <Text style = {[styles.titleid]}>{item.name.length > 25 ? `${item.name.slice(0,25)}...` : item.name}</Text>
        <Text style = {[styles.titletotal]}>${item.prices}</Text>
        <Text style = {[styles.titledate]}>Create: {localDateString}</Text>
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
    <View style = {styles.containerv3}>
    <Text style = {styles.titleamount}>Q:{item.amount}</Text>
    <TouchableOpacity style = {styles.buttonEdit} onPress = {() =>navigation.push('ProductDetail' , {
        // screen: 'Detail',
        // params : {
        //   item: item
        // }
        item: item
      })}>
    <Icon name='edit' size={20} color={'#5B9EE1'} />
    </TouchableOpacity>
    </View>
    </View>
    </TouchableOpacity>
    )
}

export default ProductManage

const styles = StyleSheet.create({
    container:{
        height: heightScreen * 0.14,
        width: widthScreen * 0.9,
        backgroundColor:"#FFFFFF",
        // justifyContent:'space-between',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        alignSelf:'center',
        paddingTop: heightScreen * 0.015,
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
        marginLeft: widthScreen * 0.31,
        marginTop: heightScreen * 0.002,
    },
    containerv2:{
        position:'absolute',
        marginLeft: widthScreen * 0.023,
        marginTop: heightScreen * 0.00
    },
    containerv3:{
        position:'absolute',
        marginLeft: widthScreen * 0.75,
        marginTop: heightScreen * 0.035,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleid:{
        fontSize:15,
        fontWeight:'bold',
        marginVertical: heightScreen * 0.004,
        color: '#1A2530'
    },
    titletotal:{
        fontSize:17,
        marginVertical: heightScreen * 0.01,
        fontWeight:'bold',
        color: '#1A2530'
    },
    titledate:{
        fontSize:15,
        marginVertical: heightScreen * 0.004,
        color:'#5B9EE1',
        fontWeight:'bold',
    },
    img:{
        position: 'absolute',
        // height: heightScreen * 0.15,
        // width: widthScreen * 0.2,
        padding: heightScreen * 0.06,
        borderRadius: 10,
        alignItems: 'flex-start',
        transform: [{rotate: '-10deg'}],
    },
    buttonEdit:{
        padding:7,
    },
    titleamount:{
    }
})
