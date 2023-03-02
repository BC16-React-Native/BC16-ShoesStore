import { Animated, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View, ScrollView, Keyboard,Image, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import auth from "@react-native-firebase/auth"
import { heightScreen, widthScreen } from '../utility/index'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import SearchItem from '../components/SearchItem'
import { get_AllProducts } from '../api/controller/products/getProducts'
import ShoesBox from '../components/ShoesItem/ShoesBox'
import { useSelector } from 'react-redux'
import { get_unFavorite_userID } from '../api/controller/favorite/getFavorite'

const Header = ({title, search, setSearch, listProducts, setFilterData}) => {
    const navigation = useNavigation();
const handleSearch = (word, data) => {
   if(word !== ''){
       const filterName = data.filter((item)=>{
           return Object.values(item?.name).join('').toLowerCase().includes(word.toLowerCase())
       })
       setFilterData(filterName);
       }
  }
  
    return(
         <View style = {styles.containerHeader}>
           <Text style={styles.textSearch}>{title}</Text>
           <TouchableOpacity onPress={()=>navigation.navigate('BottomTab')} style={styles.buttonBack}>
             <Icon name='chevron-back-outline' color={'black'} size={30} style={styles.iconBack}/>
           </TouchableOpacity> 
           <View 
                 style={styles.serachBar}>
                 <TouchableOpacity onPress={() =>handleSearch(search, listProducts)}>
                     <Icon name="search" size={24} color="#707B81" style={{marginLeft:widthScreen*0.05}}/>
                 </TouchableOpacity>
                 <TextInput
                     value={search}
                     style= {styles.input}
                     placeholder='Search your shoes'
                     onChangeText={(txt) => {
                         setSearch(txt);
                         handleSearch(search, listProducts)
                     }}
                     autoFocus={true}
                 ></TextInput>
             </View>
         </View>
     )
 }
 const Recommend = () => {
    return (      
        <View style={styles.containerBody}>
            <Text style={styles.text}>Suggested</Text>
            <SearchItem
                nameicon={'hearto'}
                nameitem="Zion 2 Big Kids' Shoes"
            />
            <SearchItem
                nameicon={'hearto'}
                nameitem='Air Jordan 1 Zoom Comfort 2'
            />
            <SearchItem
                nameicon={'hearto'}
                nameitem='Sandal Adidas Adilette'
            />
            <Text style={styles.text}>History</Text>
            <SearchItem
                nameicon={'clockcircleo'}
                nameitem="Air Jordan 1 Mid SE Older Kids' Shoes"
            />
            <SearchItem
                nameicon={'clockcircleo'}
                nameitem="Pegada 07 men's comfort boots"
            />
            <SearchItem
                nameicon={'clockcircleo'}
                nameitem="Men's Jordan Delta 3 Low"
            />
            <SearchItem
                nameicon={'clockcircleo'}
                nameitem="Mike Wazowski Stan Smiths"
            />
        </View>
    )
}

const Result = ({dataFilter, handleFavo}) => {
    return (      
        <SafeAreaView style={{alignItems: 'center', marginBottom: heightScreen * 0.08}}>
            {dataFilter?.length == 0 ? <Text style={{ marginTop: heightScreen * 0.05, fontSize: 18 }}>Shop haven't products matching.</Text>  
            // : dataFilter?.length == 1 ? 
            // <TouchableOpacity style={styles.container} onPress={() =>{console.log('go to detail')}}>
            //     <Image
            //         style={styles.image}
            //         source={{
            //         uri: dataFilter[0]?.images[0]
            //         }}
            //     />
            //     <View style={{marginVertical: heightScreen * 0.02}}>
            //         <Text style={styles.title}>BEST SELLER</Text> 
            //         <Text numberOfLines={1} style={styles.name}>{dataFilter[0]?.name}</Text>
            //     </View>
            //         <Text style={styles.price}>${dataFilter[0]?.prices}</Text>
            //     <TouchableOpacity style={[styles.icon_like, 
            //         {backgroundColor: '#E15B5B'}
            //         ]} 
            //         onPress={() => {deleteFavo(dataFilter[0]?.id)}}
            //     >
            //         <Feather name="heart" size={22} color="#fff" />
            //     </TouchableOpacity>
            // </TouchableOpacity>
            :
            <FlatList
                data={dataFilter}
                renderItem={({ item, index }) => 
                <View style={{ marginRight: widthScreen * 0.02}}>
                    <ShoesBox item={item} isnoFav={handleFavo(item?.id)}/>
                </View>
                }
                numColumns={2}
                keyExtractor={item => item.id}
                style={{ marginTop: heightScreen * 0.05 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled 
            />
            }
            
        </SafeAreaView>
    )
}
const SearchScreen = () => {
   const [listProducts, setListProducts] = useState([]);
   const [dataFilter, setFilterData] = useState([]);
   const [unFav, setUnFav] = useState([]);
   const roles = useSelector((state) => state.auth.role);

   useEffect(() => {
    get_AllProducts(setListProducts);
    if (roles == false){
        get_unFavorite_userID(setUnFav, auth().currentUser.uid);
    }
  }, []);
  const handleFavo = (proid) => {
    return !unFav.includes(proid);
}
  const [search, setSearch] = useState('')

    return (
        <SafeAreaView style= {styles.containerParent}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
            <Header title={search !== '' ? 'Result' : 'Search'} search={search} setSearch={setSearch} listProducts={listProducts} setFilterData={setFilterData}/>
            {search !== '' ? <Result dataFilter={dataFilter} handleFavo={handleFavo} /> : <Recommend />}        
        </KeyboardAvoidingView>
        </SafeAreaView>
    )

}
export default SearchScreen


const styles = StyleSheet.create({
 containerParent : {
   flex:1,
   height : heightScreen,
   width: widthScreen,
   backgroundColor:'#F8F9FA',
},
containerHeader: {
   width: widthScreen,
   alignSelf:'center',
},
title: {
   fontSize: 28,
   fontWeight: 'bold',
   alignSelf:"center",
   textAlign:"center",
},
containerBody: {
   height : heightScreen ,
   marginTop: heightScreen*0.05,
   width: widthScreen*0.8,
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
 shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,

},
iconBack:{
 alignSelf: 'center'
},
textSearch:{
 position: 'absolute',
 right: widthScreen * 0.45,
 marginTop: heightScreen * 0.045,
 fontSize: 16,
 fontWeight: 'bold',
 color: '#1A2530'
},
serachBar:{
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
input:{
   marginLeft: widthScreen * 0.05,
},
text:{
    fontSize:18, 
    color: '#1A2530', 
    fontWeight: 'bold', 
    marginBottom: heightScreen*0.02
},
image: {
    height: heightScreen * 0.125,
    width: widthScreen * 0.35,
    transform: [{rotate: '-10deg'}],
  },
  container:{
    width: widthScreen *0.45,
    left: widthScreen * 0.05,
    backgroundColor: '#fff',
    alignSelf: 'stretch',

    paddingVertical: heightScreen * 0.01,
    paddingHorizontal: widthScreen * 0.02,
    borderRadius: 20,
    marginHorizontal: widthScreen * 0.01,
    marginVertical: heightScreen * 0.01,

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: heightScreen * 0.004,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  title:{
    color: '#5B9EE1',
    marginVertical: heightScreen * 0.006
  },
  name:{
    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    color: '#1A2530',
    width: widthScreen * 0.3768,
    // maxHeight: 38,
    
  },
  price:{
    fontFamily: Platform.OS != 'ios'? 'SF-Pro': null,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 16,
    color: '#1A2530'
  },
  icon_like:{
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 36,
    width: 34,
    borderTopLeftRadius: 14,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
