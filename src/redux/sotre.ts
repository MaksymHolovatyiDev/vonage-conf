import {configureStore} from "@reduxjs/toolkit";

// Reducers
import { userReducer } from "./user";
import { sessionReducer } from "./session";
import { userOptionsReducer } from "./useOptions";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userOptions: userOptionsReducer,
    session: sessionReducer,
  },
});
