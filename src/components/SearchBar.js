import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Surface } from 'react-native-paper';
import { heightScreen, widthScreen } from '../utility/index'

const SearchBar = () => {
  return (
    <View 
        style={styles.container}
    >
        <Ionicons name="search" size={24} color="#707B81" />
        <TextInput
            style= {[ styles.input ]}
            placeholder= 'Looking for shoes'
        ></TextInput>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff',
    container:{
        // borderWidth: 1,
        borderRadius:  20,
        paddingLeft: widthScreen * 0.025,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,

    },
    input:{
        marginLeft: widthScreen * 0.03,
        // borderWidth: 1,
        flex: 1,

    }
})