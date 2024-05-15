import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReports = createAsyncThunk(
  "reports/fetchReports",
  async () => {
    const response = await axios.get("http://localhost:3000/reports");
    return response.data;
  }
);

export const fetchReportById = createAsyncThunk(
  "reports/fetchReportById",
  async (reportId) => {
    const response = await axios.get(
      `http://localhost:3000/reports/${reportId}`
    );
    return response.data;
  }
);

export const createReport = createAsyncThunk(
  "reports/createReport",
  async (reportData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/reports",
        reportData
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteReport = createAsyncThunk(
  "reports/deleteReport",
  async (reportId) => {
    await axios.delete(`http://localhost:3000/reports/${reportId}`);
    return reportId;
  }
);

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    reports: [],
    report: {},
    fetchReportsStatus: "idle",
    fetchReportByIdStatus: "idle",
    createReportStatus: "idle",
    deleteReportStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.fetchReportsStatus = "loading";
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.fetchReportsStatus = "succeeded";
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.fetchReportsStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchReportById.pending, (state) => {
        state.fetchReportByIdStatus = "loading";
      })
      .addCase(fetchReportById.fulfilled, (state, action) => {
        state.fetchReportByIdStatus = "succeeded";
        state.report = action.payload;
      })
      .addCase(fetchReportById.rejected, (state, action) => {
        state.fetchReportByIdStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(createReport.pending, (state) => {
        state.createReportStatus = "loading";
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.createReportStatus = "succeeded";
        state.reports.push(action.payload);
      })
      .addCase(createReport.rejected, (state, action) => {
        state.createReportStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteReport.pending, (state) => {
        state.deleteReportStatus = "loading";
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.deleteReportStatus = "succeeded";
        state.reports = state.reports.filter(
          (report) => report.report_id !== action.payload
        );
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.deleteReportStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default reportsSlice.reducer;
