import React, { useEffect, useState } from "react";
import logoWhite from "../../assets/img/logo-white.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../features/authApiSlice.js";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/authSlice.js";

const Register = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  //handel input change event
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //user submit registration
  const handleUserRegister = (e) => {
    e.preventDefault();

    if (!input.name || !input.email || !input.password || !input.cpassword) {
      toastify("warn", "All Fields are required");
    } else if (input.password !== input.cpassword) {
      toastify("error", "passwords do not match");
    } else {
      dispatch(
        userRegister({
          name: input.name,
          email: input.email,
          password: input.password,
        })
      );
      setInput({ name: "", email: "", password: "", cpassword: "" });
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
  }, [error, message]);

  return (
    <>
      {/* <!-- Main Wrapper --> */}
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={logoWhite} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Register</h1>
                  <p className="account-subtitle">Access to our dashboard</p>

                  {/* <!-- Form --> */}
                  <form onSubmit={handleUserRegister}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={input.name}
                        onChange={handleInputChange}
                      />
                    </div>
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
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Confirm Password"
                        name="cpassword"
                        value={input.cpassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group mb-0">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                  {/* <!-- /Form --> */}

                  <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                  </div>

                  <div className="text-center dont-have">
                    Already have an account? <Link to="/login">Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Main Wrapper --> */}
    </>
  );
};

export default Register;
