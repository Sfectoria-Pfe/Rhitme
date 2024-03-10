import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    sidebar: true,
  },
  reducers: {
    showSidebar: (state) => {
      state.sidebar = true;
    },
    hideSidebar: (state) => {
      state.sidebar = false;
    },
  },
});

export const { showSidebar, hideSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
