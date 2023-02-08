import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import HeaderHome from '../components/HeaderHome/HeaderHome'
import SearchBar from '../components/SearchBox/SearchBar'
import ListCategory from '../components/Category/ListCategory'
import ListShoes from '../components/ShoesItem/ListShoes'

const HomeScreen = () => {
  return (
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
      
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F8F9FA',
    // borderWidth: 1,
  }
})