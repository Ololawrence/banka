import { configureStore } from "@reduxjs/toolkit";
import regReducers from "./authSlice";
import accountSice from "./accountSice";
import transactionSlice from "./transactionSlice";
import allTransactionSlice from "./allTransactionSlice";
export const store = configureStore({
  reducer: {
    auth: regReducers,
    account: accountSice,
    transaction: transactionSlice,
    transact: allTransactionSlice,
  },
});
