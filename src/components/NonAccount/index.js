import { StyleSheet, Text, View,TouchableOpacity, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { heightScreen, widthScreen } from '../../utility'
import Lottie from 'lottie-react-native'
import auth from "@react-native-firebase/auth"
import { useDispatch } from 'react-redux'
import { setRole } from '../../redux/features/auth/authSlice'
import Modal from "react-native-modal";
import ConfirmLogout from '../Modal/ConfirmLogout'

const NonAccount = ({type}) => {
    const dispatch = useDispatch();
    const pressLogout = () => {
        auth()
        .signOut()
        .then(() => {
            console.log('User signed out!');
            dispatch(setRole(null));
        });
    }
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
            <ConfirmLogout funClose={() => {setModalVisible(false)}} />
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
    }
})