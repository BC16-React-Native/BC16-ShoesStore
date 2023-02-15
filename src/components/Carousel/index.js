import {View, FlatList} from 'react-native';
import React from 'react';
import styles from './style';
// import colors from '../../assets/colors/colors';

const Carousel = ({
  data,
  renderItem,
  snapToInterval,
  viewabilityConfig,
  onViewableItemsChanged,
  activeIndex,
  dotColor,
}) => {
  return (
    <View
      style={{
        margin: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        snapToInterval={snapToInterval}
        snapToAlignment="center"
        horizontal
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View style={styles.dots}>
        {data?.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index == activeIndex ? dotColor : 'black',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default Carousel;