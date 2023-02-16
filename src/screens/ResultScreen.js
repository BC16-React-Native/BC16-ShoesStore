import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ResultScreen = ({route}) => {
    const {searchword} = route.params;
  return (
    <View>
      <Text>{searchword}</Text>
    </View>
  )
}

export default ResultScreen

const styles = StyleSheet.create({})