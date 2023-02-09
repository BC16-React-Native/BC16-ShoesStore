import { ScrollView, StyleSheet, Text, View, StatusBar, FlatList, Image, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import OrderCart from '../../components/Admin/OrderCart'
import MaterialCommunityIcons from'react-native-vector-icons/MaterialCommunityIcons'
import  { heightScreen, widthScreen } from '../../utility'
import { getOrder_status_delivery_pending} from '../../api/controller/orders/getOrders'
const HomeScreen = () => {

  const [data, setData] = useState()
  useEffect(() => {
    getOrder_status_delivery_pending(setData)
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <Image 
          source={require('../../assets/images/profile.png')}  
          style={styles.avt} 
      />
      <Text style = {styles.titletxt}>Hey, 
      <MaterialCommunityIcons  
        name = 'hand-wave'
        size = {20}
        color = '#ffca3b'
        />
      </Text>
      <Text style = {styles.titletxt1}>
        Gerard M. NGUYEN
      </Text>
      {/* <OrderCart stylesContainer = {{marginVertical:heightScreen *0.02}}
      />
      <OrderCart stylesContainer = {{marginVertical:heightScreen *0.02}}
      />
      <OrderCart stylesContainer = {{marginVertical:heightScreen *0.02}}
      /> */}
    <FlatList
      style={styles.containerfl} 
      // contentContainerStyle={styles.listContainer}
      data={data}
      // horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index}) => <OrderCart
        stylesContainer = {{marginVertical:heightScreen *0.02}}
        item = {item}
        index = {index}
      />}
      keyExtractor={item => item.id}
    />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height: heightScreen,
    width: widthScreen,
    backgroundColor: '#F8F9FA',
  },
  avt: {
    width: 80,
    height: 80,
    marginTop: heightScreen * 0.01,
    marginVertical: heightScreen * 0.03,
    borderRadius: 100/ 2,
    alignSelf: 'flex-start',
    marginLeft: widthScreen * 0.08
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
    // backgroundColor: 'red'
  }
})