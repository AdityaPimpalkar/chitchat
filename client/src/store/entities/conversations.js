import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "chats",
  initialState: [],
  reducers: {
    chatsLoaded: (chats, action) => {
      chats = action.payload.chats;
    },
    chatAdded: (chats, action) => {
      const chat = { ...action.payload };
      chat.hasNewMessage = true;
      chats = [chat, ...chats];
    },
    messageReceived: (chats, action) => {
      const { content, from, to, sentOn } = action.payload;
      const userIndex = chats.findIndex((u) => u.userId === from);
      chats[userIndex].hasNewMessage = true;
      if (content) chats[userIndex].lastMessage = { content, from, to, sentOn };
    },
    messageSent: (chats, action) => {
      const { content, from, to, sentOn } = action.payload;
      const userIndex = chats.findIndex((u) => u.userId === from);
      if (content) chats[userIndex].lastMessage = { content, from, to, sentOn };
    },
    messageSeen: (chats, action) => {
      const from = action.payload;
      const userIndex = chats.findIndex((u) => u.userId === from);
      chats[userIndex].hasNewMessage = false;
    },
  },
});

export const { chatsLoaded, chatAdded, messageReceived, messageSeen } =
  slice.actions;
export default slice.reducer;
