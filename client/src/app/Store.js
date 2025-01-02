import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserInfo.js";
import tasksReducer from "./tasksSlice.js"
import { notificationsReducer } from "./Notifications.js";

const Store = configureStore({
    reducer: {
        user: UserSlice,
        tasks: tasksReducer,
        notifications: notificationsReducer,
    }
});

export default Store;