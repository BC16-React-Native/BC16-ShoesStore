import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightScreen, widthScreen } from '../../../utility'
import Lottie from 'lottie-react-native'
import auth from "@react-native-firebase/auth"
import { useDispatch } from 'react-redux'
import { setRole } from '../../../redux/features/auth/authSlice'
import Ionicons from "react-native-vector-icons/Ionicons"

const ConfirmLogout = ({funClose}) => {
  const dispatch = useDispatch();

  const pressLogout = () => {
    funClose();
    auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
      dispatch(setRole(null));
  });
  // console.log('User signed out!');
}
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{alignSelf: 'flex-end',}} 
        onPress={() => {funClose()}} 
      >
        <Ionicons name="close-circle-outline" size={28} color="red" 
          style={{paddingRight: 10, paddingTop: 10}}
        />
      </TouchableOpacity>
    <Lottie 
        source={require('../../../utility/nonauthen/auth-error1.json')} 
        autoPlay 
        style={{height: heightScreen * 0.25, width: widthScreen * 0.20}}
    />
    <Text style={styles.title}>Are You Sure?</Text>
    <Text numberOfLines={2} style={styles.message}>You will lose all order data if you continue...</Text>
    <TouchableOpacity style={styles.button} onPress={() => {pressLogout()}}>
        <Text style={styles.textButton}>Continue Logout</Text>
    </TouchableOpacity>
</View>
  )
}

export default ConfirmLogout

const styles = StyleSheet.create({
  container: {
     alignItems:'center',  
     backgroundColor: '#fff',
     borderRadius: 30
  },
  title:{
    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    color: '#fd0013',
    marginTop: heightScreen * 0.06,
    marginBottom: heightScreen * 0.01,
},
message:{
    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    color: '#F87265',
    width: widthScreen*0.7,
    textAlign: 'center',
    // marginBottom: heightScreen * 0.04

},
button: {
    backgroundColor: '#5B9EE1',
    paddingHorizontal: widthScreen * 0.15,
    paddingVertical: heightScreen * 0.02,
    borderRadius: 24,
    marginVertical: heightScreen * 0.04
},
textButton: {
    color: '#FFFFFF',
    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
}
})