import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightScreen, widthScreen } from '../../utility'
import Icon from 'react-native-vector-icons/Feather';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import Modal from "react-native-modal";
import FieldButton from '../Auth/FieldButton';
import firestore from '@react-native-firebase/firestore';
import Lottie from 'lottie-react-native';
const ProductManage = ({
    stylesContainer,
    item,
    index,
    image,
    icon,
    stylesIcon,
}) => {
    const date = new Date(item.datecreate)
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const localDateString = date.toLocaleDateString("en-US", options);
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = (id) => {
        // Delete the item from Firestore
        firestore()
          .collection('products')
          .doc(id)
          .delete()
          .then(() => {
            console.log('Item deleted successfully');
            // Remove the item from the state
          })
          .catch((error) => {
            console.log('Error deleting item', error);
          });
      };


    const rightSwipe = () => {
        return(
            <View>
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
                        <FieldButton
                        title={'Yes'}
                        // stylesTitle={{color:"#5B9EE1"}}
                        onPress={()=>
                        {
                            setModalVisible(!modalVisible)
                            handleDelete(item?.id);
                        
                        }}
                        stylesContainer = {{width: widthScreen * 0.3, marginHorizontal: widthScreen * 0.02 , marginTop:heightScreen * 0.63, }}
                        stylesTitle = {{fontSize:18}}
                        />
                        <FieldButton
                        title={'Cancel'}
                        // stylesTitle={{color:"#5B9EE1"}}
                        onPress={()=>setModalVisible(!modalVisible)}
                        stylesContainer = {{width: widthScreen * 0.3, marginHorizontal: widthScreen * 0.02,marginTop:heightScreen * 0.63, borderColor:'#5B9EE1', borderWidth:1,backgroundColor:'#FFFFFF' }}
                        stylesTitle = {{fontSize:18, color:'#5B9EE1'}}
                        />
                        <Lottie 
                        style = {styles.animated}
                        source={require('../../utility/question/question.json')} 
                        autoPlay
                        loop = {false}
                         />
                        <Text style = {styles.textquestion}>Are you sure?</Text>
                </View>
            </Modal>

                    <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
                    <Icon name='trash-2' color={'red'} size={40} style={styles.icondelete}/>
                    </TouchableOpacity>
                    </View>
        )
    }
return (
    <Swipeable 
        renderRightActions={rightSwipe}
    >
    <TouchableOpacity style = {[styles.container, stylesContainer]}
    onPress = {() =>navigation.push('ProductDetail' , {
        // screen: 'Detail',
        // params : {
        //   item: item
        // }
        item: item
      })}
    >
    <View>
    <View style = {[styles.containerv1]}>
        <Text numberOfLines={1} style = {[styles.titleid]}>{item.name}</Text>
        <Text style = {[styles.titletotal]}>${item.prices}</Text>
        <Text style = {[styles.titledate]}>Create: {localDateString}</Text>
    </View>
    <Image
        style= {[styles.icon, stylesIcon]}
        source = {icon}>
    </Image>
    <View style = {[styles.containerv2]}>
        <Image 
        source = {{uri: item.images?.[0]}}
        style = {styles.img} />
    </View>
    <View style = {styles.containerv3}>
    <Text style = {styles.titleamount}>Q:{item.amount}</Text>
    <TouchableOpacity style = {styles.buttonEdit} onPress = {() =>navigation.push('ProductDetail' , {
        // screen: 'Detail',
        // params : {
        //   item: item
        // }
        item: item
      })}>
    <Icon name='edit' size={20} color={'#5B9EE1'} />
    </TouchableOpacity>
    </View>
    </View>
    </TouchableOpacity>
    </Swipeable>
    )
}

export default ProductManage

const styles = StyleSheet.create({
    container:{
        height: heightScreen * 0.14,
        width: widthScreen * 0.9,
        backgroundColor:"#FFFFFF",
        // justifyContent:'space-between',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        alignSelf:'center',
        paddingTop: heightScreen * 0.015,
        borderRadius:16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: heightScreen * 0.001,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    containerv1:{
        position:'absolute',
        marginLeft: widthScreen * 0.31,
        marginTop: heightScreen * 0.002,
        paddingRight: widthScreen * 0.02,
    },
    containerv2:{
        position:'absolute',
        marginLeft: widthScreen * 0.023,
        marginTop: heightScreen * 0.00
    },
    containerv3:{
        position:'absolute',
        marginLeft: widthScreen * 0.75,
        marginTop: heightScreen * 0.035,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleid:{
        fontSize:15,
        fontWeight:'bold',
        marginVertical: heightScreen * 0.004,
        color: '#1A2530'
    },
    titletotal:{
        fontSize:17,
        marginVertical: heightScreen * 0.01,
        fontWeight:'bold',
        color: '#1A2530'
    },
    titledate:{
        fontSize:15,
        marginVertical: heightScreen * 0.004,
        color:'#5B9EE1',
        fontWeight:'bold',
    },
    img:{
        position: 'absolute',
        // height: heightScreen * 0.15,
        // width: widthScreen * 0.2,
        padding: heightScreen * 0.06,
        borderRadius: 10,
        alignItems: 'flex-start',
        transform: [{rotate: '-10deg'}],
    },
    buttonEdit:{
        padding:7,
    },
    icondelete:{
        marginTop: heightScreen * 0.065,
        paddingRight: widthScreen * 0.03
    },
    iconquestion:{
        position:'absolute',
        paddingBottom:heightScreen * 0.15
      },
      textquestion:{
        fontSize: 30,
        position:'absolute',
        paddingTop:heightScreen * 0.09,
        fontWeight:'bold',
      },
      modalcontainer:{
          alignSelf: 'center',
          width: widthScreen * 0.9,
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
          flexDirection: 'row',
          flexWrap: 'wrap',
          elevation: 4,
      },
      animated:{
        position: 'absolute',
        height: heightScreen * 0.3,
        width: widthScreen * 0.3,
        bottom:heightScreen * 0.04
      }
})
