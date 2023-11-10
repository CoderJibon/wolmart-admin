import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/auth/register`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const userLogin = createAsyncThunk("auth/userLogin", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/auth/login`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const userLogout = createAsyncThunk("auth/userLogout", async () => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/auth/logout`,
      "",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getLoginUser = createAsyncThunk("auth/getLoginUser", async () => {
  try {
    const response = await axios.get(`http://localhost:5050/api/v1/auth/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const userForget = createAsyncThunk("auth/userForget", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/auth/forget`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
