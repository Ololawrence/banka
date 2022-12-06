import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../Url";
import axios from "axios";


const initialState = {
  allTransaction: {},
  debit: {},
  credit: {},
  creditSuccess: "",
  debitSuccess: "",
  transactionSuccess:""
};


export const getAllTransaction = createAsyncThunk(
  "transaction/setUser",
  async (value, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const options = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        method: "GET",
        "x-access-token": token,
      };
       let res = await axios.get(
         `${Url}/api/user/transactions`,
         {
           headers: options,
         }
       );
         
      localStorage.setItem("transactions", JSON.stringify(res.data.data));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const allTransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
  },
  extraReducers: {
    [getAllTransaction.pending]: (state, { payload }) => {
      return { ...state, transactionSuccess: "pending", account: payload };
    },
    [getAllTransaction.fulfilled]: (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          allTransaction: payload,
          transactionSuccess: "success",
          completed: true,
        };
      } else return state;
    },
    [getAllTransaction.rejected]: (state, { payload }) => {
      return {
        ...state,
        allTransaction: payload,
        transactionSuccess: "rejected",
        completed: false,
      };
    },
  },
});
export const { resetState } = allTransactionSlice.actions;
export default allTransactionSlice.reducer;
