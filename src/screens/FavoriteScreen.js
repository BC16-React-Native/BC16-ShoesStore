
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { getFavorite_Test, get_Favorite_userID } from '../api/controller/favorite/getFavorite';
import ShoesBox from '../components/ShoesBox';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightScreen, widthScreen } from '../utility/index';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'


const Favorite = () => {
  const [fvlist, setFvl] = useState([]);



  useEffect(() => {
    get_Favorite_userID(setFvl, auth().currentUser.uid)
  }, [])

 const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerHeader}>
        <Text style={styles.textSearch}>Favorite</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MyCart')} style={styles.buttonBack}>
          <Icon name='chevron-back-outline' color={'black'} size={30} style={styles.iconBack} />
        </TouchableOpacity>
      </View>
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        
        <FlatList
          data={fvlist}
          renderItem={({ item, index }) => <ShoesBox item={item} />}
          numColumns={2}
          keyExtractor={item => item.id}
          style={{ marginTop: heightScreen * 0.05 }}
        />
      </SafeAreaView>
    </View>
  )
}


export default Favorite


const styles = StyleSheet.create({
  containerHeader: {
    width: widthScreen,
    alignSelf: 'center',
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

