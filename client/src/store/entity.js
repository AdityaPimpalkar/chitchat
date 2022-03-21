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
      entity.chat = action.payload;
    },
    groupSelected: (entity, action) => {
      entity.group = action.payload;
    },
    userSelected: (entity, action) => {
      entity.user = action.payload;
    },
    entityCleared: (entity, action) => {
      entity.user = {};
      entity.group = {};
      entity.user = {};
    },
    actionStarted: (entity, action) => {
      entity.actionLoading = true;
    },
    actionEnded: (entity, action) => {
      entity.actionLoading = false;
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
} = slice.actions;
export default slice.reducer;
