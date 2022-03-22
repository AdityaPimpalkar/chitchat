import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    searchedFriend: (search, action) => {
      search = { ...action.payload };
      return search;
    },
    addedAsFriend: (search, action) => {
      search = { ...search, sentRequest: true, isAdded: false };
      return search;
    },
  },
});

export const { searchedFriend, addedAsFriend } = slice.actions;
export default slice.reducer;
