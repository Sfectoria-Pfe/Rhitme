import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    const response = await axios.get(
      "http://localhost:3000/notifications.json"
    );

    return response.data;
  }
);

export const NotificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNotifications.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default NotificationsSlice.reducer;
