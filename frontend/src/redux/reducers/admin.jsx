import { createReducer } from "@reduxjs/toolkit";

const defaultUser = {
    email: "",
    username: "",
    profilePic: "",
    name: "",
    display_name: "",
    description: "",
    phoneNumber: 0,
    profilePic: null,
    role: "admin",
    createdAt: null
};

const initialState = {
    isAuthenticated: false,
    user: defaultUser,
    role: "admin",
};

export const adminReducer = createReducer(initialState, {
    SaveAdminRequest: (state) => {
        state.loading = true;
    },
    SaveAdminSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.admin = action.payload;
    },
    SaveUAdminrFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },
    LogoutSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.success = action.payload;
    },
    LogoutFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = action.payload;
    },
    dissolveErrors: (state) => {
        state.error = null
    }
})