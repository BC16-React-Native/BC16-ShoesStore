import { View, Text, SafeAreaView, KeyboardAvoidingView, Animated, Keyboard,Alert, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import React, { useEffect, useRef, useState,useLayoutEffect } from 'react'
import FieldTextInput from '../components/Auth/FieldTextInput'
import FieldButton from '../components/Auth/FieldButton'
// import Ionicons from "react-native-vector-icons/Ionicons"
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';
import { heightScreen, widthScreen } from '../utility'
import { useNavigation } from '@react-navigation/native'
import Loader from '../components/Auth/Loader'
const Login = () => {
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
                {/* <Image 
                style= {styles.imageTitle}
                source= {require('../../utility/images/image_title.png')}
                ></Image> */}
                <Text style= {[styles.title, {color:"black", fontWeight:"bold"}]}>Hello!</Text>
                <Text style= {[styles.title, {fontSize:25, fontWeight:'300', color:"black"}]}>Welcome Back You're Been Missed!</Text>
            </Animated.View>
        )
    }

    const Body = () => {
        // variable dataLogin
        const [inputs, setInputs] = useState({
            email: '',
            password: ''
        });
        const [errors, setErrors] = useState({});
        const regexemail = /\S+@\S+\.\S+/;
        const handleOnchange = (text, input) => {
            setInputs(prevState => ({...prevState, [input]: text}));
        };
        const handleError = (error, input) => {
            setErrors(prevState => ({...prevState, [input]: error}));
        };
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
            pressLogin();
        }
        // handle entry data login
        // handle login
        const pressLogin = () => {
            setLoading(true);
            setTimeout(() => {
            auth()
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
            const user = userCredentials.user;
            navigation.navigate('BottomTab');
            console.log('Logged in with:', user.email);
            })
            .catch(error => Alert.alert("Login Failed",error.message), setLoading(false))   
            setLoading(false); 
            },1000)
            if (!inputs.password) {
                handleError('Password is a required field.', 'password');
                isValid = false;
              } else if (inputs.password.length < 6) {
                handleError('Password must be at least 6 characters.', 'password');
                isValid = false;
              }
            
              if (isValid) {
                setLoading(true);
                setTimeout(() => {
                auth()
                .signInWithEmailAndPassword(inputs.email, inputs.password)
                .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', inputs.email);
                navigation.navigate('BottomTabAdmin');
                })
                .catch(error => Alert.alert("Login Failed",error.message), setLoading(false))   
                setLoading(false); 
                },1000)
            }

         }
        // const pressLogin = () => {

        // }
        const pressLoginasGuess = () => {
            setLoading(true);
            setTimeout(() => {
                auth()
                .signInAnonymously()
                .then(() => {
                    console.log('User signed in anonymously');
                    navigation.navigate('BottomTab');
                })
                .catch(error => {
                    if (error.code === 'auth/operation-not-allowed') {
                    console.log('Enable anonymous in your firebase console.');
                }

                console.error(error);
                setLoading(false);
                });
            },500)

        }
        // handle register
        const pressRegister = () => {
            navigation.navigate("SignUp")
        }
        // handle forgot password 
        const pressForgotPW = () => {
            navigation.navigate("Forgot")
        }
        return (
            <View style={styles.containerBody}>
                {/* Text input Username*/}
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Email'}
                placeholder={'Username or email address'}
                onFocus={() => handleError(null, 'email')}
                onChangeText={text => handleOnchange(text, 'email')}
                error = {errors.email}
                onSubmitEditing={Keyboard.dismiss}
                />
                {/* Text input password*/}
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Password'}
                placeholder={'At least 6 characters'}
                secureTextEntry={true}
                onFocus={() => handleError(null, 'passsword')}
                onChangeText={text => handleOnchange(text, 'password')}
                error = {errors.password}
                onSubmitEditing={Keyboard.dismiss}
                />
                {/* Text forgot password*/}
                <TouchableOpacity 
                style={styles.buttonForgotPW}
                onPress={pressForgotPW}>                
                <Text 
                style={styles.textForgotPW}
                pressForgotPW= {() => pressForgotPW()}
                > Forgot Password?</Text>
                </TouchableOpacity>

                <FieldButton
                stylesContainer={{marginVertical:heightScreen * 0.02}}
                title={'Sign in'}
                onPress={() => validate()}
                />
                {/* button Login*/}
                <FieldButton
                stylesContainer={{marginVertical:heightScreen * 0.01, backgroundColor: "white" }}
                title={'Login as Guess'}
                stylesTitle={{color:"#5B9EE1"}}
                onPress={() => pressLoginasGuess()}
                />
                {/* Text register*/}
                <View 
                style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text 
                    style={[styles.textForgotPW,{color:'black', fontStyle:"italic"}]}>Don’t have an account?</Text>
                    <Text 
                    style={[styles.textForgotPW, {fontWeight:'bold'}]}
                    onPress={() => pressRegister()}
                    > Sign up now!</Text>
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


export default Login

const styles = StyleSheet.create({
    container : {
        flex:1,
        height : heightScreen,
        width: widthScreen,
        backgroundColor:'#F8F9FA',
    },
    containerHeader: {
        height : heightScreen * 0.3,
        width: widthScreen,
        paddingVertical: heightScreen * 0.10,
        paddingHorizontal: widthScreen * 0.075,
        // borderWidth:1
    },
    imageTitle: {
        height: heightScreen * 0.2,
        marginVertical: heightScreen* 0.02,
        aspectRatio: 1,
        borderRadius: 100,
        alignSelf:'center'
    },
    title: {
        fontSize: 35,
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
    textForgotPW: {
        fontSize: 14,
        alignSelf:'flex-end',
        marginVertical:heightScreen * 0.01
    },
    buttonForgotPW:{
        alignSelf:'flex-end',
        marginTop:heightScreen*0.003
    }
})