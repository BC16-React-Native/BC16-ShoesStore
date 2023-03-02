
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import ShoesBox from './ShoesBox'
import { heightScreen, widthScreen } from '../../utility'
import { get_Categories_handle_all } from '../../api/controller/category/getCategories'
import { get_AllProducts_limit } from '../../api/controller/products/getProducts'
import { getallProducts_id, get_unFavorite_userID } from '../../api/controller/favorite/getFavorite'
import auth from '@react-native-firebase/auth'
import { useSelector } from 'react-redux'

const ListShoes = ({category}) => {
    const [data, setData] = useState();
    const [unFav, setUnFav] = useState([]);
    const roles = useSelector((state) => state.auth.role);
    useEffect(() => {
        get_AllProducts_limit(category)
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        newEntities.push({ ...doc.data(), id: doc.id })
                    });
                    setData(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
        if (roles == false){
            get_unFavorite_userID(setUnFav, auth().currentUser.uid);    
          }

    }, [category])
    const handleFavo = (proid) => {
        return !unFav.includes(proid);
    }
  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
            marginHorizontal: widthScreen * 0.05,
            marginVertical: heightScreen * 0.015,
        }}
        >
            <Text style={styles.title}>Popular Shoes</Text>
            <TouchableOpacity>
                <Text style={styles.see_all}>See all</Text> 
            </TouchableOpacity>
        </View>
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={
                ({item, index}) => 
                    <ShoesBox item={item} isnoFav={handleFavo(item?.id)}/>
            }
            keyExtractor={item => item.id}
            style={styles.list}
        />
    </View>
  )
}

export default ListShoes

const styles = StyleSheet.create({
    list:{
        flexDirection: 'row',
        marginLeft: widthScreen * 0.05,
        
    },
    container: {

    },
    title:{
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
    },
    see_all : {
        fontStyle: 'italic',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 16,
        color: '#5B9EE1',
        marginRight: widthScreen * 0.0127,
    }
})