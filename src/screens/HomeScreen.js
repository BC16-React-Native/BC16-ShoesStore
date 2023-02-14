import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import HeaderHome from '../components/HeaderHome/HeaderHome'
import SearchBar from '../components/SearchBox/SearchBar'
import ListCategory from '../components/Category/ListCategory'
import ListShoes from '../components/ShoesItem/ListShoes'
import ListNewShoes from '../components/NewShoes/ListNewShoes'
import { heightScreen } from '../utility'

const HomeScreen = () => {
  return (
    <View style ={{paddingBottom: heightScreen * 0.12, flex:1, backgroundColor: '#F8F9FA'}}>
    <ScrollView style={styles.container}
      
    >
      <StatusBar
        animated={true}
        backgroundColor="#F8F9FA"
        barStyle= 'dark-content'
      />

      <HeaderHome />

      <SearchBar />

      <ListCategory />
      
      <ListShoes />
      
      {/* <ListNewShoes /> */}
    </ScrollView>
    </View>
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