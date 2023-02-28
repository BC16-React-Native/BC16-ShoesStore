import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons'
import  { heightScreen, widthScreen } from '../../utility'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ProductCart from '../../components/Admin/ProductCart';
import { get_AllProducts } from '../../api/controller/products/getProducts';
import ProductManage from '../../components/Admin/ProductManage';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import { useNavigation } from '@react-navigation/native';
import FieldButton from '../../components/Auth/FieldButton';

const ListProduct = () => {
  const navigation = useNavigation();
  const [data, setData] = useState();

  useEffect(() => {
      get_AllProducts(setData);
  },[])
  const Header = () => {
    return(
        <View style={styles.containerHeader}>
          <Text style={styles.textProfile}>List Product</Text>
        </View>
    )
}
  return (
    <SafeAreaView style = {styles.container}>
    <Header/>
    <FlatList
      style={styles.containerfl} 
      data={data?.sort((a, b) => {
              return new Date(b.datecreate) - new Date(a.datecreate);
      })}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index}) => <ProductManage
        stylesContainer = {{marginVertical:heightScreen *0.02}}
        item = {item}
        index = {index}
      />}
      keyExtractor={item => item.id}
    />
    <TouchableOpacity onPress={() => navigation.navigate('ProductCreate')} style={styles.buttonEdit}>
      <Ionicons name='add' color={'black'} size={40} style={styles.iconBack}/>
    </TouchableOpacity> 
    </SafeAreaView>
  )
}

export default ListProduct

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height: heightScreen,
    width: widthScreen,
    backgroundColor: '#F8F9FA',
  },
  containerHeader: {
    height : heightScreen * 0.04,
    width: widthScreen,
    // borderWidth:1
},
textProfile:{
  fontSize: 16,
  fontWeight: 'bold',
  alignSelf: 'center',
  color: '#1A2530'
},
  containerfl:{
    height: heightScreen * 1
  },
  buttonEdit:{
    position: 'absolute',
    width: 70,
    height: 70,
    marginTop: Platform.OS == 'ios'? heightScreen * 0.8: heightScreen * 0.77,
    backgroundColor: '#5B9EE1',
    borderRadius: 70/2,
    right: widthScreen * 0.09,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  
    elevation: 4,
  },
  iconBack:{
    color:'#F8F9FA',
    fontWeight:'bold',
  },
})