import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import userReducer from "../features/permission/userSlice.js";
import productReducer from "../features/Product/productSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
