// src/features/themeSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false, // default is light mode
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export const selectTheme = (state) => state.theme.darkMode;
export default themeSlice.reducer;
