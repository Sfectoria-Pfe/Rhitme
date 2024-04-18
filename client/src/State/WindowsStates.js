import { createSlice } from "@reduxjs/toolkit";

export const windowsSlice = createSlice({
  name: "windows",
  initialState: {
    addOffer: false,
    addDepartment: false,
    addProject: false,
    taskDetails: {
      status: false,
      task: null,
    },
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
    showAddProjectWindow: (state) => {
      state.addProject = true;
    },
    hideAddProjectWindow: (state) => {
      state.addProject = false;
    },
    hideTaskDetailsWindow: (state) => {
      state.taskDetails.status = false;
      state.taskDetails.task = null;
    },
    showTaskDetailsWindow: (state, action) => {
      state.taskDetails.status = true;
      state.taskDetails.task = action.payload;
    },
  },
});

export const {
  showAddOfferWindow,
  hideAddOfferWindow,
  hideAddDepartmentWindow,
  showAddDepartmentWindow,
  showAddProjectWindow,
  hideAddProjectWindow,
  hideTaskDetailsWindow,
  showTaskDetailsWindow,
} = windowsSlice.actions;

export default windowsSlice.reducer;
