import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/context";

export const store = configureStore({
    reducer: {
        authStore: authReducer,
    },
});