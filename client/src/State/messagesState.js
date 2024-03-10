import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: false,
  },
  reducers: {
    showMessages: (state) => {
      state.messages = true;
    },
    hideMessages: (state) => {
      state.messages = false;
    },
  },
});

export const { showMessages, hideMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
