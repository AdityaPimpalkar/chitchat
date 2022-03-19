import { createSlice } from "@reduxjs/toolkit";

createSlice({
  name: "navigation",
  initialState: {
    currentTab: "CHATS",
    chatPing: false,
    groupPing: false,
    friendRequestPing: false,
  },
  reducers: {},
});
