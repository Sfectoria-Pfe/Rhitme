import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/employees");

      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/employees",
        employeeData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  "employee/fetchEmployeeById",
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/employees/${employeeId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/update",
  async ({ employeeId, employeeData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/employees/${employeeId}`,
        employeeData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/employees/${employeeId}`
      );
      return employeeId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const EmployeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    employee: {},
    status: "idle",
    employeeByIdStatus: "idle",
    error: null,
  },
  reducers: {
    changeEmployee: (state, action) => {
      state.employee = action.payload;
      console.log("employee");
      console.log(state.employee);
    },
    setEmployeeStatus: (state, action) => {
      const { employeeId, status } = action.payload;

      const employeeIndex = state.employees.findIndex(
        (employee) => employee.employee_id === employeeId
      );
      if (employeeIndex !== -1) {
        state.employees[employeeIndex].status = status;
      }
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
      })
      .addCase(createEmployee.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchEmployeeById.pending, (state, action) => {
        state.employeeByIdStatus = "loading";
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.employeeByIdStatus = "succeeded";
        state.employee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.employeeByIdStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteEmployee.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = state.employees.filter(
          (employee) => employee.employee_id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { changeEmployee, setEmployeeStatus } = EmployeesSlice.actions;

export default EmployeesSlice.reducer;
