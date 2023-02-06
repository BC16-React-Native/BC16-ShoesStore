import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { heightScreen, widthScreen, BLUE_DARK, WHITE } from '../utility'
import Ionicons from "react-native-vector-icons/Ionicons"
import React from 'react'
const FieldButton = ({
    onPress, 
    title,
    stylesContainer,
    stylesTitle,
    stylesIcon,
    icon,
    
}) => {
return (
      <TouchableOpacity 
        onPress={onPress}
        style= {[styles.container, stylesContainer]}
        >
       {
        icon? <Ionicons
        style= {[styles.icon, stylesIcon]}
        name = {icon}>
        </Ionicons>:<></>
       }
        <Text 
        style= {[styles.title, stylesTitle]}
        >{title}</Text>
      </TouchableOpacity>
  )
}
export default FieldButton;

const styles = StyleSheet.create({
    container: {
        width:widthScreen * 0.8,
        height:heightScreen * 0.06,
        flexDirection:'row',
        alignSelf:'center',
        borderRadius: 20,
        backgroundColor: "#5B9EE1",
        alignItems: 'center',
        justifyContent:"center",
        
    },
    icon: {
        height: heightScreen * 0.03,
        width: widthScreen * 0.06,
        marginRight: widthScreen * 0.06
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        alignSelf: 'center',
        color: "white",
    },
});