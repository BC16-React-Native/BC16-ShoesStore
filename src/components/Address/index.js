import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"

const Address = ({address, setAddress}) => {
  const  [edit, setEdit] = useState(false);
  console.log(address)
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* <Text style={styles.infor_text}>214-216-218 Nguyen Phuoc Lan, Danang, </Text> */}
        
        <TouchableOpacity onPress={() => {setEdit(!edit)}} style={{flex: 1 , flexDirection: 'row', alignItems: 'center'}}>
        {!edit && address ? 
            <Text style={styles.infor_text}>{address} </Text>
        :
            <TextInput
                label="address"
                value={address}
                mode={'outlined'}
                placeholder={'You must add an address'}
                placeholderTextColor={'#ff5353'}
                onChangeText={text => setAddress(text)}s
                onEndEditing={() => {setEdit(!edit)}}
                autoFocus={true}
                style={styles.textinput}
            />
        }
            <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
    </View>
  )
}

export default React.memo(Address)

const styles = StyleSheet.create({
    infor_text:{
        fontFamily: 'SF-Pro',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        color: '#1A2530',
        flex: 1
    },
    textinput : {
      flex: 1, 
      // marginLeft: 12, 
      backgroundColor: '#F8F9FA', 
      marginRight: 12,
      paddingHorizontal: 4,
      paddingVertical: 6,
      borderRadius: 8
  }
})