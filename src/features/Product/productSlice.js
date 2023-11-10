import { createSlice } from "@reduxjs/toolkit";
import {
  createBrand,
  createCategory,
  createProduct,
  createTag,
  getAllBrand,
  getAllCategory,
  getAllProducts,
  getAllTag,
  singleBrandDelete,
  singleCategoryDelete,
  singleProductDelete,
  singleTagDelete,
} from "./productApiSlice.js";

// product slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    category: [],
    brands: [],
    tags: [],
    loader: false,
    error: "",
    message: "",
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(getAllBrand.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(getAllTag.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.brands.push(action.payload.brand);
        state.message = action.payload.message;
      })
      .addCase(singleBrandDelete.fulfilled, (state, action) => {
        state.brands = state.brands.filter(
          (item) => item._id !== action.payload.brand._id
        );
        state.message = action.payload.message;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.tags.push(action.payload.tag);
        state.message = action.payload.message;
      })
      .addCase(singleTagDelete.fulfilled, (state, action) => {
        state.tags = state.tags.filter(
          (item) => item._id !== action.payload.tag._id
        );
        state.message = action.payload.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.category.push(action.payload.category);
        state.message = action.payload.message;
      })
      .addCase(singleCategoryDelete.fulfilled, (state, action) => {
        state.category = state.category.filter(
          (item) => item._id !== action.payload.category._id
        );
        state.message = action.payload.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload.products);
        state.message = action.payload.message;
      })
      .addCase(singleProductDelete.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (item) => item._id !== action.payload.product._id
        );
        state.message = action.payload.message;
      });
  },
});

//actions
export const { setMessageEmpty } = productSlice.actions;

//export default
export default productSlice.reducer;
