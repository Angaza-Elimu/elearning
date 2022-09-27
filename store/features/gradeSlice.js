import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./profileSlice";

export const gradeSlice = createSlice({
  name: "grade",
  initialState: {
    grade: null,
    subject: null,
    topic: null,
  },
  reducers: {
    setGrade: (state, action) => {
      state.grade = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(logout, (state) => {
      state.grade = null;
    });
  },
});

export const { setGrade } = gradeSlice.actions;

export default gradeSlice.reducer;
