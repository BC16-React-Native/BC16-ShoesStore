import { View, Text, SafeAreaView, KeyboardAvoidingView, Animated, Keyboard,Alert, StyleSheet, ScrollView} from 'react-native'
import React, { useEffect, useRef, useState,useLayoutEffect } from 'react'
import FieldTextInput from '../components/FieldTextInput'
import FieldButton from '../components/FieldButton'
// import Ionicons from "react-native-vector-icons/Ionicons"
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';
import { heightScreen, widthScreen, ORANGE_DARK, BLUE_DARK } from '../utility'
import { useNavigation } from '@react-navigation/native'
import { registerUser } from '../api/controller/users/registerUser'

const Login = () => {
    const headerMotion = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    // function handle animation 
    const animatedKeyBoard = (motion, value, duration) => {
        Animated.timing(
            motion,
            {
                toValue:value,
                duration: duration,
                speed: Platform.OS == 'ios'? 60 : 50,
                useNativeDriver:false
                
            }
        ).start();
    }
    // hanlde to avoid view when showing key board
    useEffect(()=> {
        const SHOW_KEYBOARD_EVENT = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
        const HIDE_KEYBOARD_EVENT = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
        const showSubscription = Keyboard.addListener(SHOW_KEYBOARD_EVENT,() =>{
            animatedKeyBoard(headerMotion, heightScreen * -0.27, 400);

        })
        const hideSubscription = Keyboard.addListener(HIDE_KEYBOARD_EVENT, () => {
            animatedKeyBoard(headerMotion, 0, 400);
        })
        return () => {
            showSubscription.remove()
            hideSubscription.remove();
        }
    },[]);

    const Header = () => {
        return(
            <Animated.View style = {[styles.containerHeader, {marginTop: headerMotion}]}>
                <Text style= {[styles.title, {color:"black", fontWeight:"bold",}]}>Create Account</Text>
                <Text style= {[styles.title, {fontSize:16, fontWeight:'300', color:"black", marginVertical:heightScreen * 0.005}]}>Let's Create Account Together!</Text>
            </Animated.View>
        )
    }

    const Body = () => {
        // variable dataLogin
        const [name, setName] = useState('');
        const [username, setUsername] = useState('');
        const [phone, setPhone] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [repass, setRepassword] = useState('');
        // handle entry data login
        // handle login
        // handle register
        const pressRegister = () => {
            if(password == repass){
              auth()
                .createUserWithEmailAndPassword(email, password)
                .then(userCredentials => {
                    const user = userCredentials.user;
                    Alert.alert(
                        "Successfully",
                        "You have successfully registered! Let's shopping now!",
                        [
                          { text: "OK", onPress: () => console.log('Registered with:', user.email) }
                        ]
                      );
                    registerUser(name, username, phone, email, password);
                }
                )
                .catch(error => Alert.alert("Failed",error.message))
              }
              else{
                Alert.alert(
                  "Failed",
                  "Password and Confirm Password not match!",
                  [
                    { text: "Try again", onPress: () => console.log('Account Registration Failed! ') }
                  ]
                );
              }
            }
        // handle forgot password 
        const pressSignIn = () => {
            navigation.navigate("SignIn");
        }
        return (
            <View style={styles.containerBody}>
                {/* Text input Name*/}
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.015}}
                title={'Your Name'}
                placeholder={'Type your name'}
                onChangeText={(name) => setName(name)}
                onSubmitEditing={Keyboard.dismiss}
                // error = {'Input valid name'}
                />
                {/* Text input Phone*/}
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.015}}
                title={'Phone Number'}
                placeholder={'Enter your phone number'}
                onChangeText={(phone) => setPhone(phone)}
                onSubmitEditing={Keyboard.dismiss}
                />
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.015}}
                title={'Email'}
                placeholder={'Enter your email'}
                onChangeText={(email) => setEmail(email)}
                onSubmitEditing={Keyboard.dismiss}
                />
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.015}}
                title={'Password'}
                placeholder={'At least 8 characters'}
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                onSubmitEditing={Keyboard.dismiss}
                />
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.015}}
                title={'Confirm Password'}
                placeholder={'At least 8 characters'}
                secureTextEntry={true}
                onChangeText={(repass) => setRepassword(repass)}
                onSubmitEditing={Keyboard.dismiss}
                />
                <FieldButton
                stylesContainer={{marginVertical:heightScreen * 0.02}}
                title={'Sign in'}
                onPress={() => pressRegister()}
                />
                <View 
                style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text 
                    style={[styles.textForgotPW,{color:'black', fontStyle:"italic"}]}>Already have an account?</Text>
                    <Text 
                    style={[styles.textForgotPW, {fontWeight:'bold'}]}
                    onPress={() => pressSignIn()}
                    > Sign In</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style= {styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
        <ScrollView>
            <Header/>
            <Body/>
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    )
}


export default Login

const styles = StyleSheet.create({
    container : {
        flex:1,
        height : heightScreen,
        width: widthScreen,
        backgroundColor:'#F8F9FA',
    },
    containerHeader: {
        height : heightScreen * 0.25,
        width: widthScreen,
        paddingVertical: heightScreen * 0.10,
        paddingHorizontal: widthScreen * 0.075,
        // borderWidth:1
    },
    title: {
        fontSize: 28,
        fontWeight: '400',
        // height:heightScreen*0.2,
        // color: ORANGE_DARK,
        alignSelf:"center",
        textAlign:"center"
    },
    containerBody: {
        height : heightScreen,
        paddingHorizontal: widthScreen * 0.075,
        
    },
})