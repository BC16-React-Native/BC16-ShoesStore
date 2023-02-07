import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import { heightScreen, widthScreen, GRAY_DARK } from '../utility';
const FieldTextInput = ({
    title,
    placeholder,
    onChangeText,
    secureTextEntry,
    stylesContainer,
    stylesTitle,
    stylesInput,
    onFocus = () => {},
    error,
    errortxt,
    onSubmitEditing,
    pattern,
    icon, 
    styleIcon,
}) => {
    let [state, setState] = useState(secureTextEntry);
    const [isFocus, setisFocus] = useState(false);

    return (
        <View style={[ styles.container, stylesContainer]}>
            <Text 
            style={ [styles.title, stylesTitle]}
            >{title}</Text>

            <View >
            <TextInput
            style= {[ styles.input, stylesInput]}
            placeholder={ placeholder }
            onChangeText={ onChangeText }
            secureTextEntry= {state}
            onFocus= {() => { 
                onFocus(); 
                setisFocus(true);}}
            onBlur = {() => {
                setisFocus(false);
            }}
            pattern = {pattern}
            autoCorrect = {false}
            onSubmitEditing = {onSubmitEditing}
            ></TextInput>
            {error && (<Text style = {[styles.errortxt , errortxt]}>{error}</Text>)}
            {
                secureTextEntry ?
                <View
                style={styles.icon}>
                <TouchableOpacity 
                style={ {alignItems:"center"} }
                onPress= {() => setState(!state)}>
                    <Ionicons
                     name = {state ? "eye" : "eye-off"}
                    size = {20}
                    ></Ionicons>
                </TouchableOpacity>
                </View> 
                :
                <></>
            }
            </View>
        </View>
    )
}

export default FieldTextInput

const styles = StyleSheet.create({
    container: {
        height: heightScreen * 0.095,
        width: widthScreen * 0.85,
        justifyContent:'space-between',
        // borderWidth:1
    },
    title: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        
    },
    errortxt:{
        fontSize: 12,
        color: '#FF0000',
        paddingLeft: widthScreen * 0.03,
        paddingTop: heightScreen * 0.01
    },

    input: {
        height: heightScreen * 0.06,
        paddingLeft: widthScreen * 0.04,
        paddingRight: widthScreen * 0.12,
        borderRadius:20,
        // borderWidth:1,
        // borderColor: GRAY_DARK,
        fontStyle: 'normal',
        fontSize: 14,
        backgroundColor:"#FFFFFF",
        shadowColor: "#000",
            shadowOffset: {
                width: widthScreen * 0,
                height: heightScreen *0.002,
            },
        shadowOpacity: heightScreen *0.0002,
    },
    icon : {
        height: heightScreen * 0.03,
        width: widthScreen * 0.06,
        position:'absolute',
        right:widthScreen * 0.04,
        top:heightScreen*0.018
    }
})