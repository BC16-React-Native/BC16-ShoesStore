import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ShoesBox from './ShoesBox'
import { heightScreen, widthScreen } from '../../utility'
const data = [
    {
        id: 'adasdasdsa',
        amount: 200, 
        categoryid: "sbdDEx1GggkLnXfeyWyh",
        datecreate: "2023-02-03T04:25:34.828Z",
        images: [
            "https://res.cloudinary.com/dgec4r7wz/image/upload/v1675926361/Image/af-1_rs4erd.png",
            "productimgs/abd2.jpeg",
            "productimgs/abd3.jpeg",
            "productimgs/abd4.jpeg",
            "productimgs/abd5.jpeg"
        ],
        info: "Designed for those who aren't afraid to express themselves, this legendary AF-1 is all about making a statement. A crisp leather upper and era-echoing '80s construction give these sneakers a classic feel while vibrant gradient colours add nothing-but-net style. Of course, we kept the Nike Air units underfoot to help keep every step you take comfortable. Are you ready to get creative with your look?",
        name: "Nike Air Force 1 '07",
        price:398
    },
    {
        id: 'adasdasdsadsaa',
        amount: 200, 
        categoryid: "sbdDEx1GggkLnXfeyWyh",
        datecreate: "2023-02-03T04:25:34.828Z",
        images: [
            "https://res.cloudinary.com/dgec4r7wz/image/upload/v1675926361/Image/nikeAF1_jqhrp7.png",
            "productimgs/abd2.jpeg",
            "productimgs/abd3.jpeg",
            "productimgs/abd4.jpeg",
            "productimgs/abd5.jpeg"
        ],
        info: "Exaggerated, double overlays make the Nike AF-1 Shadow double the fun. The bold, playful design has reflective-design details and a comfy foam midsole.",
        name: "Nike AF-1 Shadow",
        price:399
    },
    {
        id: 'adasdasdsvtgynjta',
        amount: 200, 
        categoryid: "sbdDEx1GggkLnXfeyWyh",
        datecreate: "2023-02-03T04:25:34.828Z",
        images: [
            "https://res.cloudinary.com/dgec4r7wz/image/upload/v1675927560/Image/nike-air-force-1_kqqk6u.png",
            "productimgs/abd2.jpeg",
            "productimgs/abd3.jpeg",
            "productimgs/abd4.jpeg",
            "productimgs/abd5.jpeg"
        ],
        info: "Celebrating 40 years of pushing sport and fashion boundaries, this commemorative AF-1 mixes elements from beloved launches to highlight the timeless design's place in sneaker history. Gold accents, a debossed *40* on the heel and an honorary tongue label are just a few of the embellishments inviting you to the party. Completing the look, crisp leather in bold colours delivers a grand finale. Happy anniversary!",
        name: "Nike Air Force 1 '07 SE",
        price: 329
    },
]
const ListShoes = () => {
  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
            marginHorizontal: widthScreen * 0.04,
            marginVertical: heightScreen * 0.015,
        }}
        >
            <Text style={styles.title}>Popular Shoes</Text>
            <TouchableOpacity>
                <Text style={styles.see_all}>See all</Text> 
            </TouchableOpacity>
        </View>

        {/* <View style={styles.list}>
            <ShoesBox />
            <ShoesBox />
            <ShoesBox />
        </View> */}
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={
                ({item, index}) => 
                    <ShoesBox item={item}/>
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
        fontWeight: 'bold',
    },
    see_all : {
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 13,
        lineHeight: 16,
        color: '#5B9EE1',
        marginRight: widthScreen * 0.0127,
    }
})