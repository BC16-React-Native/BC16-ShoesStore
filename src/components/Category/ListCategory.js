import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Category from './Category'
import AllCategory from './AllCategory'

const ListCategory = () => {
  return (
    <View style ={{ flexDirection: 'row', alignItems: 'center', marginLeft: 16}}>
        <AllCategory/>
        <Category />
        <Category />
        <Category />
    </View>
  )
}

export default ListCategory

const styles = StyleSheet.create({})