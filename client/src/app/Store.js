import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserInfo.js";
import tasksReducer from "./tasksSlice.js"

const Store = configureStore({
    reducer: {
        user: UserSlice,
        tasks: tasksReducer,
    }
});

export default Store;