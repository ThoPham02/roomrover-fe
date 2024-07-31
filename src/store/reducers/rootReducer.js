import { combineReducers } from 'redux';
import storage  from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import userReducer from './userReducer';
import authReducer from './authReducer';
import persistReducer from 'redux-persist/es/persistReducer';

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLogined', 'token']
}

const rootReducer = combineReducers({
    user: userReducer,
    auth: persistReducer(authConfig, authReducer)
});

export default rootReducer;