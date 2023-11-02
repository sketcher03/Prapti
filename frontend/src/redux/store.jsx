import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user"
import { requestsReducer } from "./reducers/requests";
import { projectsReducer } from "./reducers/projects";
import { chatsReducer } from "./reducers/chats";
import { adminReducer } from "./reducers/admin";
import { helpReducer } from "./reducers/help";
import { ordersReducer } from "./reducers/orders";

const Store = configureStore({
    reducer: {
        user: userReducer,
        requests: requestsReducer,
        projects: projectsReducer,
        orders: ordersReducer,
        chats: chatsReducer,
        admin: adminReducer,
        help : helpReducer,
    }
});

export default Store;