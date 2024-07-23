import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || '',
    user: null,
    profile: null,
};

export const authSlice = createSlice({
    name: 'authStore',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload.user;
            state.profile = action.payload.profile;
            state.token = action.payload.token
        },
        clearUser: (state) => {
            state.user = null;
            state.profile = null;
            state.token = '';
        }

    }
});

export default authSlice.reducer;

export const { updateUser, clearUser } = authSlice.actions;