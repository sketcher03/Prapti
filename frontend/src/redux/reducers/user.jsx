import { createReducer } from "@reduxjs/toolkit";

const defaultUser = {
    email: "",
    username: "",
    name: "",
    display_name: "",
    description: "",
    phoneNumber: 0,
    talents: [],
    profilePic: null,
    billingAddresses: [],
    role: "user",
    createdAt: null
};

const initialState = {
    isAuthenticated: false,
    user: defaultUser,
};

export const userReducer = createReducer(initialState, {
    SaveUserRequest: (state) => {
        state.loading = true;
    },
    SaveUserSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
    },
    SaveUserFailure: (state, action) => {
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