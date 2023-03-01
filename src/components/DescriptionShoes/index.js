import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Description = ({description}) => {
    const [view_Detail, setView_Detail] = React.useState(false);

  return (
    <View style={{flexDirection: 'row'}}>
        <Text numberOfLines = {view_Detail? null : 3} style={styles.detail}>
        {description}
        </Text>
        <Text
        onPress={() => setView_Detail(!view_Detail)}
        style={{
            alignSelf: 'flex-end',      
            lineHeight: 22,
            color:"#5B9EE1"
        }} 
        >
            {view_Detail ? "Hide" : "Show"}
        </Text>
    </View>
  )
}

export default React.memo(Description);

const styles = StyleSheet.create({
    detail: {
        fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 22,
        color: '#707B81',
        width: '86%',
      },
})