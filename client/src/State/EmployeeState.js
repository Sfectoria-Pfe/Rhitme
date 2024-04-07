import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await axios.get("http://localhost:3000/employees.json");
    const employee = response.data.find((obj) => obj.user_id === id);
    return employee;
  }
);

export const EmployeeSlice = createSlice({
  name: "employee",
  initialState: {
    selectedEmployee: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEmployeeById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedEmployee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default EmployeeSlice.reducer;
