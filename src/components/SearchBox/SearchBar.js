import { Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import { heightScreen, widthScreen } from '../../utility';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchBar = ({styleSearch, placeholder}) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity 
        style={[styles.container, {flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff'}]}
        onPress={() => navigation.navigate('Search')}
    >
        <Ionicons name="search" size={24} color="#707B81" />
        <TextInput
            style= { [styles.input, styleSearch] }
            placeholder={ placeholder }
            onFocus={() => {
                navigation.navigate('Search');
            }}
            editable={false}
        ></TextInput>
    </TouchableOpacity>
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
        paddingVertical: Platform.OS == 'ios'? heightScreen * 0.015 : null,

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