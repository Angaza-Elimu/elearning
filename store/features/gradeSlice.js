import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setGrade } = gradeSlice.actions;

export default gradeSlice.reducer;
