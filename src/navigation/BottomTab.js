// import { StyleSheet, Text, View } from 'react-native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AntDesign from "react-native-vector-icons/AntDesign"
// import Ionicons from "react-native-vector-icons/Ionicons"
// import Feather from "react-native-vector-icons/Feather"
// import React from 'react'
// import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import FavoriteScreen from '../screens/FavoriteScreen';
// import OrderScreen from '../screens/OrderScreen';
// import { heightScreen, widthScreen } from '../utility';


// const Tab = createBottomTabNavigator();
// const BottomTab = () => {
//   return (
//     <Tab.Navigator 
//             screenOptions={{
//                 tabBarActiveTintColor: '#5B9EE1',
//                 borderTopLeftRadius:21,
//                 headerShown: false,
//                 tabBarStyle: {
//                     borderTopLeftRadius: 24,
//                     borderTopRightRadius: 24,
//                     height: heightScreen * 0.1,
//                     backgroundColor:'#F8F9FA',
//                     paddingTop: heightScreen * 0.009,
//                 }
//             }}
//         >
//         <Tab.Screen name="Home" component={HomeScreen} 
//             options={{
//                 tabBarIcon:({color,size}) => (
//                     <View style={{flex:1, borderColor: color == '#5B9EE1' ? color : 'white', borderBottomWidth: 2, alignItems: 'center', justifyContent:'center'}}>
//                         <Feather name="home" size={size} color={color}/>
//                         {/* <View style={{backgroundColor: color}}/> */}
//                     </View>
//                 ),
//                 tabBarLabel: '',
//             }}
//         />

//         <Tab.Screen name="Favorite" component={FavoriteScreen} 
//             options={{
//                 tabBarIcon:({color,size}) => (
//                     <View style={{flex:1, borderColor: color == '#5B9EE1' ? color : 'white', borderBottomWidth: 2, alignItems: 'center', justifyContent:'center'}}>
//                         <Feather name="heart" size={size} color={color}/>
//                     </View>
//                 ),
//                 tabBarLabel: '',
//             }}
//         />

//         <Tab.Screen name="Order" component={OrderScreen} 
//             options={{
//                 tabBarIcon:({color,size}) => (
//                     <View style={{flex:1, borderColor: color == '#5B9EE1' ? color : 'white', borderBottomWidth: 2, alignItems: 'center', justifyContent:'center'}}>
//                         <Feather name="shopping-bag" size={size} color={color}/>
//                     </View>
//                 ),
//                 tabBarLabel: '',
//             }}
//         />

//         <Tab.Screen name="Profile" component={ProfileScreen} 
//             options={{
//                 tabBarIcon:({color,size}) => (
//                     <View style={{flex:1, borderColor: color == '#5B9EE1' ? color : 'white', borderBottomWidth: 2, alignItems: 'center', justifyContent:'center'}}>
//                         <Feather name="user" size={size} color={color} />
//                     </View>
//                 ),
//                 tabBarLabel: '',
//             }}
//         />
//     </Tab.Navigator>
//   )
// }

// export default BottomTab

// const styles = StyleSheet.create({})

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import OrderScreen from '../screens/OrderScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from '../utility/icons/index';
// import ColorScreen from '../screens/ColorScreen';
import * as Animatable from 'react-native-animatable';
import { heightScreen, widthScreen } from '../utility';



const TabArr = [
  { route: 'Home', label: 'Home', type: Icons.Feather, icon: 'home', component: HomeScreen },
  { route: 'Favorite', label: 'Favorite', type: Icons.Feather, icon: 'heart', component: FavoriteScreen },
  { route: 'Order', label: 'Order', type: Icons.Feather, icon: 'shopping-bag', component: OrderScreen },
  { route: 'Profile', label: 'Profile', type: Icons.FontAwesome, icon: 'user-o', component: ProfileScreen },
];

const Tab = createBottomTabNavigator();

const animate1 = { 0: { scale: .5, translateY: 8 }, .92: { translateY: -28 }, 1: { scale: 1.2, translateY: -18 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <Icon type={item.type} name={item.icon} color={focused ? '#fff' : '#5B9EE1'} />
        </View>
        <Animatable.Text
          ref={textRef}
          style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

export default function AnimTab1() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS == 'ios'? 12 : 0,
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: heightScreen *0.016,
    right: widthScreen *0.02,
    left: widthScreen *0.02,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50, 
    borderRadius: 25,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B9EE1',
    borderRadius: 25, 
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: '#5B9EE1',
    // fontFamily: 'SF-Pro',
    fontWeight: 'bold'
  }
})