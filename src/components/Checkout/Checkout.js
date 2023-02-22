import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightScreen, widthScreen } from '../../utility'
import FieldButton from '../Auth/FieldButton'
import { get_Cart_Price } from '../../api/controller/cart/getCart'

const Checkout = ({item}) => {
    const [subprice, setSubprice] = useState(0)
    useEffect(() => {
        get_subTotal(item);
    }, [])
    const get_subTotal = (list) =>{
        let subtotal = 0;
        list?.forEach((item) => {
            subtotal += item.price * item.quantity;
        })
        return subtotal
    }
    useEffect(() => {
        setSubprice(get_subTotal(item));
    }, [item])
  return (
    <View style={styles.view_checkout}>
        <View style={styles.view_total}>
            <Text style={styles.text_Left}>Subtotal</Text>
            <Text style={styles.text_Right}>$ {subprice}</Text>
        </View>
        <View style={styles.view_shipping}>
            <Text style={styles.text_Left}>Shipping</Text>
            <Text style={styles.text_Right}>$ 9</Text>
        </View>
        <View style={styles.hr} />
        <View style={styles.view_total}>
            <Text style={styles.text_LeftTotal}>Total</Text>
            <Text style={styles.text_Right}>$ {subprice + 9}</Text>
        </View>
        <FieldButton
            stylesContainer={{}}
            title={'Checkout'}
            onPress={() => console.log('tinh tien')}
            />
    </View>
  )
}

export default Checkout

const styles = StyleSheet.create({
    view_checkout:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: heightScreen * 0.004,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
        width: widthScreen, 
        height: heightScreen*0.3, 
        backgroundColor: 'white', 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        // marginTop: heightScreen * 0.02, 
        alignSelf:'flex-end',
        // position: 'absolute',
    },
    text_Right: {
        color: 'black', 
        fontSize: 18, 
        fontWeight: 'bold',
    },
    text_LeftTotal: {
        color: 'black', 
        fontSize: 16
    },
    text_Left: {
        color: '#707B81', 
        fontSize: 16
    },
    view_total:{
        flexDirection:'row', 
        width: widthScreen*0.9, 
        justifyContent: 'space-between', 
        alignSelf: 'center', 
        marginVertical: heightScreen*0.02
    },
    view_shipping:{
        flexDirection:'row', 
        width: widthScreen*0.9, 
        justifyContent: 'space-between', 
        alignSelf: 'center', 
        marginBottom: heightScreen*0.01
    },
    hr:{
        borderWidth: 0.5, 
        width: widthScreen, 
        borderColor: '#707B81'
    },
})