import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import getAuthUser from "../../hooks/getAuthUser.jsx";

const Sidebar = () => {
  const location = useLocation();
  const { user } = getAuthUser();

  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              {user?.role?.permissions?.includes("Dashboard") && (
                <li className={location.pathname === "/" ? "active" : ""}>
                  <Link to="/">
                    <i className="fe fe-home"></i> <span>Dashboard</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Orders") && (
                <li>
                  <Link to="/orders">
                    <i className="fe fe-bolt"></i> <span>Orders</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Products") && (
                <li>
                  <Link to="/products">
                    <i className="fe fe-bolt"></i> <span>Products</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Category") && (
                <li>
                  <Link to="/category">
                    <i className="fe fe-bolt"></i> <span>Category</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Tags") && (
                <li>
                  <Link to="/tags">
                    <i className="fe fe-bolt"></i> <span>Tags</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Brands") && (
                <li>
                  <Link to="/brands">
                    <i className="fe fe-bolt"></i> <span>Brands</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Users") && (
                <li className={location.pathname === "/user" ? "active" : ""}>
                  <Link to="/user">
                    <i className="fe fe-user-plus"></i> <span>Users</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Roles") && (
                <li className={location.pathname === "/role" ? "active" : ""}>
                  <Link to="/role">
                    <i className="fe fe-user"></i> <span>Role</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Permission") && (
                <li
                  className={
                    location.pathname === "/permission" ? "active" : ""
                  }
                >
                  <Link to="/permission">
                    <i className="fe fe-lock"></i> <span>Permission</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
