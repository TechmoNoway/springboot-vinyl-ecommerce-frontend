import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
    key: 'root',
    storage,
    blacklist: ['webSocket'],
};

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
