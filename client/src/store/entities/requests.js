import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    requestsLoaded: (requests, action) => {
      requests = action.payload.requests;
    },
    requestReceived: (requests, action) => {
      const request = { ...action.payload };
      requests = [request, ...requests];
    },
  },
});

export const { requestsLoaded, requestReceived } = slice.actions;
export default slice.reducer;
