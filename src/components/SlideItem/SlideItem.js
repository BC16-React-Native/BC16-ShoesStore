import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import React from 'react';

import { heightScreen, widthScreen } from '../../utility/index';
const SlideItem = ({item}) => {
  const translateYImage = new Animated.Value(40);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={item?.img}
        resizeMode="contain"
        
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateYImage,
                // translateX: new Animated.Value(30)
              },
            ],
          },
        ]}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.description}>{item?.description}</Text>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width: widthScreen,
    height: heightScreen,
    alignItems: 'center',
  },
  image: {
    flex: 0.55,
    width: '100%',
    transform: [{rotate: '90deg'}]
  },
  content: {
    width: widthScreen*0.9,
    flex: 0.4,
  },
  title: {
    fontSize: 43,
    fontWeight: 'bold',
    color: '#1A2530',
  },
  description: {
    fontSize: 23,
    marginVertical: 12,
    color: '#707B81',
  },
});