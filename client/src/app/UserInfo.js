import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {
        token: null,
        id: null,
        username: "",
        email: "",
        isAuth: false, // Whether the user is Authenticated or not
    },
};

// Creating the user slice
const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Set User Info after login or registration
        setUser: (state, action) => {
            state.user = { ...action.payload };
            localStorage.setItem("user", JSON.stringify(state.user));
            toast.success(`Welcome, ${action.payload.username} to AI-PPA!`);
        },
        // Clear User Info after logout
        clearUser: (state) => {
            state.user = {
                token: null,
                id: null,
                username: "",
                email: "",
                isAuth: false,
            };
            localStorage.removeItem("user");
            toast.success(`User logged out successfully`);
        },
        // Update Authentication status
        setUserAuthenticated: (state, action) => {
            state.user.isAuth = action.payload;
            localStorage.setItem("user", JSON.stringify(state.user));
            // toast.success(`Your Account verified successfully`);
        },

    }
});

// Export actions
export const {
    setUser,
    clearUser,
    setUserAuthenticated,
} = UserSlice.actions;

// Selectors to get specific parts of the state
export const selectCurrentUser = (state) => state.user.user;
export const selectUserAuthenticated = (state) => state.user.user.isAuth;

// Export the reducer
export default UserSlice.reducer;
