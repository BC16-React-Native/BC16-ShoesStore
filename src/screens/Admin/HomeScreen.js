import { ScrollView, StyleSheet, Text, View, StatusBar, FlatList, Image, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import OrderCart from '../../components/Admin/OrderCart'
import MaterialCommunityIcons from'react-native-vector-icons/MaterialCommunityIcons'
import  { heightScreen, widthScreen } from '../../utility'
import { getOrder_status_delivery_pending, getOrder_status_pending, getOrder_status_delivering} from '../../api/controller/orders/getOrders'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
const HomeScreen = () => {

  const [data, setData] = useState();
  const [datauser, setDatauser] = useState();
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const hideMenu = () => {
    setVisible(false)
    setSelectedItem("all");
    getOrder_status_delivery_pending(setData);
  };

  const showMenu = () => setVisible(true);
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
  const getPending = () => {
    setVisible(false);
    setSelectedItem("pending");
    getOrder_status_pending(setData)
  }
  const getDelivering = () => {
    setVisible(false);
    setSelectedItem("delivering");
    getOrder_status_delivering(setData)
  }
  useEffect(() => {
    getOrder_status_delivery_pending(setData);
    getUser();
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingHorizontal: heightScreen * 0.035,
        marginVertical: heightScreen * 0.01
        }}>
        {datauser ? 
                <Image
                    style={[styles.avt]}
                    source={{
                        uri: datauser?.image
                    }}
                />
            : null
            }
        <View style = {styles.title}>
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
      <Menu
        animationDuration= {300}
        visible={visible}
        anchor={<TouchableOpacity onPress={showMenu} style = {styles.filter}>
          <MaterialCommunityIcons  
              name = 'filter'
              size = {20}
              color = {selectedItem  == 'delivering'?'#5B9EE1': selectedItem == 'pending'? '#f37737': 'black'}
          />
        </TouchableOpacity>}
        onRequestClose={hideMenu}
        style = {styles.filtermenu}
      >
        <MenuItem 
        style = {{backgroundColor:'#f37737', borderTopLeftRadius:15, borderTopRightRadius:15}}
        textStyle = {{alignSelf: 'center',fontWeight:'bold', color: 'white'}}
        onPress={getPending}>Pending</MenuItem>
        <MenuDivider color = '#5B9EE1'/>
        <MenuItem 
        style = {{backgroundColor:'#5B9EE1', borderBottomLeftRadius:15, borderBottomRightRadius:15}}
        textStyle = {{alignSelf: 'center', fontWeight:'bold', color: 'white'}}
        onPress={getDelivering}>Delivering</MenuItem>
      </Menu>
      </View>
    <FlatList
      data={data}
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
    width: 40,
    height: 40,
    borderRadius: 60/ 2,
    alignSelf: 'flex-start',
  },
  titletxt:{
    fontSize: 16,
  },
  titletxt1:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B9EE1',
  },
  filter:{
    height: heightScreen * 0.05,
    width: heightScreen * 0.05,
    borderRadius: 20,
    backgroundColor:'#FFFFFF',
    alignItems: 'center',
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
  title:{
    marginRight: heightScreen * 0.15
  },
  filtermenu:{
    marginTop: heightScreen * 0.06,
    borderRadius: 15,
    marginHorizontal: 20,
    backgroundColor: "#F8F9FA",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  
    elevation: 4,
  }
})