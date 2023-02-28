import { PermissionsAndroid, StyleSheet, Text, View,  } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import { heightScreen } from '../../utility'
import Geolocation from '@react-native-community/geolocation';
 
const HeaderHome = () => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              setLocation(position.coords);
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shoes Store</Text>
      <View style={{flexDirection:  'row', alignItems: 'center'}}>
        <Ionicons name="location-sharp" size={24} color="#F87265" />
        <Text style={styles.address}>{location}</Text>
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
        marginLeft: 4,
        color: '#707B81',
    },
    address :{
        fontSize: 14,
        color: '#1A2530',
    }
})