import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {heightScreen, widthScreen} from '../../utility';
import {MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import { get_ProductID } from '../../api/controller/products/getProducts';
const OrderCart = ({
  item,
  nextNavigator = 'OrderHistoryDetails',
}) => {
  const date = new Date(item?.datecreate);
  const navigation = useNavigation();
  const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
  const localDateString = date.toLocaleDateString('en-US', options);
  const [data, setData] = useState();
  // console.log(item?.productsid[0].productid);
  useEffect(() =>{
    get_ProductID(setData, item?.productsid[0].productid);
  },[])
  // console.log(data);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push(nextNavigator, {
          item: item,
          type: 'user',
        })
      }
      style={[styles.container]}>
      <View style={[styles.containerv2]}>
        {item && data ? (
          <Image
            style={[styles.img]}
            source={{
              uri: data?.images[0],
            }}
          />
        ) : null}
      </View>
      <View style={[styles.containerv1]}>
        <Text style={[styles.titleId]}>ORDER ID: {(item?.id).slice(-6)}</Text>
        <Text style={[styles.titleTotal]}>${item?.total}</Text>
        <Text style={[styles.titleDate,{
          color: item?.status == 'pending' ? '#ffca3b' : 'green',
        }]}>Order on: {localDateString}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCart;

const styles = StyleSheet.create({
  container: {
    marginVertical: heightScreen * 0.01,
    width: widthScreen * 0.9,
    paddingVertical: heightScreen * 0.015,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  containerv1: {
    paddingLeft: widthScreen * 0.1,
  },
  containerv2: {
    marginLeft: widthScreen * 0.03,
    alighItems: 'center',
    justifyContent: 'center',
  },
  titleId: {
    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
    fontSize: 15,
    color: '#5B9EE1',
    fontWeight: 'bold',
  },
  titleitem: {
    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
    fontSize: 16,
  },
  titleTotal: {
    fontSize: 18,
    marginVertical: heightScreen * 0.01,
    fontWeight: 'bold',
  },
  titleDate: {
    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
    fontSize: 15,
    fontWeight: 'bold',
  },
  img: {
    height: heightScreen * 0.1,
    width: widthScreen * 0.3,
    transform: [{rotate: '-10deg'}],
  },
});
