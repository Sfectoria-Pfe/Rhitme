import { createSlice } from "@reduxjs/toolkit";

export const passwordSlice = createSlice({
  name: "password",
  initialState: {
    password: false,
  },
  reducers: {
    showPasswordWindow: (state) => {
      state.password = true;
    },
    hidePasswordWindow: (state) => {
      state.password = false;
    },
  },
});

export const { hidePasswordWindow, showPasswordWindow } = passwordSlice.actions;

export default passwordSlice.reducer;
