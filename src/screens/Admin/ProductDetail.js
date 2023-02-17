import { Keyboard,View,StyleSheet, Text, TouchableOpacity, Image, Animated, KeyboardAvoidingView, ScrollView, FlatList, Alert} from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState} from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import { heightScreen, widthScreen } from '../../utility'
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import AnimatedLib from 'react-native-reanimated'
import FieldTextInput from '../../components/Auth/FieldTextInput';
import FieldButton from '../../components/Auth/FieldButton';
import Loader from '../../components/Auth/Loader';
import firestore from '@react-native-firebase/firestore'
import DropDownPicker from 'react-native-dropdown-picker';
// import Carousel, {ParallaxImage, Pagination } from 'react-native-new-snap-carousel';

const DetailScreen = ({route}) => {
  
  const [item,setItem] = useState(route.params.item);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(item?.categoryid);
  console.log("value",value);
  console.log('item', item);
    const navigation = useNavigation();
    useLayoutEffect(() => { 
        navigation.setOptions({ 
          title: 'Detail',
          headerLeft : () => (    
                <TouchableOpacity onPress={() => navigation.goBack()} 
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    height: heightScreen * 0.0566,
                    width: widthScreen * 0.112,
                    borderRadius: widthScreen * 0.056
                  }}
                >
                    <FontAwesome name="angle-left" size={24} color="black" />
                </TouchableOpacity>
          ), 
        }) 
      }, []);
      const fetchCategories = async () => {
        const categoriesSnapshot = await firestore().collection('category').get();
        const categoriesList = categoriesSnapshot.docs.map(doc => ({ label: doc.data().name, value: doc.id }));
        setCategories(categoriesList);
      }
      useEffect(() => {
        fetchCategories();
      }, []);
      const handleCategoryChange = (value) => {
        setCategory(value);
      }
      console.log("categories",categories)
      const headerMotion = useRef(new Animated.Value(0)).current;
      const dispatch = useDispatch();
        // function handle animation 
        const animatedKeyBoard = (motion, value, duration) => {
          Animated.timing(
                motion,
                {
                    toValue:value,
                    duration: duration,
                    speed: Platform.OS == 'ios'? 60 : 50,
                    useNativeDriver:false
                    
                }
            ).start();
        }
        // hanlde to avoid view when showing key board
        useEffect(()=> {
            const SHOW_KEYBOARD_EVENT = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
            const HIDE_KEYBOARD_EVENT = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
            const showSubscription = Keyboard.addListener(SHOW_KEYBOARD_EVENT,() =>{
                animatedKeyBoard(headerMotion, heightScreen * -0.27, 400);
            })
            const hideSubscription = Keyboard.addListener(HIDE_KEYBOARD_EVENT, () => {
                animatedKeyBoard(headerMotion, 0, 400);
            })
            return () => {
                showSubscription.remove()
                hideSubscription.remove();
            }
            
        },[]);
        const [images, setImages] = useState(null);
        const [uploading, setUploading] = useState(false);
        const [transferred, setTransferred] = useState(0);
        const [loading, setLoading] = useState(false);
        const handleUpdate = async () => {
          setLoading(true);
          // setEdit(!edit);
          let imgUrls = await uploadImages();
          if( imgUrls == null) {
            firestore()
            .collection('products')
            .doc(item.id)
            .update({
              name: item.name,
              amount: item.amount,
              prices: item.prices,
              categoryid: value,
              info: item.info,
              datecreate: new Date().toISOString(),
            })
            .then(() => {
              console.log('Product Updated!');
              setLoading(false);
              Alert.alert(
                'Product Updated!',
                'Your product has been updated successfully.',
              );
            })
            .catch((err) => {
              console.log(err);
            });
        }
        else {
          const newImages = {};
          if (imgUrls) {
            for (let i = 0; i < imgUrls.length; i++) {
              newImages[`image${i}`] = imgUrls[i];
            }
          }
          firestore()
            .collection('products')
            .doc(item.id)
            .update({
              name: item.name,
              amount: item.amount,
              categoryid: value,
              datecreate: new Date.now().toUTCString(),
              images: newImages,
            })
            .then(() => {
              console.log('Product Updated!');
              setLoading(false);
              Alert.alert(
                'Product Updated!',
                'Your product has been updated successfully.',
              );
            })
            .catch((err) => {
              console.log(err);
            });
        }
          
        };
      const uploadImages = async () => {
        if (!images || images.length === 0) {
          return null;
        }
        else {
          const urls = [];
      
        for (let i = 0; i < images.length; i++) {
          const uploadUri = images[i];
          let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
          const extension = filename.split('.').pop();
          const name = filename.split('.').slice(0, -1).join('.');
          filename = name + Date.now() + '.' + extension;
          setUploading(true);
          setTransferred(0);
          const storageRef = storage().ref(`productimgs/${filename}`);
          const task = storageRef.putFile(uploadUri);
      
          task.on('state_changed', (taskSnapshot) => {
            console.log(
              `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
      
            setTransferred(
              Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
            );
          });
      
          try {
            await task;
      
            const url = await storageRef.getDownloadURL();
      
            urls.push(url);
          } catch (e) {
            console.log(e);
            return null;
          }
        }
      
        setUploading(false);
        setImages(null);
      
        return urls;
        }
        
      };
    
      const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          cropping: true,
          multiple: true,
          compressImageQuality: 0.7,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          setImages(imageUri);
          this.bs.current.snapTo(1);
        });
      };
    
      const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          compressImageQuality: 0.7,
          multiple: true,
        }).then(response => {
            setImages(response);
            console.log(response);
            
        //   const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        //   setImage(imageUri);
          this.bs.current.snapTo(1);
          
        });
      };

          bs = React.createRef();
          fall = new AnimatedLib.Value(1);
        renderHeader = () => (
          <View style={styles.header}>
            <View style={styles.panelHeader}>
              <View style={styles.panelHandle} />
            </View>
          </View>
        );
        renderInner = () => (
          <View style={styles.panel}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.panelTitle}>Upload Photo</Text>
              <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={takePhotoFromCamera}>
              <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={choosePhotoFromLibrary}>
              <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={() => this.bs.current.snapTo(1)}>
              <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        );


  return (
    <SafeAreaView style= {styles.container}>
        <BottomSheet
        ref={bs}
        snapPoints={[heightScreen * 0.38, - heightScreen * 0.30]}
        showSubscription={{}}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enableContentGestures={true}
        />
        <AnimatedLib.View
        style={{
          opacity: AnimatedLib.add(0.1, AnimatedLib.multiply(fall, 1.0)),
        }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
          <ScrollView>
            <Animated.View style = {[styles.containerHeader, {marginTop: headerMotion}]}>
              <Text style={styles.textProfile}>Update Product</Text>
              <View style = {styles.containerImg}>
                <FlatList
                  data={item?.images}
                  // horizontal={false}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  renderItem={({item,index}) => <View
                  style = {{
                    backgroundColor:'#F8F9FA',
                    shadowColor: "#000",
                    shadowOffset: {
                    width: 0,
                    height: heightScreen * 0.001,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,
              
                    elevation: 4,
                    marginHorizontal: widthScreen * 0.01,
                    borderRadius: 20
                  }}
      
                  ><Image 
                      source={{ uri: item }} 
                      style={{ width: 100, height: 100, borderRadius: 60/ 2, marginHorizontal: widthScreen * 0.01}} />
                      <TouchableOpacity onPress={() => {
                            const newImages = images.filter((img) => img !== item);
                            setImages(newImages);
                      }} style={styles.buttonDel}>
                        <Icon name='close-circle' color={'red'} size={20} style={styles.iconBack}/>
                  </TouchableOpacity></View>
                  }
                  keyExtractor={item => item.id}
                />
                <TouchableOpacity onPress={() => bs.current.snapTo(0)} style={styles.buttonCamera1}>
                <Icon name='camera-outline' color={'white'} size={20} style={styles.iconBack}/>
                </TouchableOpacity> 
                </View>
            </Animated.View>

            <View style={styles.containerBody}>
              <Text style={{fontSize:22, alignSelf: 'center', fontWeight: 'bold', marginTop: heightScreen * -0.01, textAlign:'center', lineHeight:32}}>{item?.name}</Text>
                {/* Text input Name*/}
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Name'}
                onChangeText={(txt) => setItem({...item, name: txt})}
                value={item?.name}
                onSubmitEditing={Keyboard.dismiss}
                stylesTitle={{fontWeight: 'bold'}}
                />
                <Text 
                  style={ [styles.titlecategory]}
                >Category</Text>
                <DropDownPicker
                    title = {'Name'}
                    open={open}
                    // placehoder = {value}
                    value={value}
                    items={categories}
                    setOpen={setOpen}
                    setValue = {setValue}
                    style= {styles.dropdown}
                    dropDownContainerStyle={{borderWidth:0.2,
                      backgroundColor: '#fafafa'
                    }}
                    itemStyle={{
                    justifyContent: 'flex-start'
                    }}
                    listItemContainerStyle = {{
                      borderRadius:20,
                    }}
                    labelStyle= {{paddingLeft: widthScreen * 0.02}}
                />

                {/* Text input Phone*/}
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Price'}
                onChangeText={(txt) => setItem({...item, prices: Number(txt)})}
                value={item?.prices.toString()}
                onSubmitEditing={Keyboard.dismiss}
                stylesTitle={{fontWeight: 'bold'}}
                />
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Amount'}
                onChangeText={(txt) => setItem({...item, amount: Number(txt)})}
                value={item?.amount.toString()}
                onSubmitEditing={Keyboard.dismiss}
                stylesTitle={{fontWeight: 'bold'}}
                />
                
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Description'}
                onChangeText={(txt) => setData({...item, info: txt})}
                value={item?.info}
                onSubmitEditing={Keyboard.dismiss}
                stylesTitle={{fontWeight: 'bold'}}
                />
                <FieldButton
                title={'Update'}
                // stylesTitle={{color:"#5B9EE1"}}
                onPress={handleUpdate}
                stylesContainer = {{ marginVertical:heightScreen * 0.02}}
                />

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        
        </AnimatedLib.View>
        
        <Loader visible={loading} />
        </SafeAreaView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F8F9FA',
        // borderWidth: 1,
    },

    buttonAdd:{
      backgroundColor: '#5B9EE1',
      paddingHorizontal: widthScreen * 0.08,
      paddingVertical: heightScreen * 0.02,
      borderRadius: 50
    },
    containerHeader: {
        height : heightScreen * 0.27,
        width: widthScreen,
        // paddingVertical: heightScreen * 0.10,
        paddingHorizontal: widthScreen * 0.075,
        // borderWidth:1
    },
    containerImg:{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: heightScreen * 0.08,
    },
    titlecategory:{
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 14,
      paddingLeft: widthScreen *0.02,
      marginVertical: heightScreen * 0.005,

    },
    dropdown:{
      borderRadius:20, 
      borderWidth:-1,
      backgroundColor:"#FFFFFF",
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: heightScreen * 0.001,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
      marginVertical: heightScreen *0.01
    },
    viewnimg:{
      marginLeft: heightScreen * 0.012,
      position: "absolute",
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: heightScreen * 0.001,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
    
      elevation: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        // height:heightScreen*0.2,
        // color: ORANGE_DARK,
        alignSelf:"center",
        textAlign:"center",
    },
    containerBody: {
        height : heightScreen ,
        paddingHorizontal: widthScreen * 0.075,
        
    },
    buttonBack: {
      position: 'absolute',
      width: widthScreen * 0.14,
      height: heightScreen * 0.067,
      backgroundColor: 'white',
      borderRadius: 40,
      marginLeft: widthScreen * 0.05,
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: heightScreen * 0.001,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
    
      elevation: 4,
    },
    iconBack:{
      alignSelf: 'center'
    },
    textProfile:{
      position: 'absolute',
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1A2530',
      alignSelf: 'center',
      marginTop: heightScreen * 0.02,
    },
    buttonCamera1:{
      position: 'absolute',
      width: widthScreen * 0.08,
      height: heightScreen * 0.036,
      backgroundColor: '#5B9EE1',
      borderRadius: 20,
      top: heightScreen * 0.2,
      justifyContent: 'center',
    },
    textAdd:{
      position: 'absolute',
      fontSize:20,
      fontWeight: 'bold',
      marginTop: heightScreen * 0.04,
      textAlign: 'center',
      marginLeft: widthScreen * 0.35
    },
    buttonDel:{
      borderRadius: 40,
      justifyContent: 'center',
      alignSelf: 'center',
      position: 'absolute',
      top: 0,
      right: 0
    },
    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: heightScreen * 0.022,
      width: '100%',
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      paddingTop: heightScreen * 0.025,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: widthScreen * 0.1,
      height: heightScreen * 0.01,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: heightScreen * 0.01,
    },
    panelTitle: {
      fontSize: 27,
      height: heightScreen * 0.04,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: heightScreen * 0.035,
      marginBottom: heightScreen * 0.005,
    },
    panelButton: {
      padding: widthScreen * 0.035,
      width : widthScreen * 0.85,
      borderRadius: 15,
      backgroundColor: '#5B9EE1',
      alignItems: 'center',
      alignSelf:'center',
      marginVertical: heightScreen * 0.01,
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
})