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
    state.loading = false;
    state.requests = [action.payload, ...state.requests];
  },
  CreateRequestFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  DeleteRequestSuccess: (state, action) => {
    state.loading = false;
    state.requests = state.requests.filter(
      (request) => request._id !== action.payload._id
    );
  },
  DeleteRequestFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  EditRequestSuccess: (state, action) => {
    state.loading = false;
    state.requests = [action.payload, ...state.requests];
  },
  EditRequestFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  dissolveErrors: (state) => {
    state.error = null;
  },
});