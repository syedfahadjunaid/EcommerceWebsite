import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const data = localStorage?.getItem("userToken");
const dataJson = JSON?.parse(data);
const userName = Cookies?.get("userName");
const userId = Cookies?.get("userId");
const userToken = Cookies?.get("userToken");
const initialState = {
  userId: userId ? userId : "",
  userName: userName ? userName : "",
  userToken: userToken ? userToken : "",
  userLogin: userId ? true : false,
  loading: false,
  error: "",
  LoginForm: false,
};
export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.userToken = action.payload.userToken;
      state.userLogin = true;
    },
    setUserLogOut: (state) => {
      state.userName = null;
      state.userId = null;
      state.userToken = null;
      state.userLogin = false;
    },
    openLoginForm: (state) => {
      state.LoginForm = true;
    },
    closeLoginForm: (state) => {
      state.LoginForm = false;
    },
  },
  extraReducers: {},
});
export const { setActiveUser, setUserLogOut, openLoginForm, closeLoginForm } =
  authSlice.actions;
export const selectUserName = (state) => state.user.userName;
export const selectUserEmail = (state) => state.user.userEmail;
export const selectUserToken = (state) => state.user.userToken;
export default authSlice.reducer;
