import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    requestsLoaded: (requests, action) => {
      requests = action.payload;
    },
    requestReceived: (requests, action) => {
      const request = { ...action.payload };
      requests = [request, ...requests];
    },
    requestAccepted: (requests, action) => {
      const { userId } = action.payload;
      requests = requests.filter((request) => request.userId !== userId);
    },
  },
});

export const { requestsLoaded, requestReceived, requestAccepted } =
  slice.actions;
export default slice.reducer;
