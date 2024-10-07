import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";  
import "./index.css";
import reduxStore from "./store/redux";
import router from "./routes";

const { store, persistor } = reduxStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          className={"toast-message"}
          autoClose={2000}
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
