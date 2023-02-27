import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightScreen, widthScreen } from '../../utility'
import { useNavigation } from '@react-navigation/native'
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
      })}>
    <View style = {[styles.container, stylesContainer]}>
        <Text style = {[styles.titleid]}>ORDER ID: {(item?.id).slice(-6)}</Text>
        <Text style = {[styles.titleadd]}>{item?.address}</Text>
        <Text style = {[styles.titlepr]}>${item?.total}</Text>
        <TouchableOpacity style = {[styles.btn, {backgroundColor: item?.status == 'delivering'? "#5B9EE1": "#f37737"}]}>
            <Text style = {[styles.btntext]}>{item?.status == 'delivering' ? 'View Detail' : 'Pending'}</Text>
        </TouchableOpacity>
    </View>
    </TouchableOpacity>
    )
}

export default OrderCart

const styles = StyleSheet.create({
    container:{
        height: heightScreen * 0.14,
        width: widthScreen * 0.8,
        backgroundColor:"#FFFFFF",
        justifyContent:'space-between',
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
    titleid:{
        fontSize:10,
        color:'#5B9EE1'
    },
    titleadd:{
        position: 'absolute',
        fontSize:15,
        marginVertical: heightScreen * 0.03,
        fontWeight:'bold',
    },
    titlepr:{
        position: 'absolute',
        fontSize:15,
        marginVertical: heightScreen * 0.06,
        fontWeight:'bold',
    },
    btn:{
        position: 'absolute',
        height: heightScreen * 0.035,
        backgroundColor: '#5B9EE1',
        marginVertical: heightScreen * 0.095,
        width: widthScreen * 0.4,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    btntext:{
        fontSize:13,
        color:'#FFFFFF',
        fontWeight:'bold',
    }
})