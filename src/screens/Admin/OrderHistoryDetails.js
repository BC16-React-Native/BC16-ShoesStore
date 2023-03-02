import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { heightScreen, widthScreen } from '../../utility'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import ShoesBoxOrder from '../../components/ShoesBoxOrder';
import firestore from '@react-native-firebase/firestore'


const OrderHistoryDetails = ({
  route,
}) => {
  const getUser = async () => {
    const currentUser = await firestore()
    .collection('users')
    .doc(items?.userid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        setData(documentSnapshot.data());
      }
    })
  }
  const items = route.params.item;
  const type = route.params.type;
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [item, settype] = useState(route.params.item);
  const [total, setTotal] = useState();
  const date = new Date(item?.datedone)
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const localDateString = date.toLocaleDateString("en-US", options);
  useEffect(() => {
    getUser();
    setTotal(items?.total + 9)
  },[])

  useLayoutEffect(() => { 
    navigation.setOptions({ 
        title: 'Order Detail',
        headerLeft : () => (    
            <TouchableOpacity onPress={() => navigation.goBack()} 
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                height: heightScreen * 0.0566,
                width: widthScreen * 0.112,
                borderRadius: widthScreen * 0.056
            }}
            >
                <FontAwesome name="angle-left" size={24} color="black" />
            </TouchableOpacity>
        ), 
    }) 
  }, []);

  return (
    <SafeAreaView style = {styles.container}>
    <View style={{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingHorizontal: heightScreen * 0.02,
        marginVertical: heightScreen * 0.01,
    }}>
    <View style = {styles.containerinfo}>
      <Text style ={styles.titleid}>ORDER ID: {(items.id).slice(-6)}</Text>
      <Text style ={styles.titleadd}>Address: {items.address}</Text>
    </View>
    { type == 'admin'?
      <View style = {[styles.titlestatus, { backgroundColor: '#34A202'}]}>
        <Text style = {[styles.titlestatuss, { color: '#FFFFFF'}]}>Delivered</Text>
      </View>
      :<></>
    }
    </View>
    <View style = {styles.containerlist}>
      <FlatList
      data={items?.productsid}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index}) => <ShoesBoxOrder
        stylesContainer = {{marginVertical:heightScreen *0.02}}
        item = {item}
        index = {index}
      />}
      keyExtractor={item => item.id}
      />



    </View>
    <View style = {styles.containeraction}>
      <View style = {styles.containername}>
        <Text style = {styles.textinfo}>Name: </Text>
        <Text style = {styles.textname}>{data?.name} </Text>
      </View>
      <View style = {styles.containername}>
        <Text style = {styles.textinfo}>Phone Number: </Text>
        <Text style = {styles.textname}>{items.phone} </Text>
      </View>
      <View style = {styles.containername}>
        <Text style = {styles.textship}>Shipping: </Text>
        <Text style = {styles.textname}>$9.00 </Text>
      </View>
      <View style = {styles.containername1}/>
      <View style = {styles.containername}>
        <Text style = {styles.textinfo}>Total: </Text>
        <Text style = {styles.texttotal}>${total} </Text>
      </View>
      <View style = {styles.containerdot}/>
      <View style = {styles.containername}>
        <Text style = {styles.textinfo}>Date Done: </Text>
        <Text style = {styles.texttotal}>{localDateString} </Text>
      </View>
    </View>
    </SafeAreaView>
  )
}

export default OrderHistoryDetails

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
  },
  containerHeader: {
    height : heightScreen * 0.07,
    width: widthScreen,
    flexDirection: 'row'
  },
  containerinfo:{
  },
  titleid:{
    fontSize:10,
    color:'#5B9EE1',
    marginVertical: heightScreen * 0.01,
  },
  titleadd:{
    fontSize: 15,
    fontWeight: 'bold'
  },
  titlestatus:{
    height: heightScreen * 0.05,
    width: widthScreen * 0.25,
    borderRadius: 20
  },
  titlestatuss:{
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight:40
  },
  textProfile:{
    fontSize: 16,
    // marginTop: heightScreen * 0.02,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#1A2530'
  },
  buttonBack: {
    width: widthScreen * 0.14,
    height: heightScreen * 0.067,
    backgroundColor: 'white',
    borderRadius: 40,
    marginLeft: widthScreen * 0.05,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  iconBack:{
    alignSelf: 'center'
  },
  containerlist:{
    height: heightScreen * 0.47,
    width: widthScreen * 0.9,
    alignSelf : 'center'
  },
  containeraction:{
    height: heightScreen * 0.35,
    width: widthScreen,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  textinfo:{
    flex:1,
    marginVertical: heightScreen * 0.008,
    fontSize: 16,
    color: '#707B81',
    fontWeight: 'bold',
    paddingLeft: widthScreen * 0.05
  },
  containername:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  textname:{
    flex: 1,
    textAlign: 'right',
    paddingRight: widthScreen * 0.05,
    marginVertical: heightScreen * 0.008,
    fontSize: 18,
    fontWeight: '600',
  },
  textship:{
    marginVertical: heightScreen * 0.008,
    fontSize: 16,
    color: '#707B81',
    fontWeight: 'bold',
    paddingLeft: widthScreen * 0.05
  },
  containername1:{
    height:1,
    width: widthScreen * 0.9,
    borderWidth: 0.8, 
    borderColor: 'gray', 
    borderStyle: 'dashed',
    marginTop: heightScreen * 0.01,
    alignSelf: 'center'
  },
  containerdot:{
    height:1,
    width: widthScreen * 0.9,
    borderWidth: 0.8, 
    borderColor: 'gray', 
    borderStyle: 'dashed',
    alignSelf: 'center'
  },
  texttotal:{
    flex: 1,
    textAlign: 'right',
    paddingRight: widthScreen * 0.05,
    marginVertical: heightScreen * 0.02,
    fontSize: 20,
    fontWeight: '600',
  },
  swipe:{
    height: heightScreen * 0.12,
    backgroundColor:'#FFFFFF',
    alignItems: 'center',
  },
  iconquestion:{
    paddingBottom:heightScreen * 0.15
  },
  textquestion:{
    fontSize: 20,
    marginVertical:heightScreen * 0.02,
    fontWeight:'bold',
    textAlign:'center',
  },
  modalcontainer:{
      alignSelf: 'center',
      paddingHorizontal: widthScreen * 0.15,
      height: heightScreen * 0.4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#F8F9FA',
      borderRadius: 30,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: heightScreen * 0.001,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      flexDirection: 'column',
      flexWrap: 'wrap',
      elevation: 4,
  },
  animated:{
    height: heightScreen * 0.15,
    width: widthScreen * 0.3,
  }

})