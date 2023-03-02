import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import Geolocation from '@react-native-community/geolocation'
import { widthScreen } from '../../utility'

const Address = ({address, setAddress}) => {
  const  [edit, setEdit] = useState(false);
  const [location, setLocation] = useState();
  const [ilatitude, setLatitude] = useState(null);
  const [ilongitude, setLongitude] = useState(null);
  const apiKey = 'AIzaSyBAqoquRiy_bXJvQqVrExEZpxNoPgmmidk';
  const handleLocation = async () =>{
    Alert.alert('Allow "ShoesStore" to access your location?','You must allow access location for ShoesStore app to work.',
    [{text: 'Allow', onPress: () => {
      setAddress(location);
    }
    },
    {text: 'Cancel', onPress: () => {
      setEdit(!edit)
    }
    }],
    )
};
useEffect(() => {
  Geolocation.requestAuthorization();
  Geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        setLocation(data?.results[0].formatted_address);
      });
    },
    error => {
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
  );
}, []);
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>        
        <TouchableOpacity onPress={() => {setEdit(!edit)}} style={{flex: 1 , flexDirection: 'row', alignItems: 'center'}}>
        {!edit && address ? 
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text 
          numberOfLines={1}
          style={styles.infor_text}>{address}</Text>
          <AntDesign name="edit" size={24} color="black" />
        </View>

        : 
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress = {() => setEdit(!edit)}
        >
            <TextInput
                label="address"
                value={address}
                mode={'outlined'}
                placeholder={'You must add an address'}
                placeholderTextColor={'#ff5353'}
                onChangeText={text => setAddress(text)}
                onEndEditing={() => {setEdit(!edit)}}
                autoFocus={true}
                style={styles.textinput}
            />
          <AntDesign name="edit" size={24} color="black" style = {{}}/>
        
        
        </TouchableOpacity>
        }
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{ 
          handleLocation();
        }}
        style = {{ zIndex: 10, elevation: 10}}
        >
          <Ionicons name="location-sharp" size={24} color="#ff5353"/>
        </TouchableOpacity>
    </View>
  )
}

export default React.memo(Address)

const styles = StyleSheet.create({
    infor_text:{
        fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
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
      marginRight: widthScreen * 0.04,
      paddingHorizontal: 4,
      paddingVertical: 6,
      borderRadius: 8
  }
})