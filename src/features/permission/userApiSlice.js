import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPermission = createAsyncThunk(
  "user/getPermission",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/v1/permission`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const permissionCreate = createAsyncThunk(
  "user/permissionCreate",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/permission`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const permissionDelete = createAsyncThunk(
  "user/permissionDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/permission/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const permissionStatus = createAsyncThunk(
  "user/permissionStatus",
  async ({ status, id }) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/permission/status/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getRole = createAsyncThunk("user/getRole", async () => {
  try {
    const response = await axios.get(`http://localhost:5050/api/v1/role`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const RoleCreate = createAsyncThunk("user/RoleCreate", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/role`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const RoleDelete = createAsyncThunk("user/RoleDelete", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/role/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const RoleStatus = createAsyncThunk(
  "user/RoleStatus",
  async ({ status, id }) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/role/status/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const RoleUpdate = createAsyncThunk("user/RoleUpdate", async (data) => {
  try {
    const response = await axios.put(
      `http://localhost:5050/api/v1/role/${data.id}`,

      { name: data.name, permission: data.permission },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const response = await axios.get(`http://localhost:5050/api/v1/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const UserCreate = createAsyncThunk("user/UserCreate", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/user`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const UserDelete = createAsyncThunk("user/UserDelete", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/user/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const UserStatus = createAsyncThunk(
  "user/UserStatus",
  async ({ status, id }) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/user/status/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const UserUpdate = createAsyncThunk("user/UserUpdate", async (data) => {
  try {
    const response = await axios.put(
      `http://localhost:5050/api/v1/user/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
