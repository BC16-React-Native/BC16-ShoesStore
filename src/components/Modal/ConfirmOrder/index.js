import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'
import Ionicons from "react-native-vector-icons/Ionicons"
import { heightScreen } from '../../../utility'

const ConfirmOrder = ({}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Lottie 
        source={require('../../../utility/success/success.json')} 
        autoPlay 
        loop ={false}
        style={{height: 100, width: 100, marginBottom: 24}}
      />
      <Text style={styles.message}>Your order Is Successful</Text>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate('BottomTabAdmin', {
          screen: 'Home'
        }
      )}}>
        <Text style={styles.buttonText}>Back To Shopping</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ConfirmOrder

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: heightScreen * 0.001,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      
        elevation: 4,
    },
    message: {
      fontFamily: Platform.OS !== 'ios' ?'SF-Pro': null,
      fontWeight: '500',
      fontSize: 20,
      lineHeight: 28,
      color: '#5B9EE1',
      marginBottom: 30
    },
    button:{
      paddingHorizontal: 32,
      paddingVertical: 16,
      backgroundColor: '#5B9EE1',
      borderRadius: 30,
    },
    buttonText: {
      fontFamily: Platform.OS !== 'ios' ?'SF-Pro': null,
      fontWeight: '700',
      fontSize: 18,
      lineHeight: 22,
      color: '#FFFFFF',
    }
})