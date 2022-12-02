import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Url } from "../Url";
import axios from "axios";

const initialState = {
  user: {},
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  loginPending: false,
  userLoaded: false,
  userId: "",
  pending: "",
  completed: false,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      let response = await axios.post(`${Url}/api/auth/signup`, values);
      localStorage.setItem(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (values, { rejectWithValue }) => {
    try {
   
      let response = await axios.post(`${Url}/api/auth/login`, values);
      console.log(response);
      const token = response.data.token;
      localStorage.setItem("token", JSON.stringify(token));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const regSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, { payload }) => {
      return { ...state, registerStatus: "pending" };
    },
    [registerUser.fulfilled]: (state, { payload }) => {
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
    [registerUser.rejected]: (state, { payload }) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: payload,
      };
    },
    [loginUser.pending]: (state, { payload }) => {
      return { ...state, loginPending: true };
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          user: payload,
          loginStatus: "success",
          userLoaded: true,
          pending: false,
          completed: true,
        };
      } else return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: payload,
      };
    },
  },
});
export const { resetState } = regSlice.actions;
export default regSlice.reducer;
