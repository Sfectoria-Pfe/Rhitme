import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chat: false,
    conversationID: "",
  },
  reducers: {
    showChat: (state) => {
      state.chat = true;
    },
    hideChat: (state) => {
      state.chat = false;
    },
    setConversationID: (state, action) => {
      state.conversationID = action.payload;
    },
  },
});

export const { hideChat, showChat, setConversationID } = chatSlice.actions;

export default chatSlice.reducer;
