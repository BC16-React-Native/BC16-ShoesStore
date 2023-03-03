import { StyleSheet, Text, View,TouchableOpacity, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { heightScreen, widthScreen } from '../../utility'
import Lottie from 'lottie-react-native'
import auth from "@react-native-firebase/auth"
import { useDispatch } from 'react-redux'
import { setRole } from '../../redux/features/auth/authSlice'
import Modal from "react-native-modal";
import ConfirmLogout from '../Modal/ConfirmLogout'
import Ionicons from "react-native-vector-icons/Ionicons"


const NonAccount = ({type}) => {
    const dispatch = useDispatch();
    
    const pressLogout = () => setTimeout(() => {
        auth()
        .signOut()
        .then(() => {
            console.log('User signed out!');
            dispatch(setRole(null));
        });
    }, 400);
    const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{flex: 1, alignItems:'center', marginTop: heightScreen * 0.1}}>
        <Lottie 
            source={type == 'profile' ?
                require('../../utility/nonauthen/auth-profile.json') : 
                require('../../utility/nonauthen/auth-error.json')
            } 
            autoPlay 
            loop={false}
            style={{height: heightScreen * 0.40, width: widthScreen * 0.40}}
        />
        <Text style={styles.title}>Who are you?</Text>
        <Text numberOfLines={1} style={styles.message}>Please Login/Sign In to use Feature.....</Text>
        <TouchableOpacity style={styles.button} onPress={() => {setModalVisible(true)}} >
            <Text style={styles.textButton}>Let's Login</Text>
        </TouchableOpacity>
        <Modal
            testID={'modal'}
            isVisible={modalVisible}
            onSwipeComplete={() => {
                setModalVisible(false); 
            }}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={styles.view}
        >
            <StatusBar
                animated={true}
                barStyle = {modalVisible ? 'dark-content' : 'dark-content'}
                backgroundColor  = '#4b4b4b'
            />
            {/* <ConfirmLogout funClose={() => {setModalVisible(false)}} /> */}
            <View style={styles.container}>
                <TouchableOpacity style={{alignSelf: 'flex-end',}} 
                    onPress={() => {setModalVisible(false); }} 
                >
                    <Ionicons name="close-circle-outline" size={28} color="red" 
                    style={{paddingRight: 10, paddingTop: 10}}
                    />
                </TouchableOpacity>
                <Lottie 
                    source={require('../../utility/nonauthen/auth-error1.json')} 
                    autoPlay 
                    style={{height: heightScreen * 0.25, width: widthScreen * 0.20}}
                />
                <Text style={styles.title}>Are You Sure?</Text>
                <Text numberOfLines={2} style={styles.message}>You will lose all order data if you continue...</Text>
                <TouchableOpacity style={styles.button} onPress={() => { setModalVisible(false);pressLogout()}}>
                    <Text style={styles.textButton}>Continue Logout</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    </View>
  )
}   

export default NonAccount

const styles = StyleSheet.create({
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
        textAlign: 'center'
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
    },
    container: {
        alignItems:'center',  
        backgroundColor: '#fff',
        borderRadius: 30
     },
})