import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { heightScreen, widthScreen } from '../../utility'
import Feather  from "react-native-vector-icons/Feather"
import { useNavigation } from '@react-navigation/native'
import { addFavorite } from '../../api/controller/favorite/addFavorite'
import auth from '@react-native-firebase/auth'
import { deleteFavorite, deleteFavorite_idProduct } from '../../api/controller/favorite/deleteFavorite'
import Modal from "react-native-modal";
import { StatusBar } from 'react-native'
import NonAuthentication from '../Modal/NonAuthentication'

const ShoesBox = ({item, isnoFav}) => {
  const [like, setLike] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const handleLike = (product, id, noFav) =>{
    let data = {
      productid: product?.id,
      userid: id
    }
    !noFav ? deleteFavorite_idProduct(id,item.id) : addFavorite(data);
  }

  const add_Like = (product, id, noFav) => {
    auth()._user !== null ? !auth()?._user?.isAnonymous ?  
      handleLike(product, id, noFav)
    : setModalVisible(true)  : null
  } 

  return (
    <>
    <TouchableOpacity style={styles.container} onPress={() =>{
      navigation.push('Detail' , {
        item: item, 
        isnoFav: isnoFav
      });
    }}>
        <Image
          style={styles.image}
          source={{
            uri: item?.images[0]
          }}
        />
      <View style={{marginVertical: heightScreen * 0.02}}>
        <Text style={styles.title}>BEST SELLER</Text> 
        <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
      </View>
        <Text style={styles.price}>${item.prices}</Text>
      <TouchableOpacity style={[styles.icon_like, 
          {backgroundColor:  isnoFav ? '#5B9EE1' : '#E15B5B'}
        ]} 
        onPress={() => {add_Like(item, auth().currentUser.uid,isnoFav)}}
      >
        <Feather name="heart" size={22} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
    <Modal
        testID={'modal'}
        isVisible={modalVisible}
        onSwipeComplete={() => {
            setModalVisible(false); 
        }}
        swipeDirection={['up', 'left', 'right', 'down']}
        style={styles.view}
      >
            <StatusBar
                animated={true}
                barStyle = {modalVisible ? 'dark-content' : 'dark-content'}
                backgroundColor  = '#4b4b4b'
            />
            <NonAuthentication funClose={() => {setModalVisible(false)}} />
        </Modal>
    </>
  )
}

export default ShoesBox

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
    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    color: '#1A2530',
    width: widthScreen * 0.3768,
    // maxHeight: 38,
    
  },
  price:{
    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
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