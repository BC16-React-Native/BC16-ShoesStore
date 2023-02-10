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
import Loader from '../components/Loader'

const Login = () => {
    const headerMotion = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const regexemail = /\S+@\S+\.\S+/;
    const regexphone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
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
                <Text style= {[styles.title, {color:"black", fontWeight:"bold",}]}>Create Account</Text>
                <Text style= {[styles.title, {fontSize:16, fontWeight:'300', color:"black", marginVertical:heightScreen * 0.005}]}>Let's Create Account Together!</Text>
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
            name: '',
            phone: '',
            email: '',
            password: '',
            repass: ''
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
        
            if (!inputs.name) {
              handleError('Name is a required field.', 'name');
              isValid = false;
            } else if(inputs.name.length < 3) {
                handleError('Name must be at least 3 characters.', 'name');
                isValid = false;
            }        
            if (!inputs.phone) {
              handleError('Please input phone number', 'phone');
              isValid = false;
            } else if (!inputs.phone.match(regexphone)) {
                handleError('Phone must be a valid phone.', 'phone');
                isValid = false;  
            } else if (inputs.phone.length < 10) {
                handleError('Phone must be at least 10 characters.', 'phone');
                isValid = false;  
            } 
        
            if (!inputs.password) {
              handleError('Password is a required field.', 'password');
              isValid = false;
            } else if (inputs.password.length < 8) {
              handleError('Password must be at least 8 characters.', 'password');
              isValid = false;
            }

            if (!inputs.repass) {
                handleError('Re-Password is a required field.', 'repass');
                isValid = false;
              } else if (inputs.repass == inputs.password){
                handleError('Password confirmation must match password.', 'repass');
                isValid = false;
              }

            if (isValid) {
                pressRegister();
            }
          };

        // handle entry data login
        // handle login
        // handle register
        const pressRegister = () => {
            setLoading(true);
            setTimeout(() => {
            if(inputs.password == inputs.repass){
              auth()
                .createUserWithEmailAndPassword(inputs.email, inputs.password)
                .then(userCredentials => {
                    const user = userCredentials.user;
                    Alert.alert(
                        "Successfully",
                        "You have successfully registered! Let's shopping now!",
                        [
                          { text: "OK", onPress: () => console.log('Registered with:', user.email) }
                        ]
                      );
                    registerUser(inputs.name, inputs.username, inputs.phone, inputs.email, inputs.password);
                    navigation.navigate('BottomTab');
                }
                )
                .catch(error => {Alert.alert("Failed",error.message), setLoading(false)})
              }
              else{
                Alert.alert(
                  "Failed",
                  "Password and Confirm Password not match!",
                  [
                    { text: "Try again", onPress: () => console.log('Account Registration Failed! ') }
                  ]
                );
                setLoading(false)
              }    
            },1000)
            
            }
        const handleOnchange = (text, input) => {
            setInputs(prevState => ({...prevState, [input]: text}));
        };
        const handleError = (error, input) => {
            setErrors(prevState => ({...prevState, [input]: error}));
        };
        // handle forgot password 
        const pressSignIn = () => {
            navigation.navigate("SignIn");
        }
        return (
            <View style={styles.containerBody}>
                {/* Text input Name*/}
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Your Name'}
                onFocus={() => handleError(null, 'name')}
                placeholder={'Type your name...'}
                onChangeText={text => handleOnchange(text, 'name')}
                onSubmitEditing={Keyboard.dismiss}
                error = {errors.name}
                />
                {/* Text input Phone*/}
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Phone Number'}
                onFocus={() => handleError(null, 'phone')}
                placeholder={'Enter your phone number...'}
                onChangeText={text => handleOnchange(text, 'phone')}
                error={errors.phone}
                onSubmitEditing={Keyboard.dismiss}
                />
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Email'}
                placeholder={'Enter your email...'}
                onFocus={() => handleError(null, 'email')}
                onChangeText={text => handleOnchange(text, 'email')}
                onSubmitEditing={Keyboard.dismiss}
                error={errors.email}
                />
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Password'}
                onFocus={() => handleError(null, 'password')}
                placeholder={'At least 8 characters'}
                secureTextEntry={true}
                onChangeText={text => handleOnchange(text, 'password')}
                error={errors.password}
                onSubmitEditing={Keyboard.dismiss}
                />
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Confirm Password'}
                onFocus={() => handleError(null, 'repass')}
                placeholder={'At least 8 characters'}
                secureTextEntry={true}
                onChangeText={text => handleOnchange(text, 'repass')}
                error={errors.repass}
                onSubmitEditing={Keyboard.dismiss}
                />
                
                <FieldButton
                stylesContainer={{marginVertical:heightScreen * 0.015}}
                title={'Sign Up'}
                onPress={validate}
                />
                <View 
                style={{flexDirection:'row', justifyContent:'center', marginVertical: heightScreen *0.01}}>
                    <Text 
                    style={[styles.textForgotPW,{color:'black', fontStyle:"italic"}]}>Already have an account?</Text>
                    <Text 
                    style={[styles.textForgotPW, {fontWeight:'bold'}]}
                    onPress={() => {pressSignIn()}}
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
            <Loader visible={loading} />
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