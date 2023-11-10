import React, { useEffect, useState } from "react";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/Product/productSlice.js";
import timeAgo from "../../utils/timeAgo.js";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { singleProductDelete } from "../../features/Product/productApiSlice.js";
import ProductPageHeader from "../../components/PageHeader/ProductPageHeader.jsx";

const Product = () => {
  //use state
  const dispatch = useDispatch();
  const { error, message, products } = useSelector((state) => state.product);

  //handle delete brand
  const handleSingleProductDelete = (id) => {
    swal({
      title: "Are you sure you want to delete",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(singleProductDelete(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  //data table column
  const columns = [
    {
      name: "Photo",
      selector: (row) => {
        return (
          <div style={{ width: "50px", height: "50px", objectFit: "cover" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src=""
              alt={row?.name}
            />
          </div>
        );
      },
    },
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Create At",
      selector: (row) => timeAgo(new Date(row?.createdAt)),
    },
    {
      name: "Status",
      selector: (row) => {
        return (
          <div className="status-toggle ">
            <input type="checkbox" id="status_1" className="check" />
            <label htmlFor="status_1" className="checktoggle">
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
            <button
              onClick={() => handleSingleProductDelete(row._id)}
              className="btn btn-danger btn-sm"
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        );
      },
    },
  ];

  //error handling
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
      {/* page header start */}
      <ProductPageHeader
        title="Products"
        btn="Create Product"
        link="create-product"
      />
      {/* page header end */}

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <DataTable
                title="All Product"
                columns={columns}
                data={products ? products : []}
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

export default Product;
