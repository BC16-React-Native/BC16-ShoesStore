import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from'react-native-vector-icons/MaterialCommunityIcons'
import  { heightScreen, widthScreen } from '../../utility'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { getFirstProductInOrders, getFirstProductInOrdersrealtime, getOrder_status_deliveried, getOrder_status_deliveried_img, getProduct_id } from '../../api/controller/orders/getOrders';
import ProductCart from '../../components/Admin/ProductCart';

const OrderHistory = () => {

  const [data, setData] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
      // getOrder_status_deliveried(setData)
      getFirstProductInOrdersrealtime(setData);
  },[])
  const Header = () => {
    return(
        <View style={styles.containerHeader}>
          <Text style={styles.textProfile}>Order History</Text>
        </View>
    )
}
  return (
    <SafeAreaView style = {styles.container}>
    <Header/>
    <FlatList
      style={styles.containerfl} 
      // contentContainerStyle={styles.listContainer}
      data={data}
      // horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index}) => <ProductCart
        stylesContainer = {{marginVertical:heightScreen *0.02}}
        item = {item}
        index = {index}
      />}
      keyExtractor={item => item.id}
    />
    </SafeAreaView>
  )
}

export default OrderHistory

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height: heightScreen,
    width: widthScreen,
    backgroundColor: '#F8F9FA',
    paddingBottom: heightScreen * 0.08
  },
  avt: {
    width: 60,
    height: 60,
    marginTop: heightScreen * 0.01,
    marginVertical: heightScreen * 0.03,
    borderRadius: 60/ 2,
    alignSelf: 'flex-start',
    marginLeft: widthScreen * 0.08
  },
  containerHeader: {
    height : heightScreen * 0.07,
    width: widthScreen,
    // borderWidth:1
},
textProfile:{
  position: 'absolute',
  fontSize: 16,
  marginTop: heightScreen * 0.02,
  fontWeight: 'bold',
  alignSelf: 'center',
  color: '#1A2530'
},
  titletxt:{
    position:'absolute',
    marginTop: heightScreen * 0.08,
    marginLeft: widthScreen * 0.32,
    fontSize: 16,
  },
  titletxt1:{
    position:'absolute',
    marginTop: heightScreen * 0.11,
    marginLeft: widthScreen * 0.32,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B9EE1',
  },
  containerfl:{
    height: heightScreen * 1
  }

})