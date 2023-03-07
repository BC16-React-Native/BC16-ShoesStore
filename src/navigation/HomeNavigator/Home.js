import HomeScreen from '../../screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Home = () => {
    return (
      //
        <Stack.Navigator screenOptions={{}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                    headerStyle: {
                        backgroundColor: '#F8F9FA',
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                }}/>
        </Stack.Navigator>
    );
}

export default Home;