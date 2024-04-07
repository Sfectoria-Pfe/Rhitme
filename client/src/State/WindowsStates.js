import { createSlice } from "@reduxjs/toolkit";

export const windowsSlice = createSlice({
  name: "windows",
  initialState: {
    addOffer: false,
    addDepartment: false,
  },
  reducers: {
    showAddOfferWindow: (state) => {
      state.addOffer = true;
    },
    hideAddOfferWindow: (state) => {
      state.addOffer = false;
    },
    showAddDepartmentWindow: (state) => {
      state.addDepartment = true;
    },
    hideAddDepartmentWindow: (state) => {
      state.addDepartment = false;
    },
  },
});

export const {
  showAddOfferWindow,
  hideAddOfferWindow,
  hideAddDepartmentWindow,
  showAddDepartmentWindow,
} = windowsSlice.actions;

export default windowsSlice.reducer;
