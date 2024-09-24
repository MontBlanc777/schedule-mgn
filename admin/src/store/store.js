import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PERSIST,
    PURGE,
    REGISTER,
    PAUSE
} from  'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import globalReducer from './globalSlice';
import { userApi } from './user(for example)/userApi';
import userReducer from './user(for example)/userSlice';

import { progressApi } from './progress/api';
import progressReducer from './progress/slice';


const persistConfig = {
    key: 'schedule',
    storage,
    whitelist: ['global', 'progress', 'user']
    // whitelist: [userApi.reducerPath], // only persist token
    // blacklist: ['isLoggedIn'], // skip persisting this
};

const rootReducer = combineReducers({
    global: persistReducer(persistConfig, globalReducer),
    progress: persistReducer(persistConfig, progressReducer),
    user: persistReducer(persistConfig, userReducer),
    [ progressApi.reducerPath ]: progressApi.reducer,
    [ userApi.reducerPath ]: userApi.reducer
});


export const store = configureStore({
    reducer: rootReducer,

    
    // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE]
            }
        }).concat(userApi.middleware, progressApi.middleware),
});

export const persistor = persistStore(store);