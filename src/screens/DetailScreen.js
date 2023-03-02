import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, FlatList, Platform, } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState} from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"

import { useNavigation } from '@react-navigation/native'
import { heightScreen, widthScreen } from '../utility'
import { SafeAreaView } from 'react-native-safe-area-context'
import { get_Categories_byID } from '../api/controller/category/getCategories'
import { get_ProductID, get_Products_categoryID, get_Products_new } from '../api/controller/products/getProducts'
import Slide from '../components/SlideImage/Slide'
import RecommendShoes from '../components/RecommendShoes/RecommendShoes'
import Description from '../components/DescriptionShoes'
import { showMessage, hideMessage } from "react-native-flash-message";
import { addCart } from '../api/controller/cart/addToCart'
import auth from "@react-native-firebase/auth"
import { get_LenghtCart_uID } from '../api/controller/cart/getCart'
import { useSelector } from 'react-redux'
import CategogyName from '../components/Category/CategogyName'
import NonAuthentication from '../components/Modal/NonAuthentication'
import Modal from "react-native-modal";

const DetailScreen = ({route}) => {
  
  const item = route.params.item;
  const [modalVisible, setModalVisible] = useState(false);
  const addtocart = () => {
    addCart(data);
      showMessage({
        message: "Success",
        description: `${data?.name} is added to cart.`,
        type: "success",
        backgroundColor: "#5B9EE1", 
        icon: "success",
        style:{ 
          alignItems: 'center',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingVertical: 20,
        },
      });
  }
  const Add_Cart = () => {
    !auth()?.currentUser?.isAnonymous ? 
      addtocart()
    : setModalVisible(true);  
  } 
    const navigation = useNavigation();
    const roles = useSelector((state) => state.auth.role);

    // header card
    const [lenghtCart, setLenghtCart] = useState();
    useLayoutEffect(() => {
      if (roles == false){
        get_LenghtCart_uID(setLenghtCart, auth().currentUser.uid)
      }
    }, [])
     // header card

    useLayoutEffect(() => { 
        navigation.setOptions({ 
          title: 'Detail',
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
          headerRight: () => (
            <View style= {{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() =>{}} 
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    height: heightScreen * 0.0566,
                    width: widthScreen * 0.112,
                    borderRadius: widthScreen * 0.056
                  }}
                >
                    <FontAwesome name="heart-o" size={24} color="black" />
            </TouchableOpacity>
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
                    /> : null}
            </TouchableOpacity>
            </View>
          ),
        }) 
      }, [lenghtCart]);

      const [recommend, setRecommend] = useState();
      const [data, setData] = useState();
      useEffect(() => {
        get_ProductID(setData, item?.id || item?.productid);
        get_Products_categoryID(setRecommend, item?.categoryid);
      }, []) 
      function formatDate(d)
      {
        const date = new Date(d)
        var dd = date.getDate(); 
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear(); 
        if(dd<10){dd='0'+dd} 
        if(mm<10){mm='0'+mm};
        return d = dd+'/'+mm+'/'+yyyy
      }
  return (
    <SafeAreaView edges={['right', 'left', 'top']} style ={{flex:1, backgroundColor: '#F8F9FA',}}>
    <FlatList
      data={[]}
      keyExtractor={(e, i) => 'dom' + i.toString()}
      ListEmptyComponent={null}
      renderItem={null}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <>
          <Slide  item={data?.images} />
          
          <View style={styles.boxInf}>
            <Text numberOfLines={1} style={styles.name}>{data?.name}</Text>
            <Text style={styles.price}>$ {data?.prices}</Text>

            <Description description={data?.info} />
            {/* create  component to reduce performance */}
            <CategogyName categoryid={item?.categoryid} />
            <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: heightScreen * 0.0077}}>
            <Image
                source={require('../assets/images/calendar.png')} 
                style={[styles.icon,{
                  height: heightScreen * 0.04, 
                  width: widthScreen * 0.08,

                }]} 
              />
              <Text style={styles.category}>{formatDate(data?.datecreate)}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: heightScreen * 0.0077}}>
              <Image
                source={require('../assets/images/warehouse.png')} 
                style={[styles.icon,{
                  height: heightScreen * 0.04, 
                  width: widthScreen * 0.08,

                }]} 
              />
              <Text style={styles.category}>Warehouse: {data?.amount}</Text>
            </View>
          </View>

          <View style={{
            backgroundColor: '#fff' ,
            paddingHorizontal: widthScreen * 0.05,
            paddingTop: heightScreen * 0.015,
            paddingBottom: heightScreen * 0.01,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <Text style={styles.recommend}>Recommend Shoes</Text>   
            <Text style={styles.see_all}>See all</Text>
          </View>
          <RecommendShoes recommend={recommend} />

        </>
      )}
    />
      <View style={styles.bottomDetail}>
        <View>
          <Text style={{
            fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
            fontWeight: '500',
            fontSize: 18,
            lineHeight: 20,
            color:'#707B81',
          }}>
            Price
          </Text>
          <Text style ={{
            fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
            fontWeight: '700',
            fontSize: 20,
            lineHeight: 24,
            color: '#1A2530',
            marginTop: heightScreen * 0.01
          }}>
            $ {item.prices}
          </Text>
        </View>
        <View style ={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.buttonAdd} onPress={Add_Cart}>
              <Text style={{
                fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
                fontWeight: '700',
                fontSize: 18,
                lineHeight: 22,
                color: '#FFFFFF',
              }}>Add To Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonBuy} 
              onPress={
                  () => navigation.navigate('Payment', {
                    item : {...data, quantity: 1},
                    isBuyNow : true
                  })
              }
            >
              <Text style={{
                fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
                fontWeight: '700',
                fontSize: 18,
                lineHeight: 22,
                color: '#FFFFFF',
              }}>Buy Now</Text>
            </TouchableOpacity>
      </View>
      </View>
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
      <StatusBar
        animated={true}
        backgroundColor="#F8F9FA"
        barStyle= 'dark-content'
      />
    </SafeAreaView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F8F9FA',
        paddingBottom: 100,
        // borderWidth: 1,
    },
    item: {
      width: widthScreen - 60,
      height: widthScreen - 100,
      // borderWidth:1
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'contain',
    },
    boxInf: {
      flex: 1 ,
      backgroundColor: '#fff',
      // borderWidth:1
      paddingHorizontal: widthScreen * 0.05

    },
    name:{
      fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
      fontWeight: '700',
      fontSize: 24,
      lineHeight: 28,
      color: '#1A2530',

      marginTop: heightScreen * 0.0257,
    },
    price:{
      fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
      fontWeight: '600',
      fontSize: 20,
      lineHeight: 24,
      color: '#1A2530',
      marginVertical: heightScreen * 0.015,
    },
    detail: {
      fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 22,
      color: '#707B81',
      width: '86%',
    },
    category: {
      fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 16,
      color: '#414141',
    },
    icon : {
      marginRight: widthScreen * 0.025,
    }, 
    list:{
      // borderWidth: 1,
      backgroundColor: '#fff',
      paddingHorizontal: widthScreen * 0.05
    },
    recommend: {
      fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
      fontWeight: '700',
      fontSize: 16,
      lineHeight: 24,
      color: '#1A2530',
    },
    see_all:{
        fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
        fontStyle: 'italic',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 24,
        color: '#5B9EE1',
        marginRight: widthScreen * 0.0127,
    },
    bottomDetail:{
      backgroundColor: '#fff', 
        flexDirection: 'row', 
        justifyContent:'space-between',
        paddingHorizontal: widthScreen * 0.05,
        paddingTop : heightScreen * 0.02,
        paddingBottom : heightScreen * 0.032,
        marginTop: 2,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -heightScreen * 0.004,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,

    },
    buttonAdd:{
      backgroundColor: '#5B9EE1',
      paddingHorizontal: widthScreen * 0.04,
      paddingVertical: heightScreen * 0.02,
      borderRadius: 60
    },
    buttonBuy: {
      backgroundColor: '#F87265',
      paddingHorizontal: widthScreen * 0.04,
      paddingVertical: heightScreen * 0.02,
      borderRadius: 60,
      marginLeft: 12
    }
})