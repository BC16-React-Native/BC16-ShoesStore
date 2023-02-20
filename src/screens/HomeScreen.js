import { ScrollView, StyleSheet, Text, View, StatusBar , TouchableOpacity,SafeAreaView} from 'react-native'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import HeaderHome from '../components/HeaderHome/HeaderHome'
import SearchBar from '../components/SearchBox/SearchBar'
import ListCategory from '../components/Category/ListCategory'
import ListShoes from '../components/ShoesItem/ListShoes'
import ListNewShoes from '../components/NewShoes/ListNewShoes'
import { heightScreen, widthScreen } from '../utility'
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from '@react-navigation/native'
import auth from "@react-native-firebase/auth"
import { get_LenghtCart_uID } from '../api/controller/cart/getCart'

const HomeScreen = () => {
  const navigation = useNavigation();
  const [lenghtCart, setLenghtCart] = useState();

  // console.log(lenghtCart);
  useLayoutEffect(() => {
    get_LenghtCart_uID(setLenghtCart, auth().currentUser.uid)
  }, [])
  useLayoutEffect(() => { 
    navigation.setOptions({ 
      headerTitle: (props) => <HeaderHome {...props} />,
      headerRight: () => (
        <View style= {{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() =>{}} 
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                height: heightScreen * 0.0566,
                width: widthScreen * 0.112,
                borderRadius: widthScreen * 0.056
              }}
            >
                <AntDesign name="shoppingcart" size={24} color="black" />
                {lenghtCart ? <View 
                  style={{
                    backgroundColor: 'red', 
                    padding: 6, 
                    borderRadius: 6,
                    position: 'absolute',
                    top: 4,
                    right: 0
                  }}
                /> : null}
        </TouchableOpacity>
        </View>
      ),
    }) 
  }, [lenghtCart]);
  return (
    <SafeAreaView style ={{paddingBottom: heightScreen * 0.09, flex:1, backgroundColor: '#F8F9FA'}}>
    <ScrollView style={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      <StatusBar
        animated={true}
        backgroundColor="#F8F9FA"
        barStyle= 'dark-content'
      />

      {/* <HeaderHome /> */}

      <SearchBar placeholder={'Looking for shoes'} />

      <ListCategory />
      
      <ListShoes />
      
      <ListNewShoes />
    </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F8F9FA',
    // paddingBottom: 100
    // borderWidth: 1,
  }
})