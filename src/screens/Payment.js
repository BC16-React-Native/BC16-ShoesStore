import { StyleSheet, Text, View, TouchableOpacity, ScreenView, Platform } from 'react-native'
import React,{useEffect, useLayoutEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import { heightScreen, widthScreen } from '../utility';
import { SafeAreaView } from 'react-native-safe-area-context';
import Contact from '../components/Contact';
import Address from '../components/Address';
import { get_User_byID } from '../api/controller/users/getRoles';
import Checkout from '../components/Checkout/Checkout';
import ShoesBoxMyCart from '../components/ShoesBoxMyCart';
import ShoesPayment from '../components/ShoesPayment.js';
import { ScrollView } from 'react-native';
import { StatusBar } from 'react-native';

const Payment = ({route}) => {
    const item = route.params.item;
    const [user, setUser] = useState();
    const [phone, setPhone] = React.useState(user?.phone);
    const [address, setAddress] = React.useState(user?.address);
    const getUser = async () => {
        const result = await get_User_byID();
        setUser(result);
    }
    useEffect(() => {
        getUser();
    }, [])
    useEffect(() => {
        setPhone(user?.phone);
        setAddress(user?.address);
    }, [user])
    // console.log(isBuyNow);
    const navigation = useNavigation();
    useLayoutEffect(() => { 
        navigation.setOptions({ 
          title: 'Payment',
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

    const isBuyNow = route.params.isBuyNow;
    const [quantity, setQuantity] = useState(1);
  return (
    <SafeAreaView style ={{flex:1, backgroundColor: '#F8F9FA', justifyContent: 'space-between'}}>
        <ScrollView>
            <View style={{ 
            }}>
                    {isBuyNow ? 
                        <ShoesPayment 
                            item={item} 
                            key={item.productid} 
                            type={'payment'}
                            quantity={quantity}
                            setQuantity={setQuantity}
                        /> 
                    : 
                        <View style={{marginBottom: 8}}>
                            {item?.map((item, index) => (
                                <ShoesBoxMyCart 
                                    item={item} 
                                    key={item.productid} 
                                    type={'payment'}
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                />
                            ))}
                        </View>
                        // null
                    }
            </View>
        <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 16, borderRadius: 16, marginHorizontal: 20,}}>
            <View style={{marginBottom : 12}}>
                <Text style={{
                    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
                    fontWeight: '700', 
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#1A2530',
                    marginBottom: 16
                }}>Contact Information</Text>

                <Contact type={'mail'} email = {user?.email}/>
                <Contact type={'phone'} phone={phone} setPhone={setPhone}/>
            </View>
            <View style={{marginBottom : 12}}>
                <Text style={{
                    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
                    fontWeight: '700',
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#1A2530',
                    marginBottom: 16
                }}>Address</Text>
                <Address address={address} setAddress={setAddress}/>
            </View>
            <View style={{marginBottom : 12}}>
                <Text style={{
                    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
                    fontWeight: '700',
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#1A2530',
                    marginBottom: 16
                }}>Payment Method</Text>
                <Text style={{
                    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
                    fontWeight: '500',
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#707B81',
                }}>Payment on delivery</Text>
            </View>
        </View>
        </ScrollView>    
        <View style={{alignSelf: 'flex-end', width: '100%'}}>
            {isBuyNow ? 
                <Checkout 
                    item={{...item, quantity: quantity}} 
                    type={'payment'} 
                    address={address}
                    phone={phone}
                    isBuyNow={isBuyNow}
                />
            :   <Checkout 
                    item={item} 
                    type={'payment'}
                    address={address}
                    phone={phone}
                    isBuyNow={isBuyNow}
                /> 
            }
        </View>
    </SafeAreaView>
  )
}

export default Payment 

const styles = StyleSheet.create({
    image:{
        height: 60,
        width: 60,
        backgroundColor: '#d7d7d7',
        borderRadius: 12
    },
    nameProduct: {
        fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 20,
        color: '#1A2530',
        flex: 1
    },
    priceProduct: {
        fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        color: '#1A2530',
        // flex: 1
    }
})