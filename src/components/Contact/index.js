import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
import AntDesign from "react-native-vector-icons/AntDesign"
// import { TextInput } from 'react-native-paper';

const Contact = ({type, email, phone, setPhone}) => {
    const  [edit, setEdit] = useState(false);
    // const [text, setText] = React.useState(phone);
    // console.log(phone)
    return (
        <>
            {type == 'mail' ? 
            <View style = {styles.container}>
                <View style={{backgroundColor: '#F8F9FA', padding: 8, borderRadius: 12}}>
                    <Ionicons name="ios-mail-outline" size={24} color="black" />
                </View>
                <View style={{flex: 1, marginLeft: 12}}>
                    <Text style={styles.infor_text}>{email}</Text>
                    <Text style={styles.infor_type}>Email</Text>
                </View>
                <View>
                    {/* <AntDesign name="edit" size={24} color="black" /> */}
                </View>
            </View>
            : 
            <TouchableOpacity onPress={() => {setEdit(!edit)}} style = {styles.container}>
                <View style={{backgroundColor: '#F8F9FA', padding: 8, borderRadius: 12}}>
                    <Feather name="phone" size={24} color="black" />
                </View> 
                {!edit ? 
                    <View style={{flex: 1, marginLeft: 12}}>
                        <Text style={styles.infor_text}>{phone}</Text>
                        <Text style={styles.infor_type}>Phone</Text>
                    </View>
                :
                    <TextInput
                        label="Phone"
                        value={phone}
                        mode={'outlined'}
                        onChangeText={text => setPhone(text)}
                        onEndEditing={() => {setEdit(!edit)}}
                        autoFocus={true}
                        style={styles.textinput}
                    />
                }
                {/* <TouchableOpacity onPress={() => {setEdit(!edit)}}> */}
                    <AntDesign name="edit" size={24} color="black" />
                {/* </TouchableOpacity> */}
            </TouchableOpacity>
            }
        </>
    )
}

export default React.memo(Contact)

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor: 'white',
        marginVertical: 4,
        alignItems: 'center',
    },
    infor_text:{
        fontFamily: 'SF-Pro',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        color: '#1A2530',
    },
    infor_type:{
        fontFamily: 'SF-Pro',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 16,
        color: '#707B81',
    },
    textinput : {
        flex: 1, 
        marginLeft: 12, 
        backgroundColor: '#F8F9FA', 
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8
    }
})