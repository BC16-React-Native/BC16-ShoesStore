
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { getallFavorite_productid, getallProducts_id, get_Favorite_userID, get_unFavorite_userID } from '../api/controller/favorite/getFavorite';
import ShoesBox from '../components/ShoesBox';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightScreen, widthScreen } from '../utility/index';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import ShoesBoxFavorite from '../components/ShoesBoxFavorite/ShoesBoxFavorite';
import { useSelector } from 'react-redux';
import NonAccount from '../components/NonAccount';


const Favorite = () => {
  const [fvlist, setFvl] = useState([]);
  const roles = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (roles == false){
      get_Favorite_userID(setFvl, auth().currentUser.uid);
      
    }
  }, [])
  useLayoutEffect(() => { 
    navigation.setOptions({ 
        title: 'Favorite',
        headerLeft : () => (    
              <TouchableOpacity onPress={() => navigation.goBack()} 
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  height: heightScreen * 0.0566,
                  width: widthScreen * 0.112,
                  borderRadius: widthScreen * 0.056
                }}
              >
                  <FontAwesome name="angle-left" size={24} color="black" />
              </TouchableOpacity>
        ), 
    }) 
  }, []);
  

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
      </SafeAreaView>
  )
}


export default Favorite


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
  }
})

