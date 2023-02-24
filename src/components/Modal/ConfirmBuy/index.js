import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'
import Ionicons from "react-native-vector-icons/Ionicons"

const ConfirmBuy = ({funout}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{alignSelf: 'flex-end', marginBottom: 20}} 
        onPress={() => {funout(); navigation.navigate('BottomTab', {
          screen: 'Home'
        })}} 
      >
        <Ionicons name="close-circle-outline" size={28} color="red" 
          style={{paddingRight: 10, paddingTop: 10}}
        />
      </TouchableOpacity>
      <Lottie 
        source={require('../../../utility/success/success.json')} 
        autoPlay 
        loop ={false}
        style={{height: 100, width: 100, marginBottom: 24}}
      />
      <Text style={styles.message}>Your order Is Successful</Text>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate('BottomTab', {
          screen: 'Home'
        }
      )}}>
        <Text style={styles.buttonText}>Back To Shopping</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ConfirmBuy

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
        borderRadius: 20,
    },
    message: {
      fontFamily: 'SF-Pro',
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
      fontFamily: 'SF-Pro',
      fontWeight: '700',
      fontSize: 18,
      lineHeight: 22,
      color: '#FFFFFF',
    }
})