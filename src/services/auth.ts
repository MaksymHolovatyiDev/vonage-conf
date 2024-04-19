import { createAsyncThunk } from "@reduxjs/toolkit";

// Constants
import { UserThunkPrefix } from "@/utils/constants";

import axios from "./axios";

const BASE_URL = "/Auth";

interface ISignInBody {
    login: string;
    password: string;
}

export const userSignIn = createAsyncThunk(UserThunkPrefix.signIn, async(body: ISignInBody) =>{
    const response = await axios.post(`${BASE_URL}/SignIn`, body);
  
    return response.data;
});

interface ISignUpBody extends ISignInBody {
    name: string;
}

export const userSignUp = createAsyncThunk(UserThunkPrefix.signUp, async(body: ISignUpBody) =>{
    const response = await axios.post(`${BASE_URL}/SignUp`, body);
  
    return response.data;
});

