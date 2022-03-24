import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "chats",
  initialState: [],
  reducers: {
    chatsLoaded: (chats, action) => {
      chats = action.payload;
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
      if (content)
        chats[userIndex].lastMessage = {
          content,
          from,
          to,
          sentOn: sentOn.toString(),
        };
    },
    messageSent: (chats, action) => {
      const { userId } = action.payload.user;
      const userIndex = chats.findIndex((u) => u.userId === userId);
      chats[userIndex].lastMessage = { ...action.payload.content };
    },
    messageSeen: (chats, action) => {
      const from = action.payload;
      const userIndex = chats.findIndex((u) => u.userId === from);
      chats[userIndex].hasNewMessage = false;
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

export const loadChats = (chats) => (dispatch, action) =>
  dispatch(chatsLoaded(chats));
