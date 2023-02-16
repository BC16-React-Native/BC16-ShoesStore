import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { get_Products_name } from '../api/controller/products/getProducts';
import ShoesBox from '../components/ShoesBox';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightScreen, widthScreen } from '../utility/index';
import { useNavigation } from '@react-navigation/native';

const ResultScreen = ({ route }) => {
  const { searchwword } = route.params;

  const [data, setData] = useState([]);
  useEffect(() => {
    get_Products_name(setData, searchwword);
  }, []);
  const navigation = useNavigation();

  const Header = () => {
    return (
      <View style={styles.containerHeader}>
        <Text style={styles.textSearch}>Search</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.buttonBack}>
          <Icon name='chevron-back-outline' color={'black'} size={30} style={styles.iconBack} />
        </TouchableOpacity>
        <View
          style={styles.serachBar}>
          <Icon name="search" size={24} color="#707B81" style={{ marginLeft: widthScreen * 0.05 }} />
          <TextInput
            style={styles.input}
            placeholder={searchwword}
          ></TextInput>
        </View>
      </View>
    )
  }
  return (
    <View>
      <Header />
      <SafeAreaView style={{ alignSelf: 'center' }}>

        {data.length === 0 ? <Text style={{ marginTop: heightScreen * 0.05, fontSize: 18 }}>Shop haven't products matching.</Text> : <FlatList
          data={data}
          renderItem={({ item, index }) => <ShoesBox item={item} />}
          numColumns={2}
          keyExtractor={item => item.id}
          style={{ marginTop: heightScreen * 0.05 }}
        />}

      </SafeAreaView>
      </View>
  )
  }
export default ResultScreen

const styles = StyleSheet.create({
  containerHeader: {
    width: widthScreen,
    alignSelf: 'center',
  },
  buttonBack: {
    position: 'absolute',
    width: widthScreen * 0.14,
    height: heightScreen * 0.067,
    backgroundColor: 'white',
    borderRadius: 40,
    marginLeft: widthScreen * 0.05,
    marginTop: heightScreen * 0.03,
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  iconBack: {
    alignSelf: 'center'
  },
  textSearch: {
    position: 'absolute',
    right: widthScreen * 0.45,
    marginTop: heightScreen * 0.045,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A2530'
  },
  serachBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: widthScreen * 0.9,
    borderRadius: 20,
    marginTop: heightScreen * 0.12,
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  input: {
    marginLeft: widthScreen * 0.05,
  }
})
