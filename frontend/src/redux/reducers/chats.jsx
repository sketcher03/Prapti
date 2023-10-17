import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    chats: [],
}

export const chatsReducer = createReducer(initialState, {
    SetChats: (state) => {
        state.loading = true;
    },
    SetChatsSuccess: (state, action) => {
        state.loading = false;
        state.chats = action.payload;
    },
    SetChatsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    dissolveErrors: (state) => {
        state.error = null;
    },
});
