import { combineReducers } from 'redux';
import storage  from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import persistReducer from 'redux-persist/es/persistReducer';

import userReducer from './userReducer';
import authReducer from './authReducer';
import appReducer from './appReducer';

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
    auth: persistReducer(authConfig, authReducer),
    app: appReducer
});

export default rootReducer;