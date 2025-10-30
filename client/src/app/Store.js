import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserInfo.js";
import tasksReducer from "./tasksSlice.js"
import { notificationsReducer } from "./Notifications.js";
import themeSlice from "./darkMode.js"

const Store = configureStore({
    reducer: {
        user: UserSlice,
        tasks: tasksReducer,
        notifications: notificationsReducer,
        theme: themeSlice,
    }
});

export default Store;