import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { authReducer } from './authSlice';
import { lodegeReducer } from './lodgeSlice';
import { generalReducer } from './generalSlice';
import createTransform from 'redux-persist/es/createTransform';

const authTransform = createTransform(
  inboundState => {
    if ((inboundState as any)?.rememberMe) {
      return inboundState;
    } else {
      return {
        user: null,
        token: null,
        rememberMe: false,
      };
    }
  },
  outboundState => outboundState,
  { whitelist: ['auth'] },
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [authTransform],
};

const rootReducer = combineReducers({
  auth: authReducer,
  lodge: lodegeReducer,
  general: generalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
