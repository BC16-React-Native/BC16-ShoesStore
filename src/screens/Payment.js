import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React,{useEffect, useLayoutEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import { heightScreen, widthScreen } from '../utility';
import { SafeAreaView } from 'react-native-safe-area-context';
import Contact from '../components/Contact';
import Address from '../components/Address';
import { get_User_byID } from '../api/controller/users/getRoles';

const Payment = ({route}) => {
    const item = route.params.item;
    const [user, setUser] = useState();
    const getUser = async () => {
        const result = await get_User_byID();
        setUser(result);
    }
    useEffect(() => {
        getUser();
    }, [])
    console.log(item);
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
  return (
    <SafeAreaView style ={{flex:1, backgroundColor: '#F8F9FA', paddingHorizontal: 20}}>

        <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 16, borderRadius: 16}}>
            <View>
                {item?.map((item, index) => (
                    <View style={{
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        backgroundColor: '#F8F9FA',
                        borderRadius: 12,
                        marginVertical: 4
                    }}>
                        <Image
                            source={{uri: item?.images[0]}} 
                            style={styles.image}
                        />
                        <View style={{marginLeft: 12, justifyContent: 'space-between', flex: 1}}>
                            <Text numberOfLines={1} style={styles.nameProduct}>{item?.name}</Text>
                            <Text style={styles.priceProduct}>$ {item?.prices}</Text>
                        </View>
                        <Text style={{alignSelf: 'flex-end', padding: 8}}>x1</Text>   
                    </View>
                ))}
            </View>
            <View style={{marginBottom : 12}}>
                <Text style={{
                    fontFamily: 'SF-Pro',
                    fontWeight: '700',
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#1A2530',
                    marginBottom: 16
                }}>Contact Information</Text>

                <Contact type={'mail'} email = {user?.email}/>
                <Contact type={'phone'} phone = {user?.phone}/>
            </View>
            <View style={{marginBottom : 12}}>
                <Text style={{
                    fontFamily: 'SF-Pro',
                    fontWeight: '700',
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#1A2530',
                    marginBottom: 16
                }}>Address</Text>
                <Address />
            </View>
            <View style={{marginBottom : 12}}>
                <Text style={{
                    fontFamily: 'SF-Pro',
                    fontWeight: '700',
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#1A2530',
                    marginBottom: 16
                }}>Payment Method</Text>
                <Text style={{
                    fontFamily: 'SF-Pro',
                    fontWeight: '500',
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#707B81',
                }}>Payment on delivery</Text>
            </View>
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
        fontFamily: 'SF-Pro',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 20,
        color: '#1A2530',
        flex: 1
    },
    priceProduct: {
        fontFamily: 'SF-Pro',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        color: '#1A2530',
        // flex: 1
    }
})