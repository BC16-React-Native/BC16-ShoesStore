import {AppRegistry, View} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from './App'; 
import {name as appName} from './app.json'; 
import { persistor, store } from './src/redux/store';
import FlashMessage from "react-native-flash-message";


const App_init = () => {
    return  (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <View style={{ flex: 1 }}>
                    <App />
                    <FlashMessage position= "top"  />   
                </View>
            </PersistGate>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => App_init); 
