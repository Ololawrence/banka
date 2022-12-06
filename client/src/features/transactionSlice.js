import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../Url";
import axios from "axios";

const initialState = {
  credit: {},
  debit: {},
  setUser: {},
  creditSuccess: "",
  debitSuccess: "",
  creditfailure: "",
  debitFailure: "",
  creditPending: "",
  debitPending: "",
  setUserSuccess: "",
  setUserError: "",
};

export const setloggedUsers = createAsyncThunk(
  "transaction/setUser",
  async (value, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const options = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        method: "POST",
        "x-access-token": token,
      };
      let res = await axios.get(`${Url}/api/user/account`, {
        headers: options,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const creditAccount = createAsyncThunk(
  "transaction/credit",
  async (value, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const options = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        method: "POST",
        "x-access-token": token,
      };
      const user = JSON.parse(localStorage.getItem("user"));
      let account = user?.data?.accountnumber;

      let res = await axios.post(`${Url}/api/user/credit/${account}`, value,{
        headers: options,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const debitAccount = createAsyncThunk(
  "transaction/debit",
  async (value, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const options = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        method: "POST",
        "x-access-token": token,
      };
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user)
      let account = user?.data?.accountnumber;
      let res = await axios.post(`${Url}/api/user/debit/${account}`, value, {
        headers: options,
      });
      console.log(res)
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
  },
  extraReducers: {
    [debitAccount.pending]: (state, { payload }) => {
      return { ...state, debitSuccess: "pending", account: payload };
    },
    [debitAccount.fulfilled]: (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          transaction: payload,
          debitSuccess: "success",
          completed: true,
        };
      } else return state;
    },
    [debitAccount.rejected]: (state, { payload }) => {
      return {
        ...state,
        transaction: payload,
        debitSuccess: "rejected",
        completed: false,
      };
    },
    [creditAccount.fulfilled]: (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          transaction: payload,
          creditSuccess: "success",
          completed: true,
        };
      } else return state;
    },
    [creditAccount.rejected]: (state, { payload }) => {
      return {
        ...state,
        transaction: payload,
        creditSuccess: "rejected",
        completed: false,
      };
    },
    [setloggedUsers.pending]: (state, { payload }) => {
      return { ...state, setUserSuccess: "pending", setUser: payload };
    },
    [setloggedUsers.fulfilled]: (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          setUser: payload,
          setUserSuccess: "success",
          completed: true,
        };
      } else return state;
    },
    [setloggedUsers.rejected]: (state, { payload }) => {
      return {
        ...state,
        setUser: payload,
        setUserSuccess: "rejected",
        completed: false,
      };
    },
  },
});
export const { resetState } = transactionSlice.actions;
export default transactionSlice.reducer;
