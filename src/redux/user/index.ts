import { createSlice } from "@reduxjs/toolkit";

// Services
import { userSignUp, userSignIn } from "@/services/auth";

const initialState = {
  token: "",
  _id: "",
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.token = action.payload?.token;
      state._id = action.payload?._id;
      state.name = action.payload?.name;
    },
    setCurrentToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {
    builder
    .addCase(userSignIn.pending, ()=>{})
    .addCase(userSignIn.fulfilled, (state, action)=>{
        state.token = action.payload?.token;
        state._id = action.payload?._id;
        state.name = action.payload?.name;
    })
    .addCase(userSignIn.rejected, ()=>{})
    .addCase(userSignUp.pending, ()=>{})
    .addCase(userSignUp.fulfilled, (state, action)=>{
        state.token = action.payload?.token;
        state._id = action.payload?._id;
        state.name = action.payload?.name;
    })
    .addCase(userSignUp.rejected, ()=>{});
  },
});

export const userReducer = userSlice.reducer;
export const {setCurrentUser, setCurrentToken} = userSlice.actions;
