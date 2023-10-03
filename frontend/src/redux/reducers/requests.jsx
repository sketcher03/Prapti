import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    requests: [],
    postSuccess: false,
};

export const requestsReducer = createReducer(initialState, {
    SetRequests: (state) => {
        state.loading = true;
    },
    SetRequestsSuccess: (state, action) => {
        state.loading = false;
        state.requests = action.payload;
    },
    SetRequestsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    CreateRequestSuccess: (state, action) => {
        state.loading = true;
        state.postSuccess = true;
        state.requests = action.payload;
    },
    CreateRequestFailure: (state, action) => {
        state.postSuccess = false;
        state.error = action.payload;
    },
    DeleteRequest: (state, action) => {
        state.requests = state.requests.filter((request) => request._id !== action.payload._id);
    },
    dissolveErrors: (state) => {
        state.error = null;
  },
});