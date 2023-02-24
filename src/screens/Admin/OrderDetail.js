import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightScreen, widthScreen } from '../../utility'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import ShoesBoxOrder from '../../components/ShoesBoxOrder';
import firestore from '@react-native-firebase/firestore'
import SwipeButton from 'rn-swipe-button';
import Modal from 'react-native-modal'
import FieldButton from '../../components/Auth/FieldButton';
import AnimatedLottieView from 'lottie-react-native';


const OrderDetail = ({route}) => {

  const items = route.params.item;
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [item, setItems] = useState(route.params.item);
  const [total, setTotal] = useState();
  const [swipe, setSwipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  let forceResetLastButton = null;
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


  const handleSwipeOrder = () => {
      item?.status
  }

  useEffect(() => {
    getUser();
    setTotal(items?.total + 9)
  },[])

  const ButtonSwipe = () => {
    return(
        <View style={{width: widthScreen, height: heightScreen * 0.07, backgroundColor: '#5BE19E', borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
            <MaterialCommunityIcons name = "chevron-triple-right" size = {40}/>
        </View>
    );
  } 
  const Header = () => {
    return(
        <View style={styles.containerHeader}>
          <TouchableOpacity onPress={()=>navigation.navigate('BottomTabAdmin')} style={styles.buttonBack}>
            <Icon name='chevron-back-outline' color={'black'} size={30} style={styles.iconBack}/>
          </TouchableOpacity> 
          <Text style={styles.textProfile}>Order Detail</Text>
        </View>
    )
    }

  return (
    <SafeAreaView style = {styles.container}>
    <Header/>
    <View style = {styles.containerinfo}>
      <Text style ={styles.titleid}>ORDER ID: {(items.id).slice(-6)}</Text>
      <Text style ={styles.titleadd}>Address: {items.address}</Text>
    </View>
    <View style = {[styles.titlestatus, { backgroundColor: items?.status == 'pending' ? '#ffca3b': '#5B9EE1'}]}>
      <Text style = {[styles.titlestatuss, { backgroundColor: items?.status == 'pending' ? '#0000': '#FFFFFF'}]}>Pending</Text>
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
      keyExtractor={items => items.id}
      />
      <Modal
      animationIn={'fadeInLeftBig'}
      animationOut={'fadeOutRightBig'}
      transparent={true}
      isVisible={modalVisible}
      onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
          }}
      >
        <View style={styles.modalcontainer}>
            <AnimatedLottieView 
            style = {styles.animated}
            source={require('../../utility/success/success.json')} 
            autoPlay
            loop = {false}
              />
            <Text style = {styles.textquestion}>Your order has been delivered sussessfully</Text>
            <FieldButton
            title={'Back To Home'}
            // stylesTitle={{color:"#5B9EE1"}}
            onPress={()=>
            {
                setModalVisible(!modalVisible)
                navigation.navigate('BottomTabAdmin', {
                screen: 'Home'
                })
            
            }}
            stylesContainer = {{width: widthScreen * 0.6}}
            stylesTitle = {{fontSize:18}}
            />
        </View>
      </Modal>



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
    </View>
    <View style = {styles.swipe}>
        <SwipeButton
            containerStyles = {{height: heightScreen * 0.07,width: widthScreen * 0.9, borderRadius: 15, borderWidth:0}}
            onSwipeSuccess={() => {setModalVisible(!modalVisible)}}
            enableRightToLeftSwipe
            railBackgroundColor="#5B9EE1"
            // forceReset={ reset => {
            //   forceResetLastButton = reset
            // }}
            thumbIconWidth={heightScreen * 0.074}
            disabledRailBackgroundColor
            thumbIconBackgroundColor="#FFFFFF"
            shouldResetAfterSuccess={true}
            resetAfterSuccessAnimDelay= {1000}
            title={!swipe? "Swipe to delivering": 'Swipe to complete'}
            thumbIconComponent = {ButtonSwipe}
            thumbIconStyles={{borderRadius: 15, borderWidth:0}}
            railStyles={{borderRadius: 15, height: heightScreen * 0.065, borderWidth:0, backgroundColor: '#F0BF4C',}}
            height= {heightScreen * 0.07}
            titleStyles = {{fontWeight:'bold', paddingLeft:widthScreen * 0.1}}
            
          />
            {/* <SwipeButton
            containerStyles = {{height: heightScreen * 0.07,width: widthScreen * 0.9, borderRadius: 15, borderWidth:0}}
            b
            onSwipeSuccess={() => {}}
            enableRightToLeftSwipe
            forceReset={ reset => {
              forceResetLastButton = reset
            }}
            railBackgroundColor="#5B9EE1"
            thumbIconWidth={heightScreen * 0.074}
            disabledRailBackgroundColor
            thumbIconBackgroundColor="#FFFFFF"
            title="Swipe to complete"
            thumbIconComponent = {ButtonSwipe}
            thumbIconStyles={{borderRadius: 15, borderWidth:0}}
            railStyles={{borderRadius: 15, height: heightScreen * 0.065, borderWidth:0, backgroundColor: '#F0BF4C',}}
            height= {heightScreen * 0.07}
            titleStyles = {{fontWeight:'bold', paddingLeft:widthScreen * 0.1}}
            
          /> */}

    </View>
    </SafeAreaView>
  )
}

export default OrderDetail

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  containerHeader: {
    height : heightScreen * 0.07,
    width: widthScreen,
  },
  containerinfo:{
    height : heightScreen * 0.1,
    width: widthScreen,
    paddingLeft: heightScreen * 0.02
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
    position: 'absolute',
    height: heightScreen * 0.05,
    width: widthScreen * 0.25,
    marginLeft: widthScreen * 0.7,
    marginTop: heightScreen * 0.13,
    alighItems:'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  titlestatuss:{
    fontWeight: 'bold',
    // alighSelf: 'center',
    paddingLeft: widthScreen * 0.055
  },
  textProfile:{
    position: 'absolute',
    fontSize: 16,
    marginTop: heightScreen * 0.02,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#1A2530'
  },
  buttonBack: {
    position: 'absolute',
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
    height: heightScreen * 0.2,
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
    fontWeight: 600,
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
  texttotal:{
    flex: 1,
    textAlign: 'right',
    paddingRight: widthScreen * 0.05,
    marginVertical: heightScreen * 0.02,
    fontSize: 20,
    fontWeight: 600,
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
    // width: widthScreen * 0.6,
  },
  modalcontainer:{
      alignSelf: 'center',
      // width: widthScreen * 0.9,
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