import { createSlice } from "@reduxjs/toolkit";

export const gradeSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    logout: (state) => {
      state.profile = null;
      state.token = null;
    },
  },
});

export const { setToken, removeToken, setProfile, logout } = gradeSlice.actions;

export default gradeSlice.reducer;
