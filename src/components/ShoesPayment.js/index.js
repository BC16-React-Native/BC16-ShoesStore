import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React, { useEffect, useState } from 'react'

import { heightScreen, widthScreen } from '../../utility/index'
import Feather from "react-native-vector-icons/Feather"
import { get_ProductID } from '../../api/controller/products/getProducts'




const ShoesPayment = ({ item, type = 'order', quantity, setQuantity }) => {
    const [data, setData] = useState();
    useEffect(() => {
        setQuantity(item?.quantity);
        get_ProductID(setData, item?.productid);
    }, [])
    return (
        <TouchableOpacity style={styles.container} onPress={() => { console.log('go to detail') }}>
            {data ? <Image
                style={styles.image}
                source={{
                    uri: data?.images[0]
                }}
            /> : null}
            <View style={{ 
                marginVertical: heightScreen * 0.02, 
                justifyContent: 'space-evenly', 
                marginHorizontal: widthScreen * 0.02,
                // borderWidth: 1,
                flex : 1
            }}>
                
                <Text numberOfLines={1} style={styles.name}>{data?.name}</Text>
                <Text style={styles.price}>${data?.prices}</Text>


                <View style={{
                    flexDirection: 'row',
                    width: widthScreen * 0.2,
                    justifyContent: 'space-between',
                    // flex: 1
                    // marginTop: 10
                }}>
                    <TouchableOpacity
                        onPress={() => setQuantity(quantity - 1)}
                        style={{ 
                            height: 25, 
                            width: 25, 
                            borderRadius: 25 / 2, 
                            backgroundColor: '#F8F9FA', 
                            justifyContent: 'center', 
                            alignItems: 'center' 
                        }}>
                        <Text style={{ fontSize: 15, }}>-</Text>
                    </TouchableOpacity>
                    <Text>{quantity}</Text>
                    <TouchableOpacity 
                        onPress={() => setQuantity(quantity + 1)} 
                        style={{ 
                            height: 25, 
                            width: 25, 
                            borderRadius: 25 / 2, 
                            backgroundColor: '#5B9EE1', 
                            justifyContent: 'center', 
                            alignItems: 'center',

                        }}>
                        <Text style={{ fontSize: 15, color: 'white' }}>+</Text></TouchableOpacity>
                </View>
            </View>
            {type !== 'payment' ? 
            <TouchableOpacity style={styles.icon_delete}
                onPress={()=>
                    {}
                }
            >
                <Feather name="trash-2" size={22} color="#707B81" />
            </TouchableOpacity>
            : null}
        </TouchableOpacity>
    )
}

export default ShoesPayment

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
        paddingHorizontal: widthScreen * 0.02,
        borderRadius: 20,
        marginVertical: heightScreen * 0.005,
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
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#5B9EE1',
        marginVertical: heightScreen * 0.006
    },
    name: {
        fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20,
        color: '#1A2530',
    },
    price: {
        fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 16,
        color: '#1A2530',
        marginVertical: heightScreen * 0.01
    },
    icon_delete: {
        paddingRight: 10
    }
})

