import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//get all products
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    try {
      const response = await axios.get(`http://localhost:5050/api/v1/product`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//get all category
export const getAllCategory = createAsyncThunk(
  "product/getAllCategory",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/v1/category`,
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

//get all Brand
export const getAllBrand = createAsyncThunk("product/getAllBrand", async () => {
  try {
    const response = await axios.get(`http://localhost:5050/api/v1/brand`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//get all tag
export const getAllTag = createAsyncThunk("product/getAllTag", async () => {
  try {
    const response = await axios.get(`http://localhost:5050/api/v1/tag`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//Create  a new brand
export const createBrand = createAsyncThunk(
  "product/createBrand",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/brand`,
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
// single brand delete
export const singleBrandDelete = createAsyncThunk(
  "product/singleBrandDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/brand/${id}`,
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

//Create  a new tag
export const createTag = createAsyncThunk("product/createTag", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/tag`,
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
// single brand tag
export const singleTagDelete = createAsyncThunk(
  "product/singleTag",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/tag/${id}`,
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

//Create  a new category
export const createCategory = createAsyncThunk(
  "product/createCategory",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/category`,
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
// single brand category
export const singleCategoryDelete = createAsyncThunk(
  "product/singleCategoryDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/category/${id}`,
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

//Create  a new product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/product`,
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
// single brand product
export const singleProductDelete = createAsyncThunk(
  "product/singleProductDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/product/${id}`,
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
