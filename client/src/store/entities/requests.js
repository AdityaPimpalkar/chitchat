import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    requestsLoaded: (requests, action) => {
      requests = [...action.payload];
      return requests;
    },
    requestReceived: (requests, action) => {
      console.log(requests);
      const request = { ...action.payload };
      requests = [request, ...requests];
      return requests;
    },
    requestAccepted: (requests, action) => {
      const { userId } = action.payload;
      requests = requests.filter((request) => request.userId !== userId);
      return requests;
    },
  },
});

export const { requestsLoaded, requestReceived, requestAccepted } =
  slice.actions;
export default slice.reducer;
