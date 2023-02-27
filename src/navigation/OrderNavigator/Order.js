import OrderScreen from '../../screens/OrderScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Order = () => {
    return (
      //
        <Stack.Navigator screenOptions={{}}>
            <Stack.Screen name="OrderScreen" component={OrderScreen} options={{
                    headerStyle: {
                        backgroundColor: '#F8F9FA',
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                }}/>
        </Stack.Navigator>
    );
}

export default Order;