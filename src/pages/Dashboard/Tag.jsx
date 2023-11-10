import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/Product/productSlice.js";
import timeAgo from "../../utils/timeAgo.js";
import ModalPopup from "../../components/ModalPopup/ModalPopup.jsx";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  createTag,
  singleTagDelete,
} from "../../features/Product/productApiSlice.js";
const Tag = () => {
  // change input field
  const [input, setInput] = useState({
    name: "",
  });

  //use state
  const dispatch = useDispatch();
  const { error, message, tags } = useSelector((state) => state.product);

  //handleNewTagFormSubmit
  const handleNewTagFormSubmit = (e) => {
    e.preventDefault();
    if (!input.name) {
      toastify("error", "name is required!");
    } else {
      // create form done
      dispatch(createTag(input));
      //form reset
      setInput((prevState) => ({
        ...prevState,
        name: "",
      }));
    }
  };
  //handle input change
  const handleInputChange = (e) => {
    setInput({ name: e.target.value });
  };
  //handle delete Tag
  const handleSingleTagDelete = (id) => {
    swal({
      title: "Are you sure you want to delete",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(singleTagDelete(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  //data table column
  const columns = [
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
              onClick={() => handleSingleTagDelete(row._id)}
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
      <ModalPopup title="Tag Create" id={"addTagModal"}>
        <form onSubmit={handleNewTagFormSubmit}>
          <div className="my-2">
            <label>Tag Name</label>
            <input
              value={input.name}
              onChange={handleInputChange}
              className="form-control"
              name="name"
              type="text"
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
      <PageHeader title="Tags" btnTarget="addTagModal" />
      {/* page header end */}

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <DataTable
                title="All Tag"
                columns={columns}
                data={tags ? tags : []}
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

export default Tag;
