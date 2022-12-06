import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../Url";
import axios from "axios";

const initialState = {
  account: {},
  accountStatus: "",
  accountPending: false,
  completed: false,
};

export const createAccount = createAsyncThunk(
  "account/CreateAccount",
  async (values, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const options = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Method: "POST",
        "x-access-token": token,
      };

      let res = await axios.post(`${Url}/api/user/account`, values, {
        headers: options,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
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
    logOut: (state) => {
      
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("transactions");
      return
    }

  },

  extraReducers: {
    [createAccount.pending]: (state, { payload }) => {
      return { ...state, accountStatus: "pending", account: payload };
    },
    [createAccount.fulfilled]: (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          account: payload,
          accountStatus: "success",
          completed: true,
        };
      } else return state;
    },
    [createAccount.rejected]: (state, { payload }) => {
      return {
        ...state,
        account: payload,
        accountStatus: "rejected",
        completed: false,
      };
    },
  },
});
export const { resetState, logOut } = accountSlice.actions;
export default accountSlice.reducer;
