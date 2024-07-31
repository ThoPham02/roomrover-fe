import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "./index.css";
import reduxStore from "./store/redux";
import AppRoute from "./routes";

const { store, persistor } = reduxStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoute />
        <ToastContainer
          position="top-right"
          className={"toast-message"}
          autoClose={2000}
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
