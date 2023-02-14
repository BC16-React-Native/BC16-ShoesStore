import {combineReducers, configureStore} from '@reduxjs/toolkit';
import stateReducer from './features/state/stateSlice'
import orderReducer from './features/order/orderSlice'
import authReducer from './features/auth/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  version: 1,
  storage:AsyncStorage,
}

const rootReducer = combineReducers({
  state: stateReducer,
  orders: orderReducer,
  auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
