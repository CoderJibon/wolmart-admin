import React, { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup.jsx";
import DataTable from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import { useDispatch, useSelector } from "react-redux";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/permission/userSlice.js";
import swal from "sweetalert";
import timeAgo from "../../utils/timeAgo.js";
import {
  RoleCreate,
  RoleDelete,
  RoleStatus,
  RoleUpdate,
} from "../../features/permission/userApiSlice.js";

const Role = () => {
  const [input, setInput] = useState({
    name: "",
  });
  const [roleEdit, setRoleEdit] = useState({});
  // chackbox handling
  const [sleeted, setSleeted] = useState([]);

  const handleCheckboxChange = (e) => {
    const val = e.target.value;
    const updateList = [...sleeted];
    if (sleeted.includes(val)) {
      updateList.splice(sleeted.indexOf(val), 1);
    } else {
      updateList.push(val);
    }
    setSleeted(updateList);
  };

  // state management
  const dispatch = useDispatch();
  const { error, message, permission, role } = useSelector(
    (state) => state.user
  );

  // handle input changes
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle input updates
  const handleRoleUpdateChange = (e) => {
    setRoleEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // from submit
  const handleRoleSubmit = (e) => {
    e.preventDefault();
    if (!input.name) {
      toastify("error", "all fields are required");
    }
    dispatch(RoleCreate({ name: input.name, permission: [...sleeted] }));
    setInput({
      name: "",
    });
    setSleeted([]);
  };

  const handleUpdateRoleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      RoleUpdate({ id: roleEdit._id, name: roleEdit.name, permission: sleeted })
    );
  };

  const handleRoleDelete = (id) => {
    swal({
      title: "Are you sure you want to delete",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(RoleDelete(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // Role status update
  const handleStatusChange = (status, id) => {
    dispatch(RoleStatus({ status, id }));
  };

  // make data table
  useEffect(() => {
    new DataTable("#datatable");
  });

  // role Edit
  const handleRoleEdit = (id) => {
    const editRole = role.find((data) => data._id === id);
    setRoleEdit(editRole);
    setSleeted(editRole.permissions);
    console.log(sleeted);
  };

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
      <ModalPopup title="Create New Role" id={"addRoleModal"}>
        <form onSubmit={handleRoleSubmit}>
          <div className="my-3">
            <label htmlFor="">Role</label>
            <input
              onChange={handleInputChange}
              type="text"
              name="name"
              value={input.name}
              className="form-control"
            />
          </div>
          <div className="my-3">
            <label>Permission</label>
            <div>
              {permission?.map((item, index) => {
                if (item.status == true) {
                  return (
                    <label className="d-block" key={index}>
                      <input
                        type="checkbox"
                        checked={sleeted.includes(item.name)}
                        value={item.name}
                        onChange={handleCheckboxChange}
                      />{" "}
                      {item.name}
                    </label>
                  );
                }
              })}
            </div>
          </div>
          <div className="my-3">
            <button type="submit" className="btn btn-primary">
              Create Role
            </button>
          </div>
        </form>
      </ModalPopup>
      {/* modal role edit */}
      <ModalPopup title="Update Role" id={"roleEdit"}>
        <form onSubmit={handleUpdateRoleSubmit}>
          <div className="my-3">
            <label htmlFor="">Role</label>
            <input
              onChange={handleRoleUpdateChange}
              type="text"
              name="name"
              value={roleEdit?.name}
              className="form-control"
            />
          </div>
          <div className="my-3">
            <label>Permission</label>
            <div>
              {permission?.map((item, index) => {
                if (item.status == true) {
                  return (
                    <label className="d-block" key={index}>
                      <input
                        type="checkbox"
                        checked={sleeted?.includes(item.name)}
                        value={item.name}
                        onChange={handleCheckboxChange}
                      />{" "}
                      {item.name}
                    </label>
                  );
                }
              })}
            </div>
          </div>
          <div className="my-3">
            <button type="submit" className="btn btn-primary">
              Create Role
            </button>
          </div>
        </form>
      </ModalPopup>
      {/* page header start */}
      <PageHeader title="Role" btnTarget="addRoleModal" />
      {/* page header end */}

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                {role && (
                  <table
                    id="datatable"
                    className="datatable table table-hover table-center mb-0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Permission</th>
                        <th>Create At</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...role]?.reverse().map((item, index) => {
                        if (item) {
                          return (
                            <tr key={index}>
                              <td style={{ width: "50px" }}>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.slug}</td>
                              <td>
                                <ul>
                                  {item.permissions.map((per, index) => {
                                    return <li key={index}>{per}</li>;
                                  })}
                                </ul>
                              </td>
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
                                      handleStatusChange(item.status, item._id)
                                    }
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <td>
                                <button
                                  onClick={() => handleRoleEdit(item._id)}
                                  className="btn btn-warning mr-1"
                                  data-toggle="modal"
                                  data-target="#roleEdit"
                                >
                                  <i className="fa fa-edit"></i>
                                </button>
                                <button
                                  onClick={() => handleRoleDelete(item._id)}
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

export default Role;
