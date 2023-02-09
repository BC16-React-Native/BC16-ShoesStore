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
    onSubmitEditing,
    value,
    editable,
    icon, 
    styleIcon,
    ...props

}) => {
    let [state, setState] = useState(secureTextEntry);
    const [isFocused, setIsFocused] = useState(false);


    return (
        <View style={[ styles.container, stylesContainer]}>
            <Text 
            style={ [styles.title, stylesTitle]}
            >{title}</Text>

            <View>
            <TextInput
            style= {[styles.input, stylesInput, {borderWidth:1,
            borderColor: error
              ? 'red'
              : isFocused
              ? '#5B9EE1'
              :'white'}]}
            placeholder={ placeholder }
            onChangeText={ onChangeText }
            autoCorrect={false}
            onFocus={() => {
            onFocus();
            setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            secureTextEntry= {state}
            {...props}
            value={value}
            editable={editable}

            onSubmitEditing = {onSubmitEditing}
            ></TextInput>
            <Text style={{color: "red", fontSize: 12, marginTop:heightScreen*0.005, paddingLeft:widthScreen*0.035}}>
            {error}
            </Text>
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
        fontSize: 14,
        paddingLeft: widthScreen *0.02,
        marginVertical: heightScreen * 0.005,
        
    },
    input: {
        height: heightScreen * 0.06,
        paddingLeft: widthScreen * 0.04,
        paddingRight: widthScreen * 0.12,
        borderRadius:20,
        fontStyle: 'normal',
        fontSize: 14,
        backgroundColor:"#FFFFFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: heightScreen * 0.001,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    icon : {
        height: heightScreen * 0.03,
        width: widthScreen * 0.06,
        position:'absolute',
        right:widthScreen * 0.04,
        top:heightScreen*0.018
    }
})