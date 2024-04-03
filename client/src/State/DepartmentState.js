import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDepartment = createAsyncThunk(
  "department/fetchDepartment",
  async () => {
    const response = await axios.get("http://localhost:3000/departements.json");

    return response.data;
  }
);

export const fetchDepartmentById = createAsyncThunk(
  "department/fetchDepartmentById",
  async (id) => {
    const response = await axios.get("http://localhost:3000/departements.json");
    const department = response.data.find((obj) => obj.department_id === id);
    return department;
  }
);

export const DepartmentSlice = createSlice({
  name: "department",
  initialState: {
    departments: [],
    selectedDepartment: null,
    fetchDepartmentStatus: "idle",
    fetchDepartmentByIdStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDepartment.pending, (state, action) => {
        state.fetchDepartmentStatus = "loading";
      })
      .addCase(fetchDepartment.fulfilled, (state, action) => {
        state.fetchDepartmentStatus = "succeeded";
        if (state.departments.length === 0) {
          state.departments = state.departments.concat(action.payload);
        }
      })
      .addCase(fetchDepartment.rejected, (state, action) => {
        state.fetchDepartmentStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDepartmentById.pending, (state, action) => {
        state.fetchDepartmentByIdStatus = "loading";
      })
      .addCase(fetchDepartmentById.fulfilled, (state, action) => {
        state.fetchDepartmentByIdStatus = "succeeded";
        state.selectedDepartment = action.payload;
      })
      .addCase(fetchDepartmentById.rejected, (state, action) => {
        state.fetchDepartmentByIdStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default DepartmentSlice.reducer;
