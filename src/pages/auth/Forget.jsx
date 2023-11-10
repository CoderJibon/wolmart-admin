import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoWhite from "../../assets/img/logo-white.png";
import { useDispatch, useSelector } from "react-redux";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/authSlice.js";
import { userForget } from "../../features/authApiSlice.js";
const Forget = () => {
  const [mail, setMail] = useState({ email: "" });
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.auth);

  const handleChangeMail = (e) => {
    setMail({ ...mail, [e.target.name]: e.target.value });
  };
  const handleSubmitMail = (e) => {
    e.preventDefault();
    try {
      if (!mail.email) {
        toastify("error", "Email is required");
      } else {
        dispatch(userForget({ email: mail.email }));
        setMail({ email: "" });
        dispatch(setMessageEmpty());
        toastify("success", message);
      }
    } catch (error) {
      dispatch(setMessageEmpty());
      toastify("error", error);
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
                  <h1>Forget Password</h1>
                  <p className="account-subtitle"></p>

                  {/* <!-- Form --> */}
                  <form onSubmit={handleSubmitMail}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        value={mail.email}
                        onChange={handleChangeMail}
                        placeholder="Email"
                      />
                    </div>

                    <div className="form-group mb-0">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Send
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

export default Forget;
