import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './authReducer';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {
  createStateSyncMiddleware,
  initMessageListener,
} from 'redux-state-sync';
import persistStore from 'redux-persist/es/persistStore';
import chatReducer from './chatReducer';

const persistConfig = {
  key: 'root',
  version:1, 
  storage,
  whitelist: ['auth', 'chat']
}

const reducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(createStateSyncMiddleware({
    blacklist: [PERSIST, REHYDRATE, PURGE],
  })),
  devTools: process.env.NODE_ENV !== 'production',
  });

  initMessageListener(store);

  export const persistor = persistStore(store)

