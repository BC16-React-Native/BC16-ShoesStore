import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightScreen, widthScreen } from '../../utility'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native-animatable'
    const OrderCart = ({
    stylesContainer,
    item,
    index,
    handleOrder
    }) => {

    const navigation = useNavigation();
    
    return (
    <TouchableOpacity onPress = {() => navigation.push('OrderDetail' , {
            item: item
          })} style = {[styles.container, stylesContainer]}>
    <View style = {[styles.containerv1]}>
        {item ? 
                <Image
                    style={[styles.img]}
                    source={
                        item?.status == 'delivering' ?
                        require('../../assets/images/delivering2.png'):
                        require('../../assets/images/pending-icon.png')
                        
                    }
                />
            : null
            }
    </View>
    <View style = {[styles.containerv2]}>
        <Text style = {[styles.titleid,{color: item?.status == 'delivering'? "#5B9EE1":"#f37737"}]}>ORDER ID: {(item?.id).slice(-6)}</Text>
        <Text numberOfLines={1} style = {[styles.titleadd]}>{item?.address}</Text>
        <Text style = {[styles.titletotal]}>${item?.total}</Text>
    </View>
    </TouchableOpacity>
    )
}

export default OrderCart

const styles = StyleSheet.create({
    container:{
        height: heightScreen * 0.14,
        width: widthScreen * 0.9,
        backgroundColor:"#FFFFFF",
        flexDirection: 'row',
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
    titleid:{
        fontSize:15,
        color:'#5B9EE1',
        fontWeight:'bold',
    },
    titleadd:{
        fontSize:15,
        paddingVertical: heightScreen * 0.015,
        fontWeight:'bold',
        width: widthScreen * 0.55   
    },
    img:{
        height: heightScreen * 0.10,
        width: widthScreen * 0.22,
        borderRadius: 10,
        alignItems: 'flex-start',
    },
    containerv2:{
        paddingLeft: heightScreen * 0.010
    },
    containerv1:{
        alighItems: 'center',
        justifyContent: 'center',
        paddingVertical: heightScreen * 0.02,
        padding: heightScreen * 0.022,
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
        fontSize:17,
        fontWeight:'bold',
    },
})