import { View, Text, SafeAreaView, KeyboardAvoidingView, Animated, Keyboard,Alert, StyleSheet, ScrollView} from 'react-native'
import React, { useEffect, useRef, useState,useLayoutEffect } from 'react'
import FieldTextInput from '../components/Auth/FieldTextInput'
import FieldButton from '../components/Auth/FieldButton'
// import Ionicons from "react-native-vector-icons/Ionicons"
import auth from "@react-native-firebase/auth"
import { heightScreen, widthScreen} from '../utility'
import { useNavigation } from '@react-navigation/native'
import Loader from '../components/Auth/Loader'

const ForgotScreen = () => {
    const headerMotion = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
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
                <Text style= {[styles.title, {color:"black", fontWeight:"bold", marginVertical:heightScreen*0.005}]}>Forgot Password</Text>
                {/* <View styles = {styles.containerSub}> */}
                <Text style= {[styles.title, {fontSize:16, fontWeight:'300', color:"black",}]}>
                Please Enter Your Email Address To Recieve a Verification Code
                </Text>
                {/* </View> */}
            </Animated.View>
        )
    }

    const Body = () => {
        // variable dataLogin
        // const [name, setName] = useState('');
        // const [username, setUsername] = useState('');
        // const [phone, setPhone] = useState('');
        // const [email, setEmail] = useState('');
        // const [password, setPassword] = useState('');
        // const [repass, setRepassword] = useState('');
        const [inputs, setInputs] = useState({
            email: '',
        });
        const [errors, setErrors] = useState({});
        const validate = () => {
            Keyboard.dismiss();
            let isValid = true;
        
            if (!inputs.email) {
              handleError('Email is a required field.', 'email');
              isValid = false;
            } else if (!inputs.email.match(regexemail)) {
              handleError('Email must be a valid email.', 'email');
              isValid = false;
            }
            pressForgotPW()
          };

        // handle entry data login
        // handle login
        // handle register
        const pressForgotPW = () => {
        setLoading(true);
        setTimeout(() => {
        auth().sendPasswordResetEmail(inputs.email)
        .then(function (user) {
            Alert.alert('Reset Password','Please check your email...',
            [
                { text: "Back", onPress: () => {
                console.log('Reset password with:', inputs.email); 
                navigation.navigate('SignIn');} }
            ]
            )
        }).catch(function (e) {
            console.log(e)
            setLoading(false);
        });
        },1000)

            }
        const handleOnchange = (text, input) => {
            setInputs(prevState => ({...prevState, [input]: text}));
        };
        const handleError = (error, input) => {
            setErrors(prevState => ({...prevState, [input]: error}));
        };
        // handle forgot password 
        const pressSignUp = () => {
            navigation.navigate("SignUp");
        }
        return (
            <View style={styles.containerBody}>
                {/* Text input Name*/}
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Email Address'}
                stylesTitle = {{fontWeight: 'bold'}}
                onFocus={() => handleError(null, 'email')}
                placeholder={'Type your email...'}
                onChangeText={text => handleOnchange(text, 'email')}
                onSubmitEditing={Keyboard.dismiss}
                error = {errors.email}
                />
                <FieldButton
                stylesContainer={{marginVertical:heightScreen * 0.015}}
                title={'Continue'}
                onPress={pressForgotPW}
                />
                <View 
                style={{flexDirection:'row', justifyContent:'center', marginVertical: heightScreen *0.01}}>
                    <Text 
                    style={[styles.textForgotPW,{color:'black', fontStyle:"italic"}]}>Don't have an account?</Text>
                    <Text 
                    style={[styles.textForgotPW, {fontWeight:'bold'}]}
                    onPress={() => {pressSignUp()}}
                    > Sign Up</Text>
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
        <Loader visible={loading} />
        </SafeAreaView>
    )
}


export default ForgotScreen

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
    containerSub:{
        height: heightScreen,
        width: widthScreen * 0.8,
        alignItems: "center",
        justifyContent:'center',
        textAlign: 'center'
    }
})