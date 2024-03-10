import { createSlice } from "@reduxjs/toolkit";

export const deleteSlice = createSlice({
  name: "delete",
  initialState: {
    delete: false,
  },
  reducers: {
    showDeleteWindow: (state) => {
      state.delete = true;
    },
    hideDeleteWindow: (state) => {
      state.delete = false;
    },
  },
});

export const { hideDeleteWindow, showDeleteWindow } = deleteSlice.actions;

export default deleteSlice.reducer;
