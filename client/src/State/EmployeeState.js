import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/employees/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, updatedEmployeeData }) => {
    const response = await axios.put(
      `http://localhost:3000/users/${id}`,
      updatedEmployeeData
    );

    return response.data;
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
        state.error = action.payload;
      });
  },
});

export default EmployeeSlice.reducer;
