import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Image, FlatList, Animated } from 'react-native'
import React, {useLayoutEffect, useRef, useState} from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useNavigation } from '@react-navigation/native'
import { heightScreen, widthScreen } from '../utility'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel from 'react-native-reanimated-carousel';
import SlideItem from '../components/SlideItem/SlideItem'
import Pagination from '../components/Pagination/Pagination'

// const width = Dimensions.get('window').width;
const DetailScreen = ({route}) => {
  
  const item = route.params.item;
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
  return (
    <SafeAreaView style ={{flex:1, backgroundColor: '#F8F9FA'}}>
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
                      borderWidth: 1,
                  }}
              >
                  <Image source={{
                    uri: item
                  }} style={styles.image} 
                  />

              </View>
          }}
      />
      {/* <FlatList
        data={item}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={item.images} scrollX={scrollX} index={index} /> */}
      <Text>Detail</Text>
    </ScrollView>
    </SafeAreaView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F8F9FA',
        paddingBottom: 100
        // borderWidth: 1,
    },
    image: {
      height: heightScreen * 0.3,
      width: widthScreen * 0.8,
      borderWidth: 1,
      // transform: [{rotate: '-10deg'}],
    },
})