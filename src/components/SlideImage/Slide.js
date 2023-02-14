import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Carousel, {ParallaxImage, Pagination } from 'react-native-new-snap-carousel';
import { widthScreen } from '../../utility';
import RenderSlide from './RenderSlide';

const Slide = ({ carouselRef, selectedItems, setActiveSlide}) => {
    console.log("render"); // <== This will render only when props change (ie. the ref - which should not change, or you pass fresh data - in which case you want it to re-render)
    return (
        // <Carousel
        //     initialNumToRender={selectedItems.length}
        //     maxToRenderPerBatch={5}
        //     ref={carouselRef}
        //     swipeThreshold={5}
        //     itemWidth={widthScreen - 60}
        //     data={selectedItems} // <== selectedItems could be passed in as prop, or from app state
        //     sliderWidth={widthScreen}
        //     enableMomentum={false}
        //     lockScrollWhileSnapping
        //     loop
        //     renderItem={RenderSlide}
        //     onSnapToItem={(index) => setActiveSlide(index)}
        // />
        <Carousel
            ref={carouselRef}
            sliderWidth={widthScreen}
            // sliderHeight={widthScreen}
            itemWidth={widthScreen - 60}
            data={selectedItems}
            renderItem={RenderSlide}
            hasParallaxImages={true}
            swipeThreshold={5}
            loop={true}
            // autoplay
            lockScrollWhileSnapping={true}
            useScrollView={true}
            // onBeforeSnapToItem={(index) => setActiveSlide(index)}
        />
    );
  };
export default React.memo(Slide);