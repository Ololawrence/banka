import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../Url";
import axios from "axios";

const initialState = {
  account: {},
  accountError: "",
  accountSuccess: "",
  accountPending: false,
  completed: false,
};

export const createAccount = createAsyncThunk(
  "account/CreateAccount",
  async (values, { rejectWithValue }) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-access-token": localStorage.getItem("token"),
      };
      let res = await axios.post(`${Url}/api/user/account`, values, {
        headers: headers,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
  },
  extraReducers: {
    [createAccount.pending]: (state, { payload }) => {
      return { ...state, registerStatus: "pending" };
    },
    [createAccount.fulfilled]: (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          user: payload,
          registerStatus: "success",
          userLoaded: true,
          pending: false,
          completed: true,
        };
      } else return state;
    },
    [createAccount.rejected]: (state, { payload }) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: payload,
      };
    },
  },
});
export const { resetState } = accountSlice.actions;
export default accountSlice.reducer;
