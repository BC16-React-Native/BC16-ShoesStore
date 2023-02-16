import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightScreen, widthScreen } from '../utility'
import Icon from 'react-native-vector-icons/Ionicons';
import ShoesBoxMyCart from '../components/ShoesBoxMyCart';
import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth"

const MyCartScreen = () => {
    // const {usid} = route.params
    const [pro, setPro] = useState()
    useEffect(() => {
        get_Favorite_userID(setPro, auth().currentUser.uid);
    }, [])
    const navigation = useNavigation()
    const subTotal = (list) =>{
        let subtotal = 0;
        for (let i = 0; i < list?.length; i++) {
            subtotal += list[i]?.prices * list[i]?.quantity;
        }
        
        return subtotal;
    }
    console.log(subTotal(pro));
    return (
        <View style={styles.containerHeader} onTouchStart = {console.log('em')}>
            <Text style={styles.textSearch}>My Cart</Text>
            <TouchableOpacity onPress={() => navigation.navigate('BottomTab')} style={styles.buttonBack}>
                <Icon name='chevron-back-outline' color={'black'} size={30} style={styles.iconBack} />
            </TouchableOpacity>
            <FlatList
                data = {pro}
                renderItem={({item,index}) => <ShoesBoxMyCart item={item} />}
                // numColumns={2}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator = {false}
                keyExtractor={item =>item.id}
                style={{ marginTop: heightScreen * 0.1 }}
            />
        <View style={styles.view_checkout}>
            <View style={{flexDirection:'row', width: widthScreen*0.9, justifyContent: 'space-between', alignSelf: 'center', marginVertical: heightScreen*0.02}}>
                <Text style={{color: '#707B81', fontSize: 16}}>Subtotal</Text>
                <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold',}}>$ {subprice}</Text>
            </View>
            <View style={{flexDirection:'row', width: widthScreen*0.9, justifyContent: 'space-between', alignSelf: 'center', marginBottom: heightScreen*0.01}}>
                <Text style={{color: '#707B81', fontSize: 16}}>Shipping</Text>
                <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold',}}>$ 10</Text>
            </View>
            <View style={{borderWidth: 0.5, width: widthScreen, borderColor: '#707B81'}} />
            <View style={{flexDirection:'row', width: widthScreen*0.9, justifyContent: 'space-between', alignSelf: 'center', marginVertical: heightScreen*0.02}}>
                <Text style={{color: 'black', fontSize: 16}}>Total</Text>
                <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold',}}>$ 20</Text>
            </View>
            <FieldButton
                stylesContainer={{}}
                title={'Checkout'}
                onPress={() => console.log('tinh tien')}
                />
        </View>
        </View>
    )
}

export default MyCartScreen

const styles = StyleSheet.create({
    containerHeader: {
        width: widthScreen,
        alignSelf: 'center',
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
})

