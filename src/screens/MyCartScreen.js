import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightScreen, widthScreen } from '../utility'
import Icon from 'react-native-vector-icons/Ionicons';
import ShoesBoxMyCart from '../components/ShoesBoxMyCart';
import { useNavigation } from '@react-navigation/native';
import { get_Cart_price, get_Cart_uID } from '../api/controller/cart/getCart';
import FieldButton from '../components/Auth/FieldButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkout from '../components/Checkout/Checkout';


const MyCartScreen = () => {
    const [pro, setPro] = useState();

    useEffect(() => {
        get_Cart_uID(setPro,'Xohk7XAjDEWAt8bxxPwGCqp8ebI2');
    }, [])
    console.log(pro);
    const navigation = useNavigation()
    return (
        <SafeAreaView style ={{flex:1, backgroundColor: '#F8F9FA',}}>         
            <ScrollView>
                <View style={{flex: 2}}>
                    <Text style={styles.textSearch}>MyCart</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('BottomTab')} style={styles.buttonBack}>
                        <Icon name='chevron-back-outline' color={'black'} size={30} style={styles.iconBack} />
                    </TouchableOpacity>
                    <FlatList
                        data = {pro}
                        renderItem={({item,index}) => <ShoesBoxMyCart item={item} />}
                        // numColumns={2}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator = {false}
                        keyExtractor={item =>item.productid}
                        style={{ marginTop: heightScreen * 0.1 }}
                    />
                </View>
            </ScrollView>
            <Checkout item={pro}/>
        </SafeAreaView>
    )
}


export default MyCartScreen


const styles = StyleSheet.create({
    containerHeader: {
        width: widthScreen,
        alignSelf: 'center',
        flex: 1,
    },
    buttonBack: {
        position: 'absolute',
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
    view_checkout:{
        shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: heightScreen * 0.004,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
    width: widthScreen, 
    height: heightScreen*0.3, 
    backgroundColor: 'white', 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    top: heightScreen*0.7, 
    position: 'absolute'
    }
})



