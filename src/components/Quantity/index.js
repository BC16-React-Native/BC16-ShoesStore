import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { updateCart_minus, updateCart_plus } from '../../api/controller/cart/updateCart'
import { widthScreen } from '../../utility'

const Quantity = ({data, quantity}) => {
  return (
    <View style={{
        flexDirection: 'row',
        width: widthScreen * 0.2,
        justifyContent: 'space-between',

    }}>
        <TouchableOpacity
            onPress={() => {
                updateCart_minus(data);
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
        <Text>{quantity}</Text>
        <TouchableOpacity 
            onPress={() => {
                updateCart_plus(data);
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