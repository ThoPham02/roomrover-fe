import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import rootReducer from "./reducers/rootReducer";

const reduxStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  const persistor = persistStore(store);

  return { store, persistor };
};

export default reduxStore;
