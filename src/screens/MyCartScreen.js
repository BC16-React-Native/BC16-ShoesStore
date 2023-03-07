import { FlatList, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { heightScreen, widthScreen } from '../utility'
import Icon from 'react-native-vector-icons/Ionicons';
import ShoesBoxMyCart from '../components/ShoesBoxMyCart';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { get_Cart_price, get_Cart_uID, get_Cart_uID_1 } from '../api/controller/cart/getCart';
import FieldButton from '../components/Auth/FieldButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkout from '../components/Checkout/Checkout';
import auth from '@react-native-firebase/auth'
import Lottie from 'lottie-react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { getCart } from '../redux/action/cart/cartRequest';
import { useDispatch, useSelector } from 'react-redux';
import NonAccount from '../components/NonAccount';

const MyCartScreen = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const calldata = async () => {
        await getCart(dispatch);
    }
    useEffect(() => {
        calldata();
    }, [])
    useLayoutEffect(() => { 
    navigation.setOptions({ 
        title: 'My Cart',
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
   return (
       <SafeAreaView edges={['right', 'left', 'top']} style ={{flex:1, backgroundColor: '#F8F9FA', marginTop: Platform.OS == 'ios'? -heightScreen * 0.03: null}}>   
       { !auth()?.currentUser?.isAnonymous ? 
            cart?.incart?.length > 0 ?
                <>
                    <FlatList
                        data = {cart?.incart}
                        renderItem={({item,index}) => <ShoesBoxMyCart item={item} />}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator = {false}
                        keyExtractor={item =>item.productid}
                        style={{  flex: 1 }}
                    />
                    <Checkout item={cart?.incart} type={'order'}/>
                </>
            : 
            <View style={{flex: 1, alignItems:'center', marginTop: heightScreen * 0.1}}>
                <Lottie 
                    source={require('../utility/cart/nothingCart.json')} 
                    autoPlay 
                    style={{height: heightScreen * 0.40, width: widthScreen * 0.40,}}
                />
                <Text style={styles.title}>Empty Cart</Text>
                <Text numberOfLines={2} style={styles.message}>Looks like you haven't made your choice yet.....</Text>
            </View>
            
            :  <NonAccount /> }

       </SafeAreaView>
   )
}
export default MyCartScreen

const styles = StyleSheet.create({
    title:{
        fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 22,
        color: '#000',
        marginTop: heightScreen * 0.06,
        marginBottom: heightScreen * 0.01,
    },
    message:{
        fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 22,
        color: '#757575',
        width: widthScreen * 0.6,
        textAlign: 'center'
    }
})

