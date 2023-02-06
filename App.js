import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import React, { useEffect, useState } from 'react';
import { get_AllProducts, get_AllProducts_limit, get_ProductID, get_Products_categoryID, get_Products_new } from './src/api/controller/products/getProducts';
import { addProduct } from './src/api/controller/products/addProduct';
import { deleteProduct } from './src/api/controller/products/deleteProduct';
import { updateProduct } from './src/api/controller/products/updateProduct';
import { getOrder_status_delivery_pending, get_AllOrder, get_OrderID, get_Order_userID } from './src/api/controller/orders/getOrders';

const App = () => {
  const [data, setData] = useState();
  // const getProductsAPi = async () => {
  //   // const result = await getJobs(dispatch);
  //   const result = await get_AllProducts();
  //   setData(result);
  // }
  useEffect(() => {
    Platform.OS === 'ios'? null: SplashScreen.hide();
  }, [])

  useEffect(() => {
    getOrder_status_delivery_pending(setData);

  }, []);
  // console.log(get_AllProducts())
  return (
    <View>
      <Text>App</Text>
      <FlatList data={data} 
        renderItem={({item}) => <Text>{item.address}</Text>}
        key={item => item.id}/>
        {/* <Text>{data?.address}</Text> */}
      {/* <Button title='ADD' onPress={() => {addProduct({
        
          amount: 100,
          info: "Made by NIKE",
          prices: 500,
          categoryid: "sbdDEx1GggkLnXfeyWyh",
          images: [
              { image: "productimgs/abd.jpeg" },
              { image: "productimgs/abd.jpeg" },
              { image: "productimgs/abd.jpeg" },
              { image: "productimgs/abd.jpeg" },
              { image: "productimgs/abd.jpeg" }
          ],
          name: "Jordan Smith 3",
          datecreate: "2023-02-06T04:25:34.828Z"
      
      })}} />
      <Button title='DELETE' onPress={() => {deleteProduct('gyS0Rhy6FaiW6MMNwYBH')}} />
      <Button title='UPDATE' onPress={() => {updateProduct({name : 'STAN SHOES'},'W6yuAxlFwYV4oqKZV7VK')}} /> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
