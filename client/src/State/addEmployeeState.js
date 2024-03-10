import { createSlice } from "@reduxjs/toolkit";

export const addSlice = createSlice({
  name: "add",
  initialState: {
    add: false,
  },
  reducers: {
    showAddWindow: (state) => {
      state.add = true;
    },
    hideAddWindow: (state) => {
      state.add = false;
    },
  },
});

export const { hideAddWindow, showAddWindow } = addSlice.actions;

export default addSlice.reducer;
