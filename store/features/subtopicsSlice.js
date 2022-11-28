import { createSlice } from "@reduxjs/toolkit";

export const subtopicSlice = createSlice({
  name: "subtopics",
  initialState: {
    subtopics: null
  },
  reducers: {
    setSubtopics: (state, action) => {
      console.log('===========>state', action.payload);
      state.subtopics = action.payload;
    },
  },
});
export const { setSubtopics } = subtopicSlice.actions;

export default subtopicSlice.reducer;
