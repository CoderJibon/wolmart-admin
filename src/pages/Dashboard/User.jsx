import React, { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup.jsx";
import DataTable from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import { useDispatch, useSelector } from "react-redux";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/permission/userSlice.js";
import timeAgo from "../../utils/timeAgo.js";
import {
  UserCreate,
  UserDelete,
  UserStatus,
} from "../../features/permission/userApiSlice.js";
import generateRandomPassword from "../../utils/generateRandomPassword.js";

const User = () => {
  //state management
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // handle input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //use state
  const dispatch = useDispatch();
  const { error, message, permission, role, user } = useSelector(
    (state) => state.user
  );

  //table data
  useEffect(() => {
    new DataTable("#datatable");
  });
  // random password generation
  const handleRandomPassWord = (e) => {
    e.preventDefault();

    const randomPass = generateRandomPassword(10);

    //random pss update
    setInput((prevState) => ({
      ...prevState,
      password: randomPass,
    }));
  };

  //user create form submission
  const handleUserCreateForm = (e) => {
    e.preventDefault();
    if (!input.name || !input.email || !input.password || !input.role) {
      toastify("error", "all fields are required");
    } else {
      // create form done
      dispatch(UserCreate(input));
      //form reset
      setInput((prevState) => ({
        ...prevState,
        name: "",
        email: "",
        password: "",
      }));
    }
  };

  //handle role status change
  const handleUserRoleStatusChange = (id, status) => {
    dispatch(UserStatus({ status, id }));
  };

  // handle user Delete
  const handleUserDelete = (id) => {
    swal({
      title: "Are you sure you want to delete",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(UserDelete(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
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
      <ModalPopup title="User Create" id={"addUserModal"}>
        <form onSubmit={handleUserCreateForm}>
          <div className="my-3">
            <label>User Name</label>
            <input
              value={input.name}
              onChange={handleInputChange}
              className="form-control"
              name="name"
              type="text"
            />
          </div>
          <div className="my-3">
            <label>User Email</label>
            <input
              value={input.email}
              onChange={handleInputChange}
              className="form-control"
              name="email"
              type="email"
            />
          </div>
          <div className="my-3">
            <label>User Role</label>
            <select
              className="form-control"
              name="role"
              onChange={handleInputChange}
              id=""
            >
              <option selected value="">
                --Role--
              </option>
              {role?.map((rol, index) => {
                return (
                  <option key={index} value={rol?._id}>
                    {rol?.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="my-3">
            <label>User Password</label>
            <input
              value={input.password}
              onChange={handleInputChange}
              className="form-control"
              name="password"
              type="text"
            />
            <a
              onClick={handleRandomPassWord}
              className="btn btn-success"
              href=""
            >
              Random Password
            </a>
          </div>

          <div className="my-3">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </ModalPopup>
      {/* page header start */}
      <PageHeader title="Users" btnTarget="addUserModal" />
      {/* page header end */}

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                {user && (
                  <table
                    id="datatable"
                    className="datatable table table-hover table-center mb-0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>username</th>
                        <th>userSlug</th>
                        <th>email</th>
                        <th>role</th>
                        <th>Create At</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...user]?.reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item?.slug}</td>
                            <td>{item.email}</td>
                            <td>{item?.role?.name}</td>
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
                                    handleUserRoleStatusChange(
                                      item._id,
                                      item.status
                                    )
                                  }
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>

                            <td>
                              <button
                                className="btn btn-warning mr-1"
                                data-toggle="modal"
                                data-target="#roleEdit"
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                onClick={() => handleUserDelete(item._id)}
                                className="btn btn-danger"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
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

export default User;
