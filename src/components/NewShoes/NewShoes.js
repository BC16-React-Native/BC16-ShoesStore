import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightScreen, widthScreen } from '../../utility'
import { Image } from 'react-native-animatable'

const NewShoes = ({item}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Text numberOfLines={1} style={styles.name}>{item?.name}</Text>
        <Text style={styles.price}>${item?.prices}</Text>
      </View>
      <View style ={{width: widthScreen * 0.05}}/>
      <View style={styles.boxImage}>
        <Image
          style={styles.image}
          source={{
            uri : item?.images[0]
          }}
        />
      </View>
    </TouchableOpacity>
  )
}

export default NewShoes

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // borderWidth: 1,
        alignItems: 'center',
        paddingVertical: heightScreen * 0.025,
        paddingHorizontal: widthScreen * 0.05,
        flexDirection: 'row',
        marginBottom: heightScreen * 0.02,
        backgroundColor: '#fff',
        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: heightScreen * 0.004,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
    },
    price :{
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: heightScreen * 0.03,
        color: '#1A2530',
    },
    name:{
        fontFamily: 'SF-Pro',
        fontWeight: '700',
        fontSize: 20,
        lineHeight: heightScreen * 0.03,
        color: '#1A2530',
        paddingTop: heightScreen * 0.015,
        marginBottom: heightScreen * 0.013,

        width: widthScreen * 0.4,

    },
    image: {
        height: heightScreen * 0.1,
        width: widthScreen * 0.36,
        transform: [{rotate: '-10deg'}],
        bottom: heightScreen * 0.013,
        right:0
    },
    boxImage:{
        // borderWidth: 1,
        // paddingBottom: 10
    }
})