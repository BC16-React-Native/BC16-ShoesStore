import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { heightScreen, widthScreen } from '../../utility'
import Feather  from "react-native-vector-icons/Feather"

const ShoesBox = () => {
  // console.log(widthScreen);
  const [like, setLike] = useState(false);
  return (
    <TouchableOpacity style={styles.container} onPress={() =>{console.log('go to detail')}}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://admin.vuahanghieu.com/upload/product/2022/07/giay-the-thao-nam-nike-air-force-1-07-white-cw2288-111-mau-trang-size-41-62d52b4239177-18072022164330.jpg',
        }}
      />
      <View style={{marginVertical: heightScreen * 0.02}}>
        <Text style={styles.title}>BEST SELLER</Text>
        <Text style={styles.name}>Nike Jordan</Text>
      </View>
        <Text style={styles.price}>$493.00</Text>
      <TouchableOpacity style={[styles.icon_like, 
          {backgroundColor: !like ? '#5B9EE1' : '#E15B5B'}
        ]} 
        onPress={() => {setLike(!like)}}
      >
        <Feather name="heart" size={22} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default ShoesBox

const styles = StyleSheet.create({
  image: {
    height: heightScreen * 0.125,
    width: widthScreen * 0.35,
    
  },
  container:{
    backgroundColor: '#fff',
    alignSelf: 'stretch',

    paddingVertical: heightScreen * 0.01,
    paddingHorizontal: widthScreen * 0.02,
    borderRadius: 20,
    marginHorizontal: widthScreen * 0.01,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 3,
  },
  title:{
    color: '#5B9EE1',
    marginVertical: heightScreen * 0.006
  },
  name:{
    fontFamily: 'SF Pro',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 20,
    color: '#1A2530'
  },
  price:{
    fontFamily: 'SF Pro',
    fontWeight: 600,
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