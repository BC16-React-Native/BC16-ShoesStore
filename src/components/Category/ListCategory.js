import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from './Category'
import { heightScreen, widthScreen } from '../../utility'
import { get_Categories, get_Categories_handle_all } from '../../api/controller/category/getCategories'

const ListCategory = () => {
  const [data, setData] = useState();
  useEffect(() => {
    get_Categories_handle_all(setData);
  }, []);

  const [focus_index, setFocus_index] = useState(1);
  return (
    <View style ={[styles.container,{ flexDirection: 'row',}]}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={
            ({item, index}) => 
            <Category 
              item={item} 
              index={index} 
              focus_index={focus_index}
              setFocus_index={setFocus_index}
            />
          }
          keyExtractor={item => item.id}
          style={{}}
        />
        {/* not working at here B/c width is const */}
    </View>
  )
}

export default ListCategory

const styles = StyleSheet.create({
  container:{
    marginLeft: widthScreen * 0.04, 
  }
})