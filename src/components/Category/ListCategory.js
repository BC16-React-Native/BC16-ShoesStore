import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState , useLayoutEffect} from 'react'
import Category from './Category'
import { heightScreen, widthScreen } from '../../utility'
import { get_Categories, get_Categories_handle_all } from '../../api/controller/category/getCategories'
import { get_RolesAdmin } from '../../api/controller/users/getRoles'

const ListCategory = ({setCategory}) => {
  const [data, setData] = useState();
  useEffect(() => {
    get_Categories_handle_all(setData);
  }, []);
  const [focus_index, setFocus_index] = useState(0);
  return (
    <View style ={[styles.container,]}>
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
              setCategory={setCategory}
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
    marginLeft: widthScreen * 0.05, 
  }
})