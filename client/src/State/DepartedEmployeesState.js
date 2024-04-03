import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDepartedEmployees = createAsyncThunk(
  "departedemployees/fetchEmployees",
  async () => {
    const response = await axios.get(
      "http://localhost:3000/departedEmployees.json"
    );
    return response.data;
  }
);

export const DepartedEmployeesSlice = createSlice({
  name: "departedmployees",
  initialState: {
    departedEmployees: [],
    status: "idle",
    error: null,
  },
  reducer: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDepartedEmployees.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchDepartedEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.departedEmployees = action.payload;
      })
      .addCase(fetchDepartedEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default DepartedEmployeesSlice.reducer;
