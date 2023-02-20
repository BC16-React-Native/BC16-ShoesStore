import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightScreen, widthScreen } from '../utility/index'
import Feather from "react-native-vector-icons/Feather"
import { deleteCart } from '../api/controller/cart/deleteCart'
import { get_ProductID } from '../api/controller/products/getProducts'




const ShoesBoxMyCart = ({ item }) => {
    const [nums, setNums] = useState(1);
    const [data, setData] = useState();
    useEffect(() => {
      setNums(item?.quantity);
      get_ProductID(setData, item?.productid);
    }, [])
    console.log(data);
    return (
        <TouchableOpacity style={styles.container} onPress={() => { console.log('go to detail') }}>
            <Image
                style={styles.image}
                source={{
                    uri: data?.images[0]
                }}
            />
            <View style={{ marginVertical: heightScreen * 0.02, justifyContent: 'space-evenly', marginHorizontal: widthScreen * 0.02 }}>
                <Text numberOfLines={1} style={styles.name}>{data?.name}</Text>
                <Text style={styles.price}>${data?.prices}</Text>


                <View style={{
                    flexDirection: 'row',
                    width: widthScreen * 0.2,
                    justifyContent: 'space-between',

                }}>
                    <TouchableOpacity
                        onPress={() => setNums(nums - 1)}
                        style={{ height: 25, width: 25, borderRadius: 25 / 2, backgroundColor: '#F8F9FA', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, }}>-</Text>
                    </TouchableOpacity>
                    <Text>{nums}</Text>
                    <TouchableOpacity onPress={() => setNums(nums + 1)} style={{ height: 25, width: 25, borderRadius: 25 / 2, backgroundColor: '#5B9EE1', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, color: 'white' }}>+</Text></TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.icon_delete}
                onPress={()=>deleteCart(data?.id)}
            >
                <Feather name="trash-2" size={22} color="#707B81" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default ShoesBoxMyCart








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
        marginTop: heightScreen * 0.03,
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
        width: widthScreen * 0.3768,
        // maxHeight: 38,




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
        position: 'absolute',
        right: widthScreen * 0.05,
        top: heightScreen * 0.068
    }
})





