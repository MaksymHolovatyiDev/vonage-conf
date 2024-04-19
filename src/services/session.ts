import { createAsyncThunk } from "@reduxjs/toolkit";

// Constants
import { SessionThunkPrefix } from "@/utils/constants";

import axios from "./axios";


const BASE_URL = "/Session";

export const getSession = createAsyncThunk(SessionThunkPrefix.getSession, async(id?: string) =>{
    const response = await axios.post(BASE_URL, {id});
  
    return response.data;
});