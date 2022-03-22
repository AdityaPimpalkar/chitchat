import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "entity",
  initialState: {
    chat: {},
    group: {},
    user: {},
    actionLoading: false,
  },
  reducers: {
    chatSelected: (entity, action) => {
      entity.chat = { ...action.payload };
    },
    groupSelected: (entity, action) => {
      entity.group = { ...action.payload };
    },
    userSelected: (entity, action) => {
      entity.user = { ...action.payload };
    },
    entityCleared: (entity, action) => {
      entity.chat = {};
      entity.group = {};
      entity.user = {};
    },
    actionStarted: (entity, action) => {
      entity.actionLoading = true;
    },
    actionEnded: (entity, action) => {
      entity.actionLoading = false;
    },
    chatConnected: (entity, action) => {
      entity.chat = { ...entity.chat, connected: true, lastSeen: null };
    },
    chatDisconnected: (entity, action) => {
      entity.chat = {
        ...entity.chat,
        connected: false,
        lastSeen: action.payload,
      };
    },
  },
});

export const {
  chatSelected,
  groupSelected,
  userSelected,
  entityCleared,
  actionStarted,
  actionEnded,
  chatConnected,
  chatDisconnected,
} = slice.actions;
export default slice.reducer;
