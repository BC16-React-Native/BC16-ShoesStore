import {Animated, Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Slides from '../../assets/data';
import SlideItem from '../SlideItem/SlideItem';
import Pagination from '../Pagination/Pagination';
import { heightScreen, widthScreen } from '../../utinity/index';

const Slider = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      <FlatList
        data={Slides}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Slides} scrollX={scrollX} index={index} />
      <TouchableOpacity style={{height:heightScreen*0.08, width: widthScreen*0.35, position: 'absolute', borderRadius:50, justifyContent: 'center', bottom: heightScreen*0.05, right: widthScreen*0.05, backgroundColor:'#5B9EE1'}}>
        <Text style={{alignSelf:'center', color:'white', fontWeight:'bold', fontSize:20}}>Get Started</Text>
      </TouchableOpacity>
      <View style={{height:heightScreen*0.015, width: widthScreen*0.032, position: 'absolute', backgroundColor: '#5B9EE1', borderRadius: 45, top: heightScreen*0.5, left: widthScreen*0.05}}></View>
      <View style={{height:heightScreen*0.015, width: widthScreen*0.032, position: 'absolute', backgroundColor: '#5B9EE1', borderRadius: 45, top: heightScreen*0.4, right: widthScreen*0.1}}></View>
      <View style={{height:heightScreen*0.015, width: widthScreen*0.032, position: 'absolute', backgroundColor: '#5B9EE1', borderRadius: 45, top: heightScreen*0.1, left: widthScreen*0.2}}></View>    
      <View style={styles.circle}/>
      <View style={styles.circleSon} />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  circle:{
    width: 288,
    height: 288,
    borderRadius: 288/2,
    position: 'absolute',
    backgroundColor: '#5B9EE1',
    top: heightScreen*-0.2,
    right: widthScreen*-0.35,
  },
  circleSon:{
    width: 250,
    height: 250,
    borderRadius: 250/2,
    position: 'absolute',
    backgroundColor: 'white',
    top: heightScreen*-0.2,
    right: widthScreen*-0.35,
  }
});