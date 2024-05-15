import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDepartment = createAsyncThunk(
  "department/fetchDepartment",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/departments");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateDepartment = createAsyncThunk(
  "department/update",
  async ({ departmentId, department }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/departments/${departmentId}`,
        department
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addDepartment = createAsyncThunk(
  "department/add",
  async (departmentName, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/departments", {
        department_name: departmentName,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const DepartmentSlice = createSlice({
  name: "department",
  initialState: {
    departments: [],
    fetchDepartmentStatus: "idle",
    updateDepartmentStatus: "idle",
    addDepartmentStatus: "idle",
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
        state.error = null;
      })
      .addCase(fetchDepartment.rejected, (state, action) => {
        state.fetchDepartmentStatus = "failed";
        state.error = action.payload;
      })
      .addCase(updateDepartment.pending, (state, action) => {
        state.updateDepartmentStatus = "loading";
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.updateDepartmentStatus = "succeeded";
        state.departments = state.departments.map((department) =>
          department.department_id === action.payload.department_id
            ? action.payload
            : department
        );
        state.error = null;
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.updateDepartmentStatus = "failed";
        state.error = action.payload;
      })
      .addCase(addDepartment.pending, (state) => {
        state.addDepartmentStatus = "loading";
        state.error = null;
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.addDepartmentStatus = "succeeded";
        state.departments.push(action.payload);
        state.error = null;
      })
      .addCase(addDepartment.rejected, (state, action) => {
        state.addDepartmentStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default DepartmentSlice.reducer;
