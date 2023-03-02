
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { getallFavorite_productid, getallProducts_id, get_Favorite_userID, get_unFavorite_userID } from '../api/controller/favorite/getFavorite';
import ShoesBox from '../components/ShoesBox';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightScreen, widthScreen } from '../utility/index';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import ShoesBoxFavorite from '../components/ShoesBoxFavorite/ShoesBoxFavorite';
import { useSelector } from 'react-redux';
import NonAccount from '../components/NonAccount';
import Loader from '../components/Auth/Loader';
import Feather  from "react-native-vector-icons/Feather"


const FavoriteScreen = () => {
  const [fvlist, setFvl] = useState([]);
  const roles = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (roles == false){
      get_Favorite_userID(setFvl, auth().currentUser.uid);
      
    }
  }, [])
  useFocusEffect(useCallback(()=> {
    get_Favorite_userID(setFvl, auth().currentUser.uid);
    setLoading(true)
  setTimeout(() => setLoading(false),1000)

  }, []),
  );
  useLayoutEffect(() => { 
    navigation.setOptions({ 
        title: 'Favorite',
    }) 
  }, []);
  
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  // console.log(auth()?.currentUser);
  return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        { !auth()?.currentUser?.isAnonymous ? 
          <FlatList
            data={fvlist}
            renderItem={({ item, index }) => <ShoesBoxFavorite item={item} />}
            numColumns={2}
            keyExtractor={item => item.id}
            style={{ flex: 1, marginTop: heightScreen*0.2 }}
          />
          : <NonAccount /> 
        }
        {fvlist?.length == 1 
        ? 
        <TouchableOpacity style={styles.container} onPress={() =>{
          console.log(fvlist[0]);
          navigation.push('Detail' , {
          item: fvlist[0], 
          isnoFav: true
        });}}>
          <Image
            style={styles.image}
            source={{
              uri: fvlist[0]?.images[0]
            }}
          />
          <View style={{marginVertical: heightScreen * 0.02}}>
            <Text style={styles.title}>BEST SELLER</Text> 
            <Text numberOfLines={1} style={styles.name}>{fvlist[0]?.name}</Text>
          </View>
            <Text style={styles.price}>${fvlist[0]?.prices}</Text>
          <TouchableOpacity style={[styles.icon_like, 
              {backgroundColor: '#E15B5B'}
            ]} 
            onPress={() => {deleteFavo(fvlist[0]?.id)}}
          >
            <Feather name="heart" size={22} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
        : 
        <FlatList
          data={fvlist}
          renderItem={({ item, index }) => <ShoesBoxFavorite item={item} />}
          numColumns={2}
          keyExtractor={item => item.id}
          style={{ flex: 1, marginBottom: heightScreen * 0.13 }}
        />
        }
        
        <Loader visible = {loading}/>
      </SafeAreaView>
  )
}


export default FavoriteScreen


const styles = StyleSheet.create({
  title:{
    fontFamily: 'SF-Pro',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    color: '#000',
    marginTop: heightScreen * 0.06,
    marginBottom: heightScreen * 0.01,
},
  buttonBack: {
    // position: 'absolute',
    width: widthScreen * 0.14,
    height: heightScreen * 0.067,
    backgroundColor: 'white',
    borderRadius: 40,
    marginLeft: widthScreen * 0.05,
    marginTop: heightScreen * 0.03,
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,


    elevation: 3,
  },
  iconBack: {
    alignSelf: 'center'
  },
  textSearch: {
    position: 'absolute',
    right: widthScreen * 0.45,
    marginTop: heightScreen * 0.045,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A2530'
  },
  serachBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: widthScreen * 0.9,
    borderRadius: 20,
    marginTop: heightScreen * 0.12,
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,


    elevation: 3,
  },
  input: {
    marginLeft: widthScreen * 0.05
  }, 
  image: {
    height: heightScreen * 0.125,
    width: widthScreen * 0.35,
    transform: [{rotate: '-10deg'}],
  },
  container:{
    width: widthScreen *0.45,
    left: widthScreen * 0.05,
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

