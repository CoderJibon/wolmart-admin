import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { getLoginUser } from "./features/authApiSlice.js";
import {
  getPermission,
  getRole,
  getUser,
} from "./features/permission/userApiSlice.js";
import {
  getAllBrand,
  getAllCategory,
  getAllProducts,
  getAllTag,
} from "./features/Product/productApiSlice.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(getLoginUser());
    }
  }, [dispatch]);

  // get all data
  useEffect(() => {
    dispatch(getPermission());
    dispatch(getRole());
    dispatch(getUser());
    dispatch(getAllProducts());
    dispatch(getAllCategory());
    dispatch(getAllBrand());
    dispatch(getAllTag());
  }, [dispatch]);

  return <></>;
}

export default App;
