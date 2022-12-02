import { configureStore } from "@reduxjs/toolkit";
import regReducers from "./authSlice";
import accountSice from "./accountSice";
export const store = configureStore({
  reducer: {
    auth: regReducers,
    account:accountSice,
  },
});
