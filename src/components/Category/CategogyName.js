import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { get_Categories_byID } from '../../api/controller/category/getCategories';
import { heightScreen, widthScreen } from '../../utility';

const CategogyName = ({categoryid}) => {
    const [category, setCategory] = useState();
    useEffect(() => {
    get_Categories_byID(categoryid).then((data) => {
        setCategory(data.data());
    });
    }, []) 
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: heightScreen * 0.0077}}>
        <Image
            source={require('../../assets/images/shoes-icon.png')}
            style={[styles.icon,{
                height: heightScreen * 0.04, 
                width: widthScreen * 0.08,
            }]} 
        />
        <Text style={styles.category}>Category: {category?.name}</Text>
    </View>
  )
}

export default React.memo(CategogyName)

const styles = StyleSheet.create({
    category: {
        fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16,
        color: '#414141',
      },
      icon : {
        marginRight: widthScreen * 0.025,
      }, 
})