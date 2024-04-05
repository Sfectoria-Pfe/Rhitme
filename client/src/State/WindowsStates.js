import { createSlice } from "@reduxjs/toolkit";

export const windowsSlice = createSlice({
  name: "windows",
  initialState: {
    addOffer: false,
  },
  reducers: {
    showAddOfferWindow: (state) => {
      state.addOffer = true;
    },
    hideAddOfferWindow: (state) => {
      state.addOffer = false;
    },
  },
});

export const { showAddOfferWindow, hideAddOfferWindow } = windowsSlice.actions;

export default windowsSlice.reducer;
