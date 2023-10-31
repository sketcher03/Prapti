import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    order: {},
    postSuccess: false,
}

export const ordersReducer = createReducer(initialState, {
    SetOrders: (state) => {
        state.loading = true;
    },
    SetBuyerOrdersSuccess: (state, action) => {
        state.loading = false;
        state.orders = action.payload;
    },
    SetBuyerOrdersFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    SetSellerOrdersSuccess: (state, action) => {
        state.loading = false;
        state.orders = action.payload;
    },
    SetSellerOrdersFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    SetOrderSuccess: (state, action) => {
        state.loading = false;
        state.order = action.payload;
    },
    SetOrderFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    CreateOrderSuccess: (state, action) => {
        state.loading = false;
        state.orders = [action.payload, ...state.requests];
    },
    CreateOrderFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
});