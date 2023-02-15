import {StyleSheet, StatusBar, Dimensions} from 'react-native';
import { widthScreen } from '../../utility';


const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  scrollView: {
    width: widthScreen,
    marginHorizontal: 10,
    //flex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 30,
    borderColor: '#c9c9c9',
    backgroundColor: '#ededed',
    borderWidth: 1,
    margin: 5,
    marginTop: 10,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;