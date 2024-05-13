import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  try {
    const response = await axios.get("http://localhost:3000/roles");
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
});

export const roleSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default roleSlice.reducer;
