import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Carousel, {ParallaxImage, Pagination } from 'react-native-new-snap-carousel';
import { widthScreen } from '../../utility';
import RenderSlide from './RenderSlide';

const Slide = ({ item }) => {
    const isCarousel = React.useRef(null);
    const [index, setIndex] = React.useState(0);
    if (item) {
    return (<>
            <Carousel
                ref={isCarousel}
                sliderWidth={widthScreen}
                // sliderHeight={widthScreen}
                itemWidth={widthScreen - 60}
                data={item}
                renderItem={({item, index} , parallaxProps) => {
                    return <RenderSlide item={item} parallaxProps={parallaxProps} />
                }}
                hasParallaxImages={true}
                // swipeThreshold={5}
                loop={true}
                // autoplay
                lockScrollWhileSnapping={true}
                useScrollView={true}
                onBeforeSnapToItem={(index) => setIndex(index)}
            />
            <Pagination
                dotsLength={item?.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: '#5B9EE1'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
                containerStyle={{
                    marginVertical: -20,
                    top: 0
                }}
            />         
        </>
    );
} else {return null}
};
export default React.memo(Slide);