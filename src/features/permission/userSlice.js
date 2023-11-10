import { createSlice } from "@reduxjs/toolkit";
import {
  RoleCreate,
  RoleDelete,
  RoleStatus,
  RoleUpdate,
  UserCreate,
  UserDelete,
  UserStatus,
  getPermission,
  getRole,
  getUser,
  permissionCreate,
  permissionDelete,
  permissionStatus,
} from "./userApiSlice.js";

const userSlice = createSlice({
  name: "user",
  initialState: {
    permission: null,
    role: null,
    user: null,
    error: null,
    message: null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getPermission.fulfilled, (state, action) => {
        state.permission = action.payload;
      })
      .addCase(permissionCreate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(permissionCreate.fulfilled, (state, action) => {
        state.permission = state.permission ?? [];
        state.permission.push(action.payload.permission);
        state.message = action.payload.message;
      })
      .addCase(permissionDelete.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(permissionDelete.fulfilled, (state, action) => {
        state.permission = state.permission.filter(
          (data) => data._id !== action.payload.permission._id
        );
        state.message = action.payload.message;
      })
      .addCase(permissionStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(permissionStatus.fulfilled, (state, action) => {
        state.permission[
          state.permission.findIndex(
            (data) => data._id == action.payload.permission._id
          )
        ] = action.payload.permission;
        state.message = action.payload.message;
      })
      .addCase(getRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.role = action.payload;
      })
      .addCase(RoleCreate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(RoleCreate.fulfilled, (state, action) => {
        state.role = state.role ?? [];
        state.role.push(action.payload.role);
        state.message = action.payload.message;
      })
      .addCase(RoleDelete.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(RoleDelete.fulfilled, (state, action) => {
        state.role = state.role.filter(
          (data) => data._id !== action.payload.role._id
        );
        state.message = action.payload.message;
      })
      .addCase(RoleStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(RoleStatus.fulfilled, (state, action) => {
        state.role[
          state.role.findIndex((data) => data._id == action.payload.role._id)
        ] = action.payload.role;
        state.message = action.payload.message;
      })
      .addCase(RoleUpdate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(RoleUpdate.fulfilled, (state, action) => {
        state.role[
          state.role.findIndex((data) => data._id == action.payload.role._id)
        ] = action.payload.role;
        state.message = action.payload.message;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(UserCreate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(UserCreate.fulfilled, (state, action) => {
        state.user = state.user ?? [];
        state.user.push(action.payload.user);
        state.message = action.payload.message;
      })
      .addCase(UserStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(UserStatus.fulfilled, (state, action) => {
        state.user[
          state.user.findIndex((data) => data._id == action.payload.user._id)
        ] = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(UserDelete.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(UserDelete.fulfilled, (state, action) => {
        state.user = state.user.filter(
          (data) => data._id !== action.payload.user._id
        );
        state.message = action.payload.message;
      });
  },
});

//actions
export const { setMessageEmpty } = userSlice.actions;

// selectors
export const getPermissionData = (state) => state.user;

//reducer
export default userSlice.reducer;
