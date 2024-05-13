import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMessagesByConversation = createAsyncThunk(
  "messages/fetchMessagesByConversation",
  async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/messages/${id}`);

      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "messages/deleteMessage",
  async (id) => {
    try {
      await axios.delete(`http://localhost:3000/messages/${id}`);
      return id;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const createMessage = createAsyncThunk(
  "messages/createMessage",
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/messages", {
        conversation_id: messageData.conversationId,
        content: messageData.content,
        employee_id: messageData.employeeId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const MessagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    status: "idle",
    error: null,
    deleteStatus: "idle",
  },
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
      console.log(state.messages);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMessagesByConversation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMessagesByConversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessagesByConversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createMessage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteMessage.pending, (state, action) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.messages = state.messages.filter(
          (message) => message.message_id !== action.payload
        );
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addMessage } = MessagesSlice.actions;

export default MessagesSlice.reducer;
