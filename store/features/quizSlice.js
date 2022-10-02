import { createSlice } from "@reduxjs/toolkit";

export const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    score: {
        correctAnswer: 0,
        wrongAnswer: 0,
        totalScore: 0,
    }
  },
  reducers: {
    setScore: (state, action) => {
      state.score = action.payload;
    },
  },
});

export const { setScore } = quizSlice.actions;

export default quizSlice.reducer;
