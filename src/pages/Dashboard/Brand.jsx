import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/Product/productSlice.js";
import timeAgo from "../../utils/timeAgo.js";
import ModalPopup from "../../components/ModalPopup/ModalPopup.jsx";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrand,
  singleBrandDelete,
} from "../../features/Product/productApiSlice.js";

const Brand = () => {
  // change input field
  const [input, setInput] = useState({
    name: "",
  });

  // preview image
  const [previewImage, setPreviewImage] = useState("");
  const [logo, setLogo] = useState("");

  //use state
  const dispatch = useDispatch();
  const { error, message, brands } = useSelector((state) => state.product);

  //handleNewBrandFormSubmit
  const handleNewBrandFormSubmit = (e) => {
    e.preventDefault();
    if (!input.name) {
      toastify("error", "name is required!");
    } else {
      const from_data = new FormData();
      from_data.append("name", input.name);
      from_data.append("brandPhoto", logo);
      // create form done
      dispatch(createBrand(from_data));
      //form reset
      setInput((prevState) => ({
        ...prevState,
        name: "",
      }));
      setPreviewImage("");
    }
  };
  //handle input change
  const handleInputChange = (e) => {
    setInput({ name: e.target.value });
  };
  // handle change brand logo
  const handleChangeFile = (e) => {
    setLogo(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  //handle delete brand
  const handleSingleBrandDelete = (id) => {
    swal({
      title: "Are you sure you want to delete",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(singleBrandDelete(id));
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
              src={row?.photo}
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
      name: "Slug",
      selector: (row) => row?.slug,
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
            <button
              onClick={() => handleSingleBrandDelete(row._id)}
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
      <ModalPopup title="Brand Create" id={"addBrandModal"}>
        <form onSubmit={handleNewBrandFormSubmit}>
          <div className="my-2">
            <label>Brand Name</label>
            <input
              value={input.name}
              onChange={handleInputChange}
              className="form-control"
              name="name"
              type="text"
            />
          </div>
          {previewImage && (
            <img style={{ maxWidth: "100%" }} src={previewImage} alt="" />
          )}

          <div className="my-2">
            <label>Brand Photo</label>
            <input
              onChange={handleChangeFile}
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
                title="All Brands"
                columns={columns}
                data={brands ? brands : []}
                selectableRows
                pagination
                highlightOnHover
                dense
                pointerOnHover
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Brand;
