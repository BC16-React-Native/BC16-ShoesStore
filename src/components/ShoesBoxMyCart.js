import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React, { useEffect, useState } from 'react'

import { heightScreen, widthScreen } from '../utility/index'
import Feather from "react-native-vector-icons/Feather"
import { deleteCart } from '../api/controller/cart/deleteCart'
import { get_ProductID } from '../api/controller/products/getProducts'
import { updateCart_minus, updateCart_plus } from '../api/controller/cart/updateCart'
import auth from "@react-native-firebase/auth"
import Quantity from './Quantity'
import { deleteItemCart } from '../redux/action/cart/cartRequest'
import { useDispatch, useSelector } from 'react-redux'



const ShoesBoxMyCart = ({ item, type }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const [data, setData] = useState();
    // console.log(item);
    useEffect(() => {
        // console.log(item);
        get_ProductID(setData, item?.productid);
    }, [])
    return (
        <TouchableOpacity 
            style={[styles.container, {paddingBottom: type == 'payment' ? 8 : 0}]} 
            onPress={() => { console.log('go to detail') }}
        >
            {/* check data before render */}
            {data ? 
                <Image
                    style={[styles.image]}
                    source={{
                        uri: data?.images[0]
                    }}
                />
            : null
            }
            <View style={{ 
                marginVertical: heightScreen * 0.02, 
                justifyContent: 'space-evenly', 
                marginHorizontal: widthScreen * 0.02,
                flex: 1
            }}>
                <Text 
                    numberOfLines={1} 
                    style={[styles.name, {width: type == 'payment' ?  widthScreen * 0.5 :  widthScreen * 0.3768,}]}
                >{data?.name}</Text>
                <Text style={styles.price}>${data?.prices}</Text>

                {type !== 'payment' ? 
                    <Quantity data={data} quantity={item?.quantity}/>
                : 
                <Text style={styles.quantity}>Quantity: {item?.quantity}</Text>
                }
            </View>
            {type !== 'payment' ? 
                <TouchableOpacity style={styles.icon_delete}
                    onPress={()=>
                        {
                            deleteCart(data);
                            deleteItemCart(dispatch, cart, data )
                        }
                    }
                >
                    <Feather name="trash-2" size={22} color="#707B81" />
                </TouchableOpacity>
            : null}
        </TouchableOpacity>
    )
}

export default React.memo(ShoesBoxMyCart)

const styles = StyleSheet.create({
    image: {
        alignSelf: 'center',
        height: heightScreen * 0.1,
        width: widthScreen * 0.3,
        transform: [{ rotate: '-10deg' }],
    },
    container: {
        backgroundColor: '#fff',
        alignSelf: 'center',
        alignItems: 'center',
        paddingHorizontal: widthScreen * 0.02,
        borderRadius: 20,
        marginTop: heightScreen * 0.01,
        marginBottom: heightScreen * 0.005,
        width: widthScreen * 0.9,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: heightScreen * 0.004,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    title: {
        color: '#5B9EE1',
        marginVertical: heightScreen * 0.006
    },
    name: {
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20,
        color: '#1A2530',
        // width: widthScreen * 0.3768,
    },
    price: {
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 16,
        color: '#1A2530',
        marginVertical: heightScreen * 0.01
    },
    icon_delete: {
        marginRight: 10
    },
    quantity:{
        fontFamily: 'SF-Pro',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 14,
        color: '#1A2530',
    }
})

