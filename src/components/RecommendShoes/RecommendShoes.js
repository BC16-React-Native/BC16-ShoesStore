import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ShoesBox from '../ShoesItem/ShoesBox'
import { widthScreen } from '../../utility'
import { get_unFavorite_userID } from '../../api/controller/favorite/getFavorite'
import { useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'

const RecommendShoes = ({recommend}) => {
  const [unFav, setUnFav] = useState([]);
  const roles = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (roles == false){
        get_unFavorite_userID(setUnFav, auth().currentUser.uid);
    }
  }, [])
  const handleFavo = (proid) => {
        return !unFav.includes(proid);
    }
  return (
    <FlatList
            data={recommend}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={
                ({item, index}) => 
                <View style={{ marginRight: widthScreen * 0.02}}>
                    <ShoesBox item={item} isnoFav={handleFavo(item?.id)}/>
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