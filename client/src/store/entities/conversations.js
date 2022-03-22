import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "chats",
  initialState: [],
  reducers: {
    chatsLoaded: (chats, action) => {
      chats = action.payload.chats;
      return chats;
    },
    chatAdded: (chats, action) => {
      const chat = { ...action.payload };
      chat.hasNewMessage = true;
      chats = [chat, ...chats];
      return chats;
    },
    messageReceived: (chats, action) => {
      const { content, from, to, sentOn } = action.payload;
      const userIndex = chats.findIndex((u) => u.userId === from);
      chats[userIndex].hasNewMessage = true;
      if (content) chats[userIndex].lastMessage = { content, from, to, sentOn };
      return chats;
    },
    messageSent: (chats, action) => {
      const { userId } = action.payload.user;
      const userIndex = chats.findIndex((u) => u.userId === userId);
      chats[userIndex].lastMessage = { ...action.payload.content };
      return chats;
    },
    messageSeen: (chats, action) => {
      const from = action.payload;
      const userIndex = chats.findIndex((u) => u.userId === from);
      chats[userIndex].hasNewMessage = false;
      return chats;
    },
  },
});

export const {
  chatsLoaded,
  chatAdded,
  messageReceived,
  messageSent,
  messageSeen,
} = slice.actions;
export default slice.reducer;
