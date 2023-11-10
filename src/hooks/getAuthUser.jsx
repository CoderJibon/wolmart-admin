import React from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../features/authSlice.js";

const getAuthUser = () => {
  const { user, error, message } = useSelector(getUserData);
  return { user, error, message };
};

export default getAuthUser;
