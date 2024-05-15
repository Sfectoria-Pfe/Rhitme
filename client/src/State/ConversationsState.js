import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchConversationsByEmployeeId = createAsyncThunk(
  "conversations/fetchConversationsByEmployeeId",
  async (employeeId) => {
    const response = await fetch(
      `http://localhost:3000/conversations/${employeeId}`
    );

    const data = await response.json();
    return data;
  }
);

const conversationsSlice = createSlice({
  name: "conversations",
  initialState: {
    conversations: [],
    status: "idle",
    error: null,
  },
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchConversationsByEmployeeId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchConversationsByEmployeeId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload;
      })
      .addCase(fetchConversationsByEmployeeId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default conversationsSlice.reducer;
