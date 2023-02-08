import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ShoesBox from './ShoesBox'
import { heightScreen, widthScreen } from '../../utility'

const ListShoes = () => {
  return (
    <View style={styles.container}>
        
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
            marginHorizontal: widthScreen * 0.04,
            marginVertical: heightScreen * 0.01,
        }}
        >
            <Text style={styles.title}>Popular Shoes</Text>
            <TouchableOpacity>
                <Text style={styles.see_all}>See all</Text> 
            </TouchableOpacity>
        </View>

        <View style={styles.list}>
            <ShoesBox />
            <ShoesBox />
            <ShoesBox />
        </View>
    </View>
  )
}

export default ListShoes

const styles = StyleSheet.create({
    list:{
        flexDirection: 'row',
        marginLeft: widthScreen * 0.03,
        marginVertical: heightScreen * 0.01,
    },
    container: {

    },
    title:{
        color: '#000',
        fontFamily: 'SF-Pro',
        fontSize: 18,
        fontWeight: 'bold',
    },
    see_all : {
        fontFamily: 'SF Pro',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 13,
        lineHeight: 16,
        color: '#5B9EE1',
        marginRight: widthScreen * 0.0127,
    }
})