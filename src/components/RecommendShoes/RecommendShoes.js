import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ShoesBox from '../ShoesItem/ShoesBox'
import { widthScreen } from '../../utility'

const RecommendShoes = ({recommend}) => {
    // console.log('recommend')
  return (
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
  )
}

export default React.memo(RecommendShoes);

const styles = StyleSheet.create({
    list:{
        // borderWidth: 1,
        backgroundColor: '#fff',
        paddingHorizontal: widthScreen * 0.05
      },
})