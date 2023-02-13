import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Image, FlatList, Animated } from 'react-native'
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useNavigation } from '@react-navigation/native'
import { heightScreen, widthScreen } from '../utility'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel from 'react-native-reanimated-carousel';
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { get_Categories_byID } from '../api/controller/category/getCategories'
import { get_Products_categoryID, get_Products_new } from '../api/controller/products/getProducts'
import ShoesBox from '../components/ShoesItem/ShoesBox'

const DetailScreen = ({route}) => {
  
  const item = route.params.item;
  console.log(item);
    const navigation = useNavigation();
    useLayoutEffect(() => { 
        navigation.setOptions({ 
          title: item?.name,
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
          headerRight: () => (
            <TouchableOpacity onPress={() =>{}} 
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    height: heightScreen * 0.0566,
                    width: widthScreen * 0.112,
                    borderRadius: widthScreen * 0.056
                  }}
                >
                    <FontAwesome name="heart-o" size={24} color="black" />
            </TouchableOpacity>
          ),
        }) 
      }, []);

      const [view_Detail, setView_Detail] = useState(false);

      const [category, setCategory] = useState();
      const [recommend, setRecommend] = useState();
      useEffect(() => {
        get_Categories_byID(item?.categoryid).then((data) => {
          setCategory(data.data());
        });
        get_Products_categoryID(setRecommend, item?.categoryid);
      }, []) 
      // console.log(`Categories:`, category);
      function formatDate(d)
      {
        const date = new Date(d)
        var dd = date.getDate(); 
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear(); 
        if(dd<10){dd='0'+dd} 
        if(mm<10){mm='0'+mm};
        return d = dd+'-'+mm+'-'+yyyy
      }
  return (
    <SafeAreaView style ={{flex:1, backgroundColor: '#F8F9FA',}}>
    <ScrollView style={styles.container}
      
    >
      <StatusBar
        animated={true}
        backgroundColor="#F8F9FA"
        barStyle= 'dark-content'
      />
      <Carousel
          loop
          width={widthScreen}
          height={widthScreen / 2}
          autoPlayInterval={1500}
          // autoPlay={true}
          pagingEnabled ={true}
          data={item?.images}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({item, index }) => {
              return <View
                  style={{
                      flex: 1,
                      // borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // borderWidth: 1,
                  }}
              >
                  <Image source={{
                    uri: item
                  }} style={styles.image} 
                  resizeMode="contain"
                  />

              </View>
          }}
      />
      <View style={styles.boxInf}>
        <Text style={styles.name}>{item?.name}</Text>
        <Text style={styles.price}>$ {item?.prices}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text numberOfLines = {view_Detail? null : 3} style={styles.detail}>
            {item?.info}
          </Text>
          <Text
            onPress={() => setView_Detail(!view_Detail)}
            style={{
              alignSelf: 'flex-end',      
              lineHeight: 22,
              color:"#5B9EE1"
            }}
          >
                {view_Detail ? "Hide" : "Show"}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: heightScreen * 0.0077}}>
          <Image
            source={require('../assets/images/shoes-icon.png')} 
            style={[styles.icon,{
              height: heightScreen * 0.04, 
              width: widthScreen * 0.08,

            }]} 
          />
          <Text style={styles.category}>Category: {category?.name}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: heightScreen * 0.0077}}>
        <Image
            source={require('../assets/images/calendar.png')} 
            style={[styles.icon,{
              height: heightScreen * 0.04, 
              width: widthScreen * 0.08,

            }]} 
          />
          <Text style={styles.category}>{formatDate(item?.datecreate)}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: heightScreen * 0.0077}}>
          <Image
            source={require('../assets/images/warehouse.png')} 
            style={[styles.icon,{
              height: heightScreen * 0.04, 
              width: widthScreen * 0.08,

            }]} 
          />
          <Text style={styles.category}>Warehouse: {item?.amount}</Text>
        </View>
      </View>

      <View style={{
        backgroundColor: '#fff' ,
        paddingHorizontal: widthScreen * 0.05,
        paddingTop: heightScreen * 0.015,
        paddingBottom: heightScreen * 0.01,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text style={styles.recommend}>Recommend Shoes</Text>   
        <Text style={styles.see_all}>See all</Text>
      </View>
      <FlatList
        data={recommend}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={
            ({item, index}) => 
            <View style={{ marginRight: widthScreen * 0.02}}>
                <ShoesBox item={item}/>
            </View>
        }
        keyExtractor={item => item.id}
        style={styles.list}
        numColumns={2}
        nestedScrollEnabled 
      /> 
    </ScrollView>
    </SafeAreaView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F8F9FA',
        paddingBottom: 100,
        // borderWidth: 1,
    },
    image: {
      alignSelf: 'center',
      height:'100%', 
      width:'100%',
      // transform: [{rotate: '-10deg'}],
    },
    boxInf: {
      flex: 1 ,
      backgroundColor: '#fff',
      // borderWidth:1
      paddingHorizontal: widthScreen * 0.05

    },
    name:{
      fontFamily: 'SF-Pro',
      fontWeight: '700',
      fontSize: 24,
      lineHeight: 28,
      color: '#1A2530',

      marginTop: heightScreen * 0.0257,
    },
    price:{
      fontFamily: 'SF-Pro',
      fontWeight: '600',
      fontSize: 20,
      lineHeight: 24,
      color: '#1A2530',
      marginVertical: heightScreen * 0.015,
    },
    detail: {
      fontfamily: 'SF-Pro',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 22,
      color: '#707B81',
      width: '86%',
    },
    category: {
      fontfamily: 'SF-Pro',
      fontWeight: '400',
      fontSize: 14,
      lineheight: 16,
      color: '#414141',
    },
    icon : {
      marginRight: widthScreen * 0.025,
    }, 
    list:{
      // borderWidth: 1,
      backgroundColor: '#fff',
      paddingHorizontal: widthScreen * 0.05
    },
    recommend: {
      fontFamily: 'SF-Pro',
      fontWeight: '700',
      fontSize: 16,
      lineHeight: 24,
      color: '#1A2530',
    },
    see_all:{
        fontFamily: 'SF-Pro',
        fontStyle: 'italic',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 24,
        color: '#5B9EE1',
        marginRight: widthScreen * 0.0127,
    }
})