import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightScreen } from '../../utility'
import DropDownPicker from 'react-native-dropdown-picker'

const Dropdown = ({
    open,
    value,
    setOpen,
    setValue,
    categories,
    dropdownstyle
}) => {
  return (
    <View>
        <DropDownPicker
        title = {'Name'}
        open={open}
        // placehoder = {value}
        value={value}
        items={categories}
        setOpen={setOpen}
        setValue = {setValue}
        enableOnAndroid={true}
        style= {[styles.dropdown, dropdownstyle]}
        dropDownContainerStyle={{borderWidth:0.2,
            backgroundColor: '#fafafa'
        }}
        listItemContainerStyle={{
        borderRadius: 20,
        borderBottomWidth: 1, borderBottomColor: "gray"
        }}
    />
    </View>
  )
}

export default Dropdown

const styles = StyleSheet.create({
    dropdown:{
        borderRadius:20, 
        borderWidth:-1,
        backgroundColor:"#FFFFFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: heightScreen * 0.001,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
  
        elevation: 4,
        marginVertical: heightScreen *0.01, 
  
      },
})