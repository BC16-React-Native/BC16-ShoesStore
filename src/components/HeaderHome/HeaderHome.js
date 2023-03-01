import { PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View, Linking, Platform } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import { heightScreen, widthScreen } from '../../utility'
import Geolocation from '@react-native-community/geolocation';
 
const HeaderHome = () => {
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongtitude] = useState(null);
  const [location, setLocation] = useState(null);
  const latitude = '16.019236519630358'
  const longitude = '108.22907373679898'
  const apiKey = 'AIzaSyBAqoquRiy_bXJvQqVrExEZpxNoPgmmidk';
  const handlePressAddress = (location) => {
    const url = Platform.OS == 'ios'?
    `maps://maps.apple.com/?q=${encodeURIComponent(location)}`:
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    Linking.openURL(url)
  };
  useEffect(() => {
  //   Geolocation.requestAuthorization();
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const { latitude, longitude } = position.coords;
  //       setLatitude(latitude);
  //       setLongtitude(longitude);
  
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setLocation(data?.results[0].formatted_address)
        });
  //     },
  //     error => {
  //       console.log(error.code, error.message);
  //     },
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
  //   );
  },[]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shoes Store</Text>
      <View style={{flexDirection:  'row', alignItems: 'center'}}>
        <Ionicons name="location-sharp" size={24} color="#F87265" />
        <TouchableOpacity
          onPress={()=> handlePressAddress(location)}
        >
        <Text 
          numberOfLines={1}
          style={styles.address}
        >
          {location || null}
        </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HeaderHome

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: heightScreen * 0.013
    },
    text:{
        fontSize: 12,
        alignSelf:'center',
        color: '#707B81',
    },
    address :{
        fontSize: 14,
        color: '#1A2530',
        width: widthScreen * 0.5,
        fontWeight:'600'
    }
})