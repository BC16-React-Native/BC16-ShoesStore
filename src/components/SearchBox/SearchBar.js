import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Surface } from 'react-native-paper';
import { heightScreen, widthScreen } from '../../utility';

const SearchBar = () => {
  return (
    <View 
        style={[styles.container, {flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff'}]}
    >
        <Ionicons name="search" size={24} color="#707B81" />
        <TextInput
            style= {[ styles.input ]}
            placeholder= 'Looking for shoes'
            // onChangeText={ onChangeText }
            // secureTextEntry= {state}
            // onFocus= {onFocus}
            // onSubmitEditing = {onSubmitEditing}
        ></TextInput>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container:{
        // borderWidth: 1,
        marginHorizontal: widthScreen * 0.05,
        borderRadius:  20,
        paddingLeft: widthScreen * 0.025,
        marginVertical: heightScreen * 0.015,
        // paddingVertical: heightScreen * 0.015,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: heightScreen * 0.004,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
    },
    input:{
        marginLeft: widthScreen * 0.03,
        // borderWidth: 1,
        flex: 1
    }
})