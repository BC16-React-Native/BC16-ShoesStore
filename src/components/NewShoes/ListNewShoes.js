import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import NewShoes from './NewShoes'
import { heightScreen, widthScreen } from '../../utility'
import { get_Products_new } from '../../api/controller/products/getProducts'
import { get_day_between_2day } from '../../api/helper'

const ListNewShoes = ({category}) => {
    const [data, setData] = useState();
    useEffect(() => {
        get_Products_new(category)
            .onSnapshot(
                querySnapshot => {
                    allEntries = [];
                    querySnapshot.forEach(doc => {
                        const now = new Date();
                        const datecreate = new Date(doc.data().datecreate);
                        const day_dist = get_day_between_2day(datecreate, now);

                        day_dist < 7 ?  allEntries.push({...doc.data(), id: doc.id}) : null;
                    });
                    setData(allEntries);
                },
                error => {
                    console.log(error)
                }
            )
    }, [category])
  return (
    <View style={styles.container}>
        
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
        marginVertical: heightScreen * 0.015,
    }}
    >
        <Text style={styles.title}>New Arrivals</Text>
        <TouchableOpacity>
            <Text style={styles.see_all}>See all</Text> 
        </TouchableOpacity>
    </View>
    <View style={styles.list}>
        {data?.map((item, index) => (
            <NewShoes 
                item={item} 
                key={item.id} 
            />
        ))}
    </View>
</View>
  )
}

export default ListNewShoes

const styles = StyleSheet.create({
    list:{
        marginVertical: heightScreen * 0.01,
    },
    container: {
        marginHorizontal: widthScreen * 0.05,
    },
    title:{
        color: '#000',
        fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
        fontSize: 18,
        fontWeight: '700',
    },
    see_all : {
        fontFamily: 'SF-Pro',
        fontStyle: 'italic',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 16,
        color: '#5B9EE1',
        marginRight: widthScreen * 0.0127,
    }
})