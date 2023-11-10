import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/Product/productSlice.js";
import timeAgo from "../../utils/timeAgo.js";
import ModalPopup from "../../components/ModalPopup/ModalPopup.jsx";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  singleCategoryDelete,
} from "../../features/Product/productApiSlice.js";
const Category = () => {
  //input change event
  const [input, setInput] = useState({
    name: "",
    parentCategory: "",
    icon: "",
  });
  //categroy photo
  const [photo, setPhoto] = useState();
  //use state
  const dispatch = useDispatch();
  const { error, message, category } = useSelector((state) => state.product);

  //category photo
  const handleCategoryCreatePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  //handle input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //handle Form submission
  const handleCategoryFormSubmit = (e) => {
    e.preventDefault();
    if (!input.name) {
      toastify("error", "name is required!");
    } else {
      const from_data = new FormData();
      from_data.append("name", input.name);
      from_data.append("parentCategory", input.parentCategory);
      from_data.append("icon", input.icon);
      from_data.append("categoryPhoto", photo);
      // create form done
      dispatch(createCategory(from_data));
      //form reset
      setInput((prevState) => ({
        ...prevState,
        name: "",
        parentCategory: "",
        icon: "",
      }));
      setPhoto("");
    }
  };

  //handle delete brand
  const handleSingleCategoryDelete = (id) => {
    swal({
      title: "Are you sure you want to delete",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(singleCategoryDelete(id));
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
            {row?.photo && (
              <img
                style={{ width: "100%", height: "100%" }}
                src={row?.photo}
                alt={row?.name}
              />
            )}
          </div>
        );
      },
    },
    {
      name: "Category Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Sub Category",
      selector: (row) => {
        return (
          <ul>
            {row &&
              row.subCategory?.map((sub) => {
                return <li key={sub._id}>{sub.name}</li>;
              })}
          </ul>
        );
      },
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
              onClick={() => handleSingleCategoryDelete(row._id)}
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
      <ModalPopup title="Category Create" id={"addBrandModal"}>
        <form onSubmit={handleCategoryFormSubmit}>
          <div className="my-2">
            <label>Category Name</label>
            <input
              value={input.name}
              onChange={handleInputChange}
              className="form-control"
              name="name"
              type="text"
            />
          </div>
          <div className="my-2">
            <label>Parent Category</label>
            <select
              onChange={handleInputChange}
              className="form-control"
              name="parentCategory"
              id=""
            >
              <option value="">--Select--</option>
              {category?.map((item) => {
                return <option value={item._id}>{item.name}</option>;
              })}
            </select>
          </div>
          <div className="my-2">
            <label>Category Icons</label>
            <input
              value={input.icon}
              onChange={handleInputChange}
              className="form-control"
              name="icon"
              type="text"
            />
          </div>
          {photo && (
            <img
              style={{ maxWidth: "100%" }}
              src={URL.createObjectURL(photo)}
              alt=""
            />
          )}

          <div className="my-2">
            <label>Category Photo</label>
            <input
              onChange={handleCategoryCreatePhoto}
              className="form-control"
              name="categoryPhoto"
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
      <PageHeader title="Category" btnTarget="addBrandModal" />
      {/* page header end */}

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <DataTable
                title="All Category"
                columns={columns}
                data={category ? category : []}
                pagination
                highlightOnHover
                selectableRows
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
