import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import NewShoes from './NewShoes'
import { heightScreen, widthScreen } from '../../utility'

const data = [
    {
        id: 'adasdasdsa',
        amount: 200, 
        categoryid: "sbdDEx1GggkLnXfeyWyh",
        datecreate: "2023-02-03T04:25:34.828Z",
        images: [
            "https://res.cloudinary.com/dgec4r7wz/image/upload/v1675928242/Image/nike-air-force-2_mnfal2.png",
            "productimgs/abd2.jpeg",
            "productimgs/abd3.jpeg",
            "productimgs/abd4.jpeg",
            "productimgs/abd5.jpeg"
        ],
        info: "Our members are one of a kind and your shoes are, too. Each pair is proudly made one at a time, by hand. Good things are worth the wait.",
        name: "Nike Air Force 1 Mid By You",
        price:398
    },
    {
        id: 'adasdasdsadsaa',
        amount: 200, 
        categoryid: "sbdDEx1GggkLnXfeyWyh",
        datecreate: "2023-02-03T04:25:34.828Z",
        images: [
            "https://res.cloudinary.com/dgec4r7wz/image/upload/v1675928906/Image/air-max-alpha-trainer-5_fy36v2.png",
            "productimgs/abd2.jpeg",
            "productimgs/abd3.jpeg",
            "productimgs/abd4.jpeg",
            "productimgs/abd5.jpeg"
        ],
        info: "Elevate your style in the Nike Court Legacy Lift. Whether you're strolling through campus or simply running errands around town, its platform midsole adds a bold statement to a classic, easy-to-wear design. Plus, suede details and exposed foam on the tongue give these kicks a retro feel.",
        name: "Nike Air Max Alpha Trainer 5",
        price:399
    },
    {
        id: 'adasdasdsvtgynjta',
        amount: 200,  
        categoryid: "sbdDEx1GggkLnXfeyWyh",
        datecreate: "2023-02-03T04:25:34.828Z",
        images: [
            "https://res.cloudinary.com/dgec4r7wz/image/upload/v1675928906/Image/court-legacy-lift-shoes_yvmlyy.png",
            "productimgs/abd2.jpeg",
            "productimgs/abd3.jpeg",
            "productimgs/abd4.jpeg",
            "productimgs/abd5.jpeg"
        ],
        info: "Finish your last rep with power and rack it with a roar that stuns the gym floor in the Nike Air Max Alpha Trainer 5. Max Air cushioning offers comfortable stability for lifting whether it's a light or heavy day. A wide, flat base gives you enhanced stability and grip for all kinds of tough workouts without sacrificing style, as you roam from station to station and set to set.",
        name: "Nike Air Max Alpha Trainer 5 Nike Court Legacy Lift",
        price: 329
    },
]

const ListNewShoes = () => {
  return (
    <View style={styles.container}>
        
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
        marginHorizontal: widthScreen * 0.04,
        marginVertical: heightScreen * 0.015,
    }}
    >
        <Text style={styles.title}>New Arrivals</Text>
        <TouchableOpacity>
            <Text style={styles.see_all}>See all</Text> 
        </TouchableOpacity>
    </View>

    {/* <View style={styles.list}>
        <NewShoes />
        <NewShoes />
        <NewShoes />
    </View> */}
    <FlatList
        data={data}
        // horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={
            ({item, index}) => 
                <NewShoes item={item}/>
        }
        keyExtractor={item => item.id}
        style={styles.list}
    />
</View>
  )
}

export default ListNewShoes

const styles = StyleSheet.create({
    list:{
        // marginLeft: widthScreen * 0.03,
        marginVertical: heightScreen * 0.01,
    },
    container: {
        marginHorizontal: widthScreen * 0.05,
    },
    title:{
        color: '#000',
        fontFamily: 'SF-Pro',
        fontSize: 18,
        fontWeight: 'bold',
    },
    see_all : {
        fontFamily: 'SF Pro',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 13,
        lineHeight: 16,
        color: '#5B9EE1',
        marginRight: widthScreen * 0.0127,
    }
})