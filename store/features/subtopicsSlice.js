import { createSlice } from "@reduxjs/toolkit";

export const subtopicSlice = createSlice({
  name: "subtopics",
  initialState: {
    subtopics: null
  },
  reducers: {
    setSubtopics: (state, action) => {
      state.subtopics = action.payload;
    },
  },
});

export const { setSubtopics } = subtopicSlice.actions;

export default subtopicSlice.reducer;
