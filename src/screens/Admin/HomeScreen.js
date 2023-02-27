import { ScrollView, StyleSheet, Text, View, StatusBar, FlatList, Image, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import OrderCart from '../../components/Admin/OrderCart'
import MaterialCommunityIcons from'react-native-vector-icons/MaterialCommunityIcons'
import  { heightScreen, widthScreen } from '../../utility'
import { getOrder_status_delivery_pending} from '../../api/controller/orders/getOrders'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const HomeScreen = () => {

  const [data, setData] = useState();
  const [datauser, setDatauser] = useState();

  const getUser = async() => {
    const currentUser = await firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        setDatauser(documentSnapshot.data());
      }
    })
  }

  useEffect(() => {
    getOrder_status_delivery_pending(setData);
    getUser();
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {datauser ? 
                <Image
                    style={[styles.avt]}
                    source={{
                        uri: datauser?.image
                    }}
                />
            : null
            }
        <View style={{marginLeft: widthScreen * 0.03}}>
          <Text style = {styles.titletxt}>Hey,  
          <MaterialCommunityIcons  
            name = 'hand-wave'
            size = {20}
            color = '#ffca3b'
            />
          </Text>
          <Text style = {styles.titletxt1}>
            {datauser?.name}
          </Text>
        </View>
      </View>
      {/* <OrderCart stylesContainer = {{marginVertical:heightScreen *0.02}}
      />
      <OrderCart stylesContainer = {{marginVertical:heightScreen *0.02}}
      />
      <OrderCart stylesContainer = {{marginVertical:heightScreen *0.02}}
      /> */}
    <FlatList
      style={styles.containerfl} 
      // contentContainerStyle={styles.listContainer}
      data={data}
      // horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index}) => <OrderCart
        stylesContainer = {{marginVertical:heightScreen *0.02}}
        item = {item}
        index = {index}
      />}
      keyExtractor={item => item.id}
    />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height: heightScreen,
    width: widthScreen,
    backgroundColor: '#F8F9FA',
    marginBottom: heightScreen * 0.09
  },
  avt: {
    width: 60,
    height: 60,
    marginTop: heightScreen * 0.01,
    marginVertical: heightScreen * 0.03,
    borderRadius: 60/ 2,
    alignSelf: 'flex-start',
    marginLeft: widthScreen * 0.08
  },
  titletxt:{
    
    // marginTop: heightScreen * 0.08,
    // marginLeft: widthScreen * 0.32,
    fontSize: 16,
  },
  titletxt1:{
    
    // marginTop: heightScreen * 0.11,
    // marginLeft: widthScreen * 0.32,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B9EE1',
  },
  containerfl:{
    // backgroundColor: 'red'
  }
})