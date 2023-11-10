import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const privateGard = () => {
  const { user } = useSelector((state) => state.auth);
  if (localStorage.getItem("user")) {
    return user ? <Outlet /> : <Navigate to="/login" />;
  }
  return <Navigate to="/login" />;
};

export default privateGard;
