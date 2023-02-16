import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightScreen, widthScreen } from '../utility'
import Icon from 'react-native-vector-icons/Ionicons';
import { get_ProductID } from '../api/controller/products/getProducts';
import ShoesBoxMyCart from '../components/ShoesBoxMyCart';
import { get_Favorite_userID } from '../api/controller/favorite/getFavorite';
import { useNavigation } from '@react-navigation/native';

const MyCartScreen = ({route}) => {
    const {usid} = route.params
    const [pro, setPro] = useState()
    useEffect(() => {
        get_Favorite_userID(setPro, usid);
    }, [])
    const navigation = useNavigation()
    return (
        <View style={styles.containerHeader} onTouchStart = {console.log('em')}>
            <Text style={styles.textSearch}>My Cart</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Favorite', {usid:'TDCr8OBS2zUVcc5ZEXN7'})} style={styles.buttonBack}>
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