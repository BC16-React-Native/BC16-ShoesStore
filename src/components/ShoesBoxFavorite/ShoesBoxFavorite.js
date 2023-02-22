import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { heightScreen, widthScreen } from '../../utility/index'
import Feather  from "react-native-vector-icons/Feather"
import { deleteFavorite } from '../../api/controller/favorite/deleteFavorite'

const ShoesBoxFavorite = ({item}) => {
  const deleteFavo = (id) =>{
    deleteFavorite(id);
  }
  return (
    <TouchableOpacity style={styles.container} onPress={() =>{console.log('go to detail')}}>
        <Image
          style={styles.image}
          source={{
            uri: item?.images[0]
          }}
        />
      <View style={{marginVertical: heightScreen * 0.02}}>
        <Text style={styles.title}>BEST SELLER</Text> 
        <Text numberOfLines={1} style={styles.name}>{item?.name}</Text>
      </View>
        <Text style={styles.price}>${item?.prices}</Text>
      <TouchableOpacity style={[styles.icon_like, 
          {backgroundColor: '#E15B5B'}
        ]} 
        onPress={() => {deleteFavo(item?.id)}}
      >
        <Feather name="heart" size={22} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default ShoesBoxFavorite

const styles = StyleSheet.create({
  image: {
    height: heightScreen * 0.125,
    width: widthScreen * 0.35,
    transform: [{rotate: '-10deg'}],
  },
  container:{
    backgroundColor: '#fff',
    alignSelf: 'stretch',

    paddingVertical: heightScreen * 0.01,
    paddingHorizontal: widthScreen * 0.02,
    borderRadius: 20,
    marginHorizontal: widthScreen * 0.01,
    marginVertical: heightScreen * 0.01,

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: heightScreen * 0.004,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  title:{
    color: '#5B9EE1',
    marginVertical: heightScreen * 0.006
  },
  name:{
    fontFamily: 'SF-Pro',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    color: '#1A2530',
    width: widthScreen * 0.3768,
    // maxHeight: 38,
    
  },
  price:{
    fontFamily: 'SF-Pro',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 16,
    color: '#1A2530'
  },
  icon_like:{
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 36,
    width: 34,
    borderTopLeftRadius: 14,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
})