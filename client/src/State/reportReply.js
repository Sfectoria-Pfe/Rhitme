import { createSlice } from "@reduxjs/toolkit";

export const reportSlice = createSlice({
  name: "report",
  initialState: {
    report: false,
  },
  reducers: {
    showReportReply: (state) => {
      state.report = true;
    },
    hideReportReply: (state) => {
      state.report = false;
    },
  },
});

export const { showReportReply, hideReportReply } = reportSlice.actions;

export default reportSlice.reducer;
