import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { heightScreen, widthScreen } from '../../utility'
import FieldButton from '../Auth/FieldButton'
import { get_Cart_Price } from '../../api/controller/cart/getCart'
import { addOrder } from '../../api/controller/orders/addOrder'
import auth from "@react-native-firebase/auth"

const Checkout = ({item, type, address, phone}) => {
    const [subprice, setSubprice] = useState(0)
    console.log(item);
    useLayoutEffect(() => {
        setSubprice(get_Cart_Price(item));
    }, [item])
    const createOrder = () => {
        const data  = {
            address: address,
            phone: phone,
            productsid: [{
                productid: item.productid,
                price: item.prices,
                quantity: item.quantity
            }],
            status: 'pending',
            total: subprice + 10,
            userid: auth().currentUser.uid,
            datecreate : new Date().toISOString(),
        }
        addOrder(data);
        // console.log(data);
    }
  return (
    <View style={styles.view_checkout}>
        <View style={styles.view_total}>
            <Text style={styles.text_Left}>Subtotal</Text>
            <Text style={styles.text_Right}>${subprice}</Text>
        </View>
        <View style={styles.view_shipping}>
            <Text style={styles.text_Left}>Shipping</Text>
            <Text style={styles.text_Right}>$10</Text>
        </View>
        <View style={styles.hr} />
        <View style={styles.view_total}>
            <Text style={styles.text_LeftTotal}>Total</Text>
            <Text style={styles.priceTotal}>${subprice + 10}</Text>
        </View>
        <FieldButton
            stylesContainer={{}}
            title={type == 'payment' ? 'Payment' : 'Checkout'}
            onPress={() => {
                if(type == 'payment'){
                    createOrder();
                }
            }}
        />
    </View>
  )
}

export default React.memo(Checkout)

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
        alignSelf:'flex-end',
    },
    text_Right: {
        fontFamily: 'SF-Pro',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 24,
        /* identical to box height, or 133% */

        textAlign: 'right',

        /* Light/Text Color */

        color: '#1A2530',
    },
    priceTotal: {
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'right',
        color: '#1A2530',
    },
    text_LeftTotal: {
        fontFamily: 'SF-Pro',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        color: '#1A2530',
    },
    text_Left: {
        fontFamily: 'SF-Pro',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        color: '#707B81',
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