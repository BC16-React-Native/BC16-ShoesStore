import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { updateCart_minus_api, updateCart_plus_api } from '../../api/controller/cart/updateCart'
import { widthScreen } from '../../utility'
import { useDispatch, useSelector } from 'react-redux';
import { updateCart_minus, updateCart_plus } from '../../redux/action/cart/cartRequest';

const Quantity = ({data, quantity}) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    const [number, setNumber] = useState(quantity);
  return (
    <View style={{
        flexDirection: 'row',
        width: widthScreen * 0.2,
        justifyContent: 'space-between',

    }}>
        {number == 1 ? <View style={{height: 25, width: 25, }}/> :
            <TouchableOpacity
                onPress={() => {
                    setNumber(number - 1)
                    updateCart_minus_api(data);
                    updateCart_minus(dispatch, cart, data);
                }}
                style={{ 
                    height: 25, 
                    width: 25, 
                    borderRadius: 25 / 2,
                    backgroundColor: '#F8F9FA', 
                    justifyContent: 'center', 
                    alignItems: 'center' }}>
                <Text style={{ fontSize: 15, }}>
                    -
                </Text>
            </TouchableOpacity>
        }
        <Text>{number}</Text>
        <TouchableOpacity 
            onPress={() => {
                setNumber(number + 1)
                updateCart_plus_api(data);
                updateCart_plus(dispatch, cart, data);
            }} 
                style={{ height: 25, 
                width: 25, 
                borderRadius: 25 / 2, 
                backgroundColor: '#5B9EE1', 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}>
            <Text style={{ fontSize: 15, color: 'white' }}>
                +
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default Quantity

const styles = StyleSheet.create({})