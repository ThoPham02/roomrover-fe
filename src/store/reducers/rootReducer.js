import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import persistReducer from "redux-persist/es/persistReducer";

import authReducer from "./authReducer";
import appReducer from "./appReducer";
import contractReducer from "./contractReducer";
import inventReducer from "./inventReducer";
import paymentReducer from "./paymentReducer";

const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const authConfig = {
  ...commonConfig,
  key: "auth",
  whitelist: ["isLogined", "token", "user"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  app: appReducer,
  contract: contractReducer,
  invent: inventReducer,
  payment: paymentReducer,
});

export default rootReducer;
