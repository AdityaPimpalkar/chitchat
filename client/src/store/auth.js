import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    connected: false,
  },
  reducers: {
    userLoggedIn: (auth, action) => {
      auth.user = action.payload.user;
    },
    userConnected: (auth, action) => {
      auth.connected = true;
    },
    userDisConnected: (auth, action) => {
      auth.connected = false;
    },
  },
});

export const { userLoggedIn, userConnected, userDisConnected } = slice.actions;
export default slice.reducer;
