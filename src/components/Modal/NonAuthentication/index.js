import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightScreen, widthScreen } from '../../../utility'
import Lottie from 'lottie-react-native'
import auth from "@react-native-firebase/auth"
import { useDispatch } from 'react-redux'
import { setRole } from '../../../redux/features/auth/authSlice'
import Ionicons from "react-native-vector-icons/Ionicons"

const NonAuthentication = ({funClose}) => {
  const dispatch = useDispatch();

  const pressLogout = () => {
    auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
      dispatch(setRole(null));
  });
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
    <Text style={styles.title}>Who are you?</Text>
    <Text numberOfLines={1} style={styles.message}>Please Login/Sign In to use Feature.....</Text>
    {/* <TouchableOpacity style={styles.button} onPress={() => {pressLogout()}}>
        <Text style={styles.textButton}>Let's Login</Text>
    </TouchableOpacity> */}
</View>
  )
}

export default NonAuthentication

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
    color: '#757575',
    width: widthScreen,
    textAlign: 'center',
    marginBottom: heightScreen * 0.04

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