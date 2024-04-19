import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    microOn: true,
    videoOn: true,
};

const userOptionsSlice = createSlice({
  name: "userOptions",
  initialState,
  reducers: {
    toggleUserMicro: (state) => {
      state.microOn = !state.microOn;
    },
    toggleUserVideo: (state) => {
        state.videoOn = !state.videoOn;
      },
  },
});

export const userOptionsReducer = userOptionsSlice.reducer;
export const { toggleUserMicro, toggleUserVideo } = userOptionsSlice.actions;
