import React from "react";

const PageHeader = ({ title, btnTarget = "addUserModal" }) => {
  return (
    <>
      {/* <!-- Page Header --> */}
      <div className="page-header">
        <div className="row">
          <div className="col-sm-7 col-auto">
            <h3 style={{ textTransform: "uppercase" }} className="page-title">
              {title}
            </h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li
                style={{ textTransform: "capitalize" }}
                className="breadcrumb-item active"
              >
                {title}
              </li>
            </ul>
          </div>
          <div className="col-sm-5 col">
            <button
              data-toggle="modal"
              data-target={`#${btnTarget}`}
              className="btn btn-primary float-right mt-2"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      {/* <!-- /Page Header --> */}
    </>
  );
};

export default PageHeader;
