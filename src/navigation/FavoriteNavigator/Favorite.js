import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoriteScreen from '../../screens/FavoriteScreen';

const Stack = createNativeStackNavigator();
const Favorite = () => {
    return (
      //
        <Stack.Navigator screenOptions={{}}>
            <Stack.Screen name="Favorite" component={FavoriteScreen} options={{
                    headerStyle: {
                        backgroundColor: '#F8F9FA',
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                }}/>
        </Stack.Navigator>
    );
}

export default Favorite;