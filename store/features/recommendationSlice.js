import { createSlice } from "@reduxjs/toolkit";

export const recommendationSlice = createSlice({
  name: "recommendation",
  initialState: {
    recommendations: null,
  },
  reducers: {
    setRecommendation: (state, action) => {
      state.recommendations = action.payload;
    },
  },
});

export const { setRecommendation } = recommendationSlice.actions;

export default recommendationSlice.reducer;
