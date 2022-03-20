import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "navigation",
  initialState: {
    currentTab: "CHATS",
    chatPing: false,
    groupPing: false,
    requestPing: false,
  },
  reducers: {
    navigatedToChats: (navigate, action) => {
      navigate.currentTab = "CHATS";
      navigate.chatPing = false;
    },
    navigatedToGroups: (navigate, action) => {
      navigate.currentTab = "GROUPS";
      navigate.groupPing = false;
    },
    navigatedToRequests: (navigate, action) => {
      navigate.currentTab = "REQUESTS";
      navigate.requestPing = false;
    },
    navigatedToSearch: (navigate, action) => {
      navigate.currentTab = "SEARCH";
    },
    chatPinged: (navigate, action) => {
      navigate.chatPing = true;
    },
    groupPinged: (navigate, action) => {
      navigate.groupPing = true;
    },
    requestPinged: (navigate, action) => {
      navigate.requestPing = true;
    },
  },
});

export const {
  navigatedToChats,
  navigatedToGroups,
  navigatedToRequests,
  navigatedToSearch,
  chatPinged,
  groupPinged,
  requestPinged,
} = slice.actions;

export default slice.reducer;
