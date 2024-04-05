import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAbsenceByEmployeeId = createAsyncThunk(
  "absence/fetchEmployeeById",
  async (id) => {
    const response = await axios.get("http://localhost:3000/absences.json");

    const absences = response.data.filter(
      (obj) => obj.employee_id.toString() === id.toString()
    );

    return absences;
  }
);

export const AbsenceSlice = createSlice({
  name: "absence",
  initialState: {
    absences: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAbsenceByEmployeeId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAbsenceByEmployeeId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.absences = action.payload;
      })
      .addCase(fetchAbsenceByEmployeeId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default AbsenceSlice.reducer;
