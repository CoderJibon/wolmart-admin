import { createSlice } from "@reduxjs/toolkit";
import {
  getLoginUser,
  userForget,
  userLogin,
  userLogout,
  userRegister,
} from "./authApiSlice.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    error: null,
    message: null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(getLoginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(getLoginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(userForget.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(userForget.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = null;
      });
  },
});

//actions
export const { setMessageEmpty } = authSlice.actions;

// selectors
export const getUserData = (state) => state.auth;

//reducer
export default authSlice.reducer;
