import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chat: false,
    conversation: {},
  },
  reducers: {
    showChat: (state, action) => {
      state.chat = true;
      state.conversation = action.payload;
      console.log(action.payload);
    },
    hideChat: (state) => {
      state.chat = false;
    },
  },
});

export const { hideChat, showChat, setConversationID } = chatSlice.actions;

export default chatSlice.reducer;
