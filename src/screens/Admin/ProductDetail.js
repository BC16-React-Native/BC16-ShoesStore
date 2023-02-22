import { Keyboard,View,StyleSheet, Text, TouchableOpacity, Image, Animated, KeyboardAvoidingView, ScrollView, FlatList, Alert, Platform} from 'react-native'
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
import storage from '@react-native-firebase/storage'
import DropDownPicker from 'react-native-dropdown-picker';
import { get_ProductID } from '../../api/controller/products/getProducts';
import Feather from 'react-native-vector-icons/Feather';
// import Carousel, {ParallaxImage, Pagination } from 'react-native-new-snap-carousel';

const DetailScreen = ({route}) => {
  const item = route.params.item;
  const [items,setItem] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(item?.categoryid);
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
        const selectedCategory = categories.find((category) => category.value === value);

        setCategories(categoriesList);
        // setCategory(selectedCategory.label)
      }

      useEffect(() => {
        get_ProductID(setItem, item?.id);
        fetchCategories();
        setImages(item?.images)
      }, []);
      console.log("categories",category)
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
        const [images, setImages] = useState(items?.images);
        const [imagesnew, setnewImages] = useState(null);
        const [uploading, setUploading] = useState(false);
        const [transferred, setTransferred] = useState(0);
        const [loading, setLoading] = useState(false);

        const handleUpdate = async () => {
          setEdit(!edit)
          setLoading(true);
          let imgUrls = await uploadImages();
          if (imgUrls == null) {
            firestore()
              .collection('products')
              .doc(items.id)
              .update({
                name: items.name,
                amount: items.amount,
                prices: items.prices,
                categoryid: value,
                info: items.info,
                images: items?.images,
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
          } else {
            const newImages = [];
            const oldImages = items?.images;
              for (let i = 0; i < imgUrls.length; i++) {
                newImages.push(imgUrls[i]);
              }
              const allImages = [...oldImages, ...newImages];
              firestore()
              .collection('products')
              .doc(items.id)
              .update({
                name: items.name,
                amount: items.amount,
                categoryid: value,
                datecreate: new Date().toUTCString(),
                images: allImages,
                info: items.info,
                prices: items.prices
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
        if (!imagesnew || imagesnew.length === 0) {
          return null;
        }
        else {
          const urls = [];
      
        for (let i = 0; i < imagesnew.length; i++) {
          const uploadUri = imagesnew[i];
          let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
          const extension = filename.split('.').pop();
          const name = filename.split('.').slice(0, -1).join('.');
          filename = name + Date.now() + '.' + extension;
          setUploading(true);
          setTransferred(0);
          const storageRef = storage().ref(`productimgs/${value}/${filename}`);
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
            setLoading(false);
            return null;
          }
        }
      
        setUploading(false);
        // setImages(null);
        return urls;
        }
        
      };

      const [edit, setEdit] = useState(false);
      const handleEdit = () => {
        setEdit(!edit);
        console.log(edit)
      }

      
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
            const imagePaths = response.map(photo => (
              photo.sourceURL
            ));
            setImages(prevImages => prevImages ? [...prevImages, ...imagePaths] : imagePaths);
            setnewImages(imagePaths)
          this.bs.current.snapTo(1);
        });
        console.log('pathnew',imagesnew);
      };


      bs = React.useRef(null);
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
              <TouchableOpacity onPress={()=>navigation.navigate('BottomTabAdmin')} style={styles.buttonBack}>
                <Icon name='chevron-back-outline' color={'black'} size={30} style={styles.iconBack}/>
              </TouchableOpacity> 
              <TouchableOpacity onPress={handleEdit} style={styles.buttonEdit}>
                <Feather name='edit-3' color={'black'} size={30} style={styles.iconBack}/>
              </TouchableOpacity>
              <View style = {styles.containerImg}>
                <FlatList
                  data={images}
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
                      {edit?
                      <TouchableOpacity onPress={() => {
                            const newImages = images.filter((img) => img !== item);
                            firestore().collection('products')
                            .doc(items.id)
                            .update({
                                images: firestore.FieldValue.arrayRemove(item),
                            });
                            setImages(newImages);
                            // setItems();
                      }} style={styles.buttonDel}>
                        <Icon name='close-circle' color={'red'} size={20} style={styles.iconBack}/>
                  </TouchableOpacity>:<></>}
                  </View>
                  }
                  keyExtractor={item => item}
                />
                {edit?
                <TouchableOpacity onPress={() => bs.current.snapTo(0)} style={styles.buttonCamera1}>
                <Icon name='camera-outline' color={'white'} size={20} style={styles.iconBack}/>
                </TouchableOpacity> :<></>}
                </View>
            </Animated.View>

            <View style={styles.containerBody}>
              <Text style={{fontSize:22, alignSelf: 'center', fontWeight: 'bold', textAlign:'center', lineHeight:32, marginBottom: heightScreen * 0.02}}>{items?.name}</Text>
                {/* Text input Name*/}
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Name'}
                onChangeText={(txt) => setItem({...items, name: txt})}
                value={items?.name}
                editable={edit}
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
                    disabled={!edit}
                />

                {/* Text input Phone*/}
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Price'}
                onChangeText={(txt) => setItem({...items, prices: Number(txt)})}
                value={String(items?.prices)}
                editable={edit}
                onSubmitEditing={Keyboard.dismiss}
                stylesTitle={{fontWeight: 'bold'}}
                />
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                title={'Amount'}
                onChangeText={(txt) => setItem({...items, amount: Number(txt)})}
                value={String(items?.amount)}
                editable={edit}
                onSubmitEditing={Keyboard.dismiss}
                stylesTitle={{fontWeight: 'bold'}}
                />
                
                <FieldTextInput  
                stylesContainer={{marginVertical:heightScreen * 0.01}}
                stylesInput = {{padding:heightScreen * 0.1,}}
                title={'Description'}
                multiline = {true}
                onChangeText={(txt) => setItem({...items, info: txt})}
                value={items?.info}
                editable={edit}
                onSubmitEditing={Keyboard.dismiss}
                stylesTitle={{fontWeight: 'bold'}}
                />
                {edit?
                <FieldButton
                title={'Update'}
                // stylesTitle={{color:"#5B9EE1"}}
                onPress={handleUpdate}
                stylesContainer = {{ marginVertical:heightScreen * 0.07}}
                /> :<></>}

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
        marginTop: heightScreen * 0.1,
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
      top: heightScreen * 0.11,
      justifyContent: 'center',
    },
    buttonEdit:{
      position: 'absolute',
      width: widthScreen * 0.14,
      height: heightScreen * 0.067,
      backgroundColor: 'white',
      borderRadius: 40,
      right: widthScreen * 0.05,
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