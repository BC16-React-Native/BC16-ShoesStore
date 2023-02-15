import React from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native'
import { widthScreen } from '../../utility';
import Carousel, {ParallaxImage, Pagination } from 'react-native-new-snap-carousel';

const RenderSilde = ({item, index, parallaxProps}) => {
    return (
        <View style={styles.item}>
            <ParallaxImage
                source={{ uri: item }}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}
                {...parallaxProps}
            />
            {/* <Image source={{ uri: item }} style={styles.image}/> */}
            {/* <Text>{item}</Text> */}
        </View>
    );
}
export default RenderSilde

const styles = StyleSheet.create({
    item: {
        width: widthScreen - 60,
        height: widthScreen - 100,
        // alignItems: 'center',
        // justifyContent: 'center',
        // borderWidth:1
    },
        imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
    },
});