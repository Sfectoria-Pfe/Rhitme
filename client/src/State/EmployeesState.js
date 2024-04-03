import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const response = await axios.get("http://localhost:3000/employees.json");
    const sortedEmployees = response.data.sort((a, b) =>
      a.first_name.localeCompare(b.first_name)
    );

    return sortedEmployees;
  }
);

export const EmployeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateEmployees(state, action) {
      state.employees = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEmployees.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateEmployees } = EmployeesSlice.actions;

export default EmployeesSlice.reducer;
