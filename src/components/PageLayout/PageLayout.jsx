import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";

const PageLayout = () => {
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header />
        {/* Header  */}

        {/*  Sidebar  */}
        <Sidebar />
        {/* Sidebar  */}

        {/*  Page Wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            <Outlet />
          </div>
        </div>
        {/* Page Wrapper  */}
      </div>
    </>
  );
};

export default PageLayout;
