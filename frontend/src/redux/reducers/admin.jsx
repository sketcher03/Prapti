import { createReducer } from "@reduxjs/toolkit";

const defaultAdmin = {
    email: "",
    username: "",
    profilePic: "",
    fname: "",
    lname: "",
    phoneNumber: 0,
    profilePic: null,
    createdAt: null
};

const initialState = {
    isAdminAuthenticated: false,
    admin: defaultAdmin,
};

export const adminReducer = createReducer(initialState, {
    SaveAdmin: (state) => {
        state.loading = true;
    },
    SaveAdminSuccess: (state, action) => {
        state.isAdminAuthenticated = true;
        state.loading = false;
        state.admin = action.payload;
    },
    SaveUAdminrFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAdminAuthenticated = false;
    },
    LogoutSuccess: (state, action) => {
        state.loading = false;
        state.isAdminAuthenticated = false;
        state.success = action.payload;
    },
    LogoutFailure: (state, action) => {
        state.loading = false;
        state.isAdminAuthenticated = true;
        state.error = action.payload;
    },
    dissolveErrors: (state) => {
        state.error = null
    }
})