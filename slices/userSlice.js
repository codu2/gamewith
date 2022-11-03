import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  follows: [],
  access_token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.user = action.payload;
    },
    setFollows: (state, action) => {
      state.follows = action.payload;
    },
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
  },
});

export const { signInUser, setFollows, setAccessToken } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectFollows = (state) => state.user.follows;
export const selectAccessToken = (state) => state.user.access_token;

export default userSlice.reducer;
