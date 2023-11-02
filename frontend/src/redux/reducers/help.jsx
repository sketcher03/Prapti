import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    complaints : [],
    feedbacks : [],
}


export const helpReducer = createReducer (initialState,{
    SetComplaints : (state) => {
        state.loading = true;
    }, 
    SetComplaintsSuccess: (state,action) => {
        state.loading = false;
        state.complaints = action.payload;
    },
    SetComplaintsFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload;
    },
    CreateFeedbackSuccess: (state, action) => {
        state.loading = false;
        state.feedbacks = [action.payload, ...state.Feedbacks];
    },
    CreateFeedbackFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }

})