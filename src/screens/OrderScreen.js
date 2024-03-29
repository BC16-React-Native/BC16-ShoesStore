import { StyleSheet, Text, TouchableOpacity, View, FlatList, Platform } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import HeaderHome from '../components/HeaderHome/HeaderHome';
import AntDesign from "react-native-vector-icons/AntDesign"
import { get_LenghtCart_uID } from '../api/controller/cart/getCart';
import auth from "@react-native-firebase/auth"
import { heightScreen, widthScreen } from '../utility';
import { get_User_byID } from '../api/controller/users/getRoles';
import { getOrdersUserID, get_Order_userID } from '../api/controller/orders/getOrders';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCart from '../components/Admin/ProductCart';
import OrderCart from '../components/OrderCart';
import NonAccount from '../components/NonAccount';
import Lottie from 'lottie-react-native'

const OrderScreen = () => {
  const navigation = useNavigation();
  //=============== render HEADER
  const [lenghtCart, setLenghtCart] = useState();
  useLayoutEffect(() => {
    get_LenghtCart_uID(setLenghtCart, auth().currentUser.uid)
  }, [])

  const [user, setUser] = useState();
  const getUser = async () => {
      const result = await get_User_byID();
      setUser(result);
  }
  useEffect(() => {
      getUser();
  }, [])
  //=============== render HEADER

  const [data, setData] = useState();
  useEffect(() => {
    getOrdersUserID(setData, auth().currentUser.uid);
  }, [])
  useLayoutEffect(() => { 
    navigation.setOptions({ 
      headerTitle: () => 
      <View style={{alignItems: 'center'}}>
        {user?.name || user?.email ?
        <><Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text></>
        : <Text style={styles.title}>Order</Text>
        }
      </View>,
      headerRight: () => (
        <View style= {{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() =>{navigation.navigate("MyCart")}} 
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                height: heightScreen * 0.0566,
                width: widthScreen * 0.112,
                borderRadius: widthScreen * 0.056
              }}
            >
                <AntDesign name="shoppingcart" size={24} color="black" />
                {lenghtCart ? <View 
                  style={{
                    backgroundColor: 'red', 
                    padding: 6, 
                    borderRadius: 6,
                    position: 'absolute',
                    top: 4,
                    right: 0
                  }}
                >
                </View> : null}
        </TouchableOpacity>
        </View>
      ),
    }) 
  }, [lenghtCart, user]);
  return (
    <SafeAreaView style = {styles.container}>
      {/* { !auth()?.currentUser?.isAnonymous ?  */}
      {data?.length > 0 ?
        <FlatList
          // style={styles.containerfl} 
          data={data}
          // horizontal={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item,index}) => <OrderCart
            item = {item}
            nextNavigator= 'OrderDetail'
          />}
          keyExtractor={item => item.id}
        />
      : <View style={{flex: 1, alignItems:'center', marginTop: heightScreen * 0.1}}>
            <Lottie 
                source={require('../utility/order/empty-box.json')} 
                autoPlay 
                loop={false}
                style={{height: heightScreen * 0.40, width: widthScreen * 0.40,}}
            />
            <Text style={styles.title}>Empty Cart</Text>
            <Text numberOfLines={2} style={styles.message}>Looks like you haven't made your choice yet.....</Text>
        </View>
       }
    </SafeAreaView>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  userName:{
    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    color: '#000',
  }, 
  email: {
    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    color: '#757575',
  },
  title:{
    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    color: '#000',
  },
  container:{
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingBottom: heightScreen * 0.08,
    marginTop: Platform.OS == 'ios'? -heightScreen * 0.03: null
  },
})