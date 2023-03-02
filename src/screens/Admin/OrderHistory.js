import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import  { heightScreen, widthScreen } from '../../utility'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { getFirstProductInOrdersrealtime } from '../../api/controller/orders/getOrders';
import ProductCart from '../../components/Admin/ProductCart';

const OrderHistory = () => {

  const [data, setData] = useState();
  useEffect(() => {
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
      data={data?.sort((a, b) => {
              return new Date(b.datedone) - new Date(a.datedone);
      })}
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