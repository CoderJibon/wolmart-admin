import React, { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup.jsx";
import DataTable from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  permissionCreate,
  permissionDelete,
  permissionStatus,
} from "../../features/permission/userApiSlice.js";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/permission/userSlice.js";
import swal from "sweetalert";
import timeAgo from "../../utils/timeAgo.js";

const Permission = () => {
  const [input, setInput] = useState({
    name: "",
  });

  const dispatch = useDispatch();
  const { error, message, permission } = useSelector((state) => state.user);

  // handle input changes
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // from submit
  const handlePermissionSubmit = (e) => {
    e.preventDefault();
    if (!input.name) {
      toastify("error", "all fields are required");
    }
    dispatch(permissionCreate({ name: input.name }));
    setInput({
      name: "",
    });
  };

  const handlePermissionDelete = (id) => {
    swal({
      title: "Are you sure you want to delete",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(permissionDelete(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // permission status update
  const handleStatusChange = (status, id) => {
    dispatch(permissionStatus({ status, id }));
  };

  // make data table
  useEffect(() => {
    new DataTable("#datatable");
  });

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
  }, [error, message, permission]);
  return (
    <>
      <ModalPopup title="Create New Permission" id={"addPermissionModal"}>
        <form onSubmit={handlePermissionSubmit}>
          <div className="my-3">
            <label htmlFor="">Permission</label>
            <input
              onChange={handleInputChange}
              type="text"
              name="name"
              value={input.name}
              className="form-control"
            />
          </div>
          <div className="my-3">
            <button type="submit" className="btn btn-primary">
              Add New Permission
            </button>
          </div>
        </form>
      </ModalPopup>
      {/* page header start */}
      <PageHeader title="Permission" btnTarget="addPermissionModal" />
      {/* page header end */}

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                {permission && (
                  <table
                    id="datatable"
                    className="datatable table table-hover table-center mb-0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Create At</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permission &&
                        [...permission].reverse().map((item, index) => {
                          if (item) {
                            return (
                              <tr key={index}>
                                <td style={{ width: "50px" }}>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.slug}</td>
                                <td>{timeAgo(new Date(item.createdAt))}</td>

                                <td>
                                  <div className="status-toggle">
                                    <input
                                      type="checkbox"
                                      id="status_1"
                                      className="check"
                                      checked={item.status ? true : false}
                                    />
                                    <label
                                      htmlFor="status_1"
                                      className="checktoggle"
                                      onClick={() =>
                                        handleStatusChange(
                                          item.status,
                                          item._id
                                        )
                                      }
                                    >
                                      checkbox
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <button
                                    onClick={() =>
                                      handlePermissionDelete(item._id)
                                    }
                                    className="btn btn-danger"
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          }
                        })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Permission;
