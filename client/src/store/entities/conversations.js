import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "chats",
  initialState: [],
  reducers: {
    chatsLoaded: (chats, action) => {
      chats = action.payload.chats;
    },
  },
});

export const { chatsLoaded } = slice.actions;
export default slice.reducer;
