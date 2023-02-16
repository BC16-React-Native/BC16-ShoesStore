import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"

const SearchBar = ({styleSearch, placeholder}) => {
  return (
    <View 
        style={[styles.container, {flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff'}]}
    >
        <Ionicons name="search" size={24} color="#707B81" />
        <TextInput
            style= { [styles.input, styleSearch] }
            placeholder={ placeholder }
        ></TextInput>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container:{
        // borderWidth: 1,
        marginHorizontal: 16,
        borderRadius:  20,
        paddingLeft: 10,
        marginVertical: 16,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    input:{
        marginLeft: 12,
        // borderWidth: 1,
        flex: 1
    }
})