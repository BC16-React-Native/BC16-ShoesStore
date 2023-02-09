import React from 'react';
import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Lottie from 'lottie-react-native';
import { heightScreen,widthScreen } from '../../utility';
const Loader = ({visible = false}) => {
  return (
    visible && (
      <View style={[style.container]}>
        {/* <View style={style.loader}> */}
          <Lottie 
          style = {style.loader}
          source={require('../../utility/loading/shoescolor.json')} 
          autoPlay
          loop />
          {/* <Text style={{marginLeft: 10, fontSize: 16}}>Loading...</Text> */}
        {/* </View> */}
      </View>
    )
  );
};

const style = StyleSheet.create({
  loader: {
    backgroundColor: 'white',
    marginHorizontal: 50,
    borderRadius: 5,
    alignItems: 'center',
  },
  loader:{
    height: heightScreen *0.2,
    width: widthScreen * 0.2,
  },
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    height:heightScreen,
    width:widthScreen,
  },
});

export default Loader;