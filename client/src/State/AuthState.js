import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

//   "email": "john.doe@example.com",
//   "password": "password123",

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { data } = await axios.post(
        "http://localhost:3000/auth/login",
        { email, password },
        api.headers
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("employee", JSON.stringify(data.employee));
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Couldn't login");
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    userInfo: {},
    userToken: null,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.userInfo = action.payload.employee;
        state.userToken = action.payload.token;
        console.log(state.userInfo);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
