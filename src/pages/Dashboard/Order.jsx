import React from "react";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/permission/userSlice.js";
import timeAgo from "../../utils/timeAgo.js";
import ModalPopup from "../../components/ModalPopup/ModalPopup.jsx";
import DataTable from "react-data-table-component";

const Order = () => {
  const columns = [
    {
      name: "SL",
      selector: (row) => console.log(row),
      sortable: true,
    },
    {
      name: "Photo",
      selector: (row) => {
        return (
          <div style={{ width: "50px", height: "50px", objectFit: "cover" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src="https://w7.pngwing.com/pngs/49/613/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-dark-black.png"
              alt=""
            />
          </div>
        );
      },
    },
    {
      name: "Name",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.title,
    },
    {
      name: "Create At",
      selector: (row) => row.year,
    },
    {
      name: "Status",
      selector: (row) => {
        return (
          <div className="status-toggle ">
            <input type="checkbox" id="status_1" className="check" />
            <label htmlFor="status_1" className="checktoggle ">
              checkbox
            </label>
          </div>
        );
      },
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <>
            <button
              className="btn btn-warning mr-1  btn-sm"
              data-toggle="modal"
              data-target="#roleEdit"
            >
              <i className="fa fa-edit"></i>
            </button>
            <button className="btn btn-danger btn-sm">
              <i className="fa fa-trash"></i>
            </button>
          </>
        );
      },
    },
  ];
  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];
  return (
    <>
      <ModalPopup title="Order Create" id={"addBrandModal"}>
        <form onSubmit={""}>
          <div className="my-2">
            <label>Order Name</label>
            <input
              value=""
              onChange=""
              className="form-control"
              name="name"
              type="text"
            />
          </div>
          <img
            style={{ maxWidth: "100%" }}
            src="http://localhost:3000/src/assets/img/logo.png"
            alt=""
          />
          <div className="my-2">
            <label>Brand Photo</label>
            <input
              value=""
              onChange=""
              className="form-control"
              name="brandPhoto"
              type="file"
            />
          </div>
          <div className="my-2">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </ModalPopup>

      {/* page header start */}
      <PageHeader title="Brands" btnTarget="addBrandModal" />
      {/* page header end */}

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <DataTable
                title="All Orders"
                columns={columns}
                data={data}
                selectableRows
                pagination
                highlightOnHover
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
