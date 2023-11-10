import React, { useEffect } from "react";
import logo from "../../assets/img/logo.png";
import logoSmall from "../../assets/img/logo-small.png";
import doctorThumb from "../../assets/img/doctors/doctor-thumb-01.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/authSlice.js";
import { userLogout } from "../../features/authApiSlice.js";
import getAuthUser from "../../hooks/getAuthUser.jsx";

const Header = () => {
  const dispatch = useDispatch();
  const { user, message } = getAuthUser();

  const handleUserLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout());
  };

  useEffect(() => {
    if (message) {
      toastify("success", message);
      dispatch(setMessageEmpty());
    }
  }, [message]);

  return (
    <>
      <div className="header">
        {/* <!-- Logo --> */}
        <div className="header-left">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" />
          </Link>
          <Link to="index.html" className="logo logo-small">
            <img src={logoSmall} alt="Logo" width="30" height="30" />
          </Link>
        </div>
        {/* <!-- /Logo --> */}

        <a href="#" id="toggle_btn">
          <i className="fe fe-text-align-left"></i>
        </a>

        <div className="top-nav-search">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search here"
            />
            <button className="btn" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>

        {/* <!-- Mobile Menu Toggle --> */}
        <a className="mobile_btn" id="mobile_btn">
          <i className="fa fa-bars"></i>
        </a>
        {/* <!-- /Mobile Menu Toggle --> */}
        {/* <!-- Header Right Menu --> */}
        <ul className="nav user-menu">
          <li className="nav-item dropdown noti-dropdown">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <i className="fe fe-bell"></i>{" "}
              <span className="badge badge-pill">3</span>
            </a>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <a href="javascript:void(0)" className="clear-noti">
                  {" "}
                  Clear All{" "}
                </a>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message">
                    <a href="#">
                      <div className="media">
                        <span className="avatar avatar-sm">
                          <img
                            className="avatar-img rounded-circle"
                            alt="User Image"
                            src={doctorThumb}
                          />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Dr. Ruby Perrin</span>{" "}
                            Schedule{" "}
                            <span className="noti-title">her appointment</span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              4 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="#">
                      <div className="media">
                        <span className="avatar avatar-sm">
                          <img
                            className="avatar-img rounded-circle"
                            src={doctorThumb}
                          />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Charlene Reed</span>{" "}
                            has booked her appointment to{" "}
                            <span className="noti-title">Dr. Ruby Perrin</span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              6 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="#">
                      <div className="media">
                        <span className="avatar avatar-sm">
                          <img
                            className="avatar-img rounded-circle"
                            src={doctorThumb}
                          />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Travis Trimble</span>{" "}
                            sent a amount of $210 for his{" "}
                            <span className="noti-title">appointment</span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              8 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="#">
                      <div className="media">
                        <span className="avatar avatar-sm">
                          <img
                            className="avatar-img rounded-circle"
                            src={doctorThumb}
                          />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Carl Kelly</span> send
                            a message{" "}
                            <span className="noti-title"> to his doctor</span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              12 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <a href="#">View all Notifications</a>
              </div>
            </div>
          </li>

          <li className="nav-item dropdown has-arrow">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <span className="user-img">
                <img
                  className="rounded-circle"
                  src={
                    user?.photo
                      ? user?.photo
                      : "https://w7.pngwing.com/pngs/49/613/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-dark-black.png"
                  }
                  width="31"
                  alt={user?.name}
                />
              </span>
            </a>
            <div className="dropdown-menu">
              <div className="user-header">
                <div className="avatar avatar-sm">
                  <img
                    src={
                      user?.photo
                        ? user?.photo
                        : "https://w7.pngwing.com/pngs/49/613/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-dark-black.png"
                    }
                    alt={user?.name}
                    className="avatar-img rounded-circle"
                  />
                </div>
                <div className="user-text">
                  <h6>{user?.name?.toUpperCase()}</h6>
                  <p className="text-muted mb-0">{user?.role?.name}</p>
                </div>
              </div>
              <a className="dropdown-item" href="profile.html">
                My Profile
              </a>
              <a className="dropdown-item" href="settings.html">
                Settings
              </a>
              <a className="dropdown-item" onClick={handleUserLogout} href="#">
                Logout
              </a>
            </div>
          </li>
        </ul>
        {/* <!-- /Header Right Menu --> */}
      </div>
    </>
  );
};

export default Header;
