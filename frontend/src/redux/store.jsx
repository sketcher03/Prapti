import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user"
import { requestsReducer } from "./reducers/requests";
import { projectsReducer } from "./reducers/projects"

const Store = configureStore({
    reducer: {
        user: userReducer,
        requests: requestsReducer,
        projects: projectsReducer,
    }
});

export default Store;