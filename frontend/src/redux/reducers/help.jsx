import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    complaints : [],
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
    }

})