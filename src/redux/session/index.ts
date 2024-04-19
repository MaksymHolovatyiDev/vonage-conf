import { createSlice } from "@reduxjs/toolkit";

// Services
import { getSession } from "@/services/session";

const initialState = {
  _id: "",
  sessionId: "",
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(getSession.pending, ()=>{})
    .addCase(getSession.fulfilled, (state, action) => {
        state._id = action.payload?._id;
        state.sessionId = action.payload?.sessionId;
    })
    .addCase(getSession.rejected, ()=>{});
  },
});

export const sessionReducer = sessionSlice.reducer;