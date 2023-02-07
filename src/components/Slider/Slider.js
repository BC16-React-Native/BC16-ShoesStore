import {Animated, Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Slides from '../../assets/data';
import SlideItem from '../SlideItem/SlideItem';
import Pagination from '../Pagination/Pagination';
import { heightScreen, widthScreen } from '../../utility/index';
import { useNavigation } from '@react-navigation/native';
const Slider = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation()

  const handleGetting = () => {
    navigation.navigate('SignIn')
  }

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
      <TouchableOpacity onPress={handleGetting} style={{height:heightScreen*0.08, width: widthScreen*0.35, backgroundColor: 'red', position: 'absolute', borderRadius:50, justifyContent: 'center', bottom: heightScreen*0.05, right: widthScreen*0.1, backgroundColor:'#5B9EE1'}}>
        <Text style={{alignSelf:'center', color:'white', fontWeight:'bold'}}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});