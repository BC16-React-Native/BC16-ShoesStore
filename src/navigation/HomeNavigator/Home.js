import HomeScreen from '../../screens/HomeScreen';
import DetailScreen from '../../screens/DetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Home = () => {
    return (
      //
        <Stack.Navigator screenOptions={{}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
            {/* <Stack.Screen name="Detail" 
                component={DetailScreen} 
                options={{
                    // headerShown: false,
                    headerStyle: {
                        backgroundColor: '#F8F9FA',
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                }}
            /> */}
        </Stack.Navigator>
    );
}

export default Home;