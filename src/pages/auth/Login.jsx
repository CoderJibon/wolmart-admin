import React, { useEffect, useState } from "react";
import logoWhite from "../../assets/img/logo-white.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/authSlice.js";
import { userLogin } from "../../features/authApiSlice.js";
const Login = () => {
  const dispatch = useDispatch();
  const { error, message, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    if (!input.email || !input.password) {
      toastify("warn", "All Fields are required");
    } else {
      dispatch(
        userLogin({
          email: input.email,
          password: input.password,
        })
      );
      setInput({ email: "", password: "" });
    }
  };

  useEffect(() => {
    if (error) {
      toastify("error", error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      toastify("success", message);
      dispatch(setMessageEmpty());
    }
    if (user) {
      navigate("/");
    }
  }, [error, message, user]);
  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={logoWhite} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Login</h1>
                  <p className="account-subtitle">Access to our dashboard</p>

                  {/* <!-- Form --> */}
                  <form onSubmit={handleUserLogin}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={input.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Password"
                        name="password"
                        value={input.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  {/* <!-- /Form --> */}

                  <div className="text-center forgotpass">
                    <Link to="/forget">Forgot Password?</Link>
                  </div>
                  <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                  </div>

                  <div className="text-center dont-have">
                    Don’t have an account? <Link to="/register">Register</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
