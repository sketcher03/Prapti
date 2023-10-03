import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user"
import { requestsReducer } from "./reducers/requests";

const Store = configureStore({
    reducer: {
        user: userReducer,
        requests: requestsReducer,
    }
});

export default Store;