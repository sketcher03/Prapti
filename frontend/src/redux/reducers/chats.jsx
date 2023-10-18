import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    chats: [],
    selectedChat: {
        users: [{
            profilePic: ''
        },
        {
            profilePic: ""
        }],
        latestMessage: ""
    },
}

export const chatsReducer = createReducer(initialState, {
    SetChats: (state) => {
        state.loading = true;
    },
    SetChatsSuccess: (state, action) => {
        state.loading = false;
        state.chats = action.payload;
    },
    SetSelectedChatSuccess: (state, action) => {
        state.loading = false;
        state.selectedChat = action.payload;
        //state.reciever = action.payload;
    },
    SetChatsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    CreateChatSuccess: (state, action) => {
        state.loading = false;
        state.chats = [action.payload, ...state.chats];
    },
    dissolveErrors: (state) => {
        state.error = null;
    },
});
