import { createSlice } from "@reduxjs/toolkit";

export const diagnosticsSlice = createSlice({
  name: "diagnostics",
  initialState: {
    diagnostics_questions: null,
  },
  reducers: {
    setDiagnostics: (state, action) => {
      state.diagnostics_questions = action.payload;
    },
  },
});

export const { setDiagnostics } = diagnosticsSlice.actions;

export default diagnosticsSlice.reducer;
