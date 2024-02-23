import { createSlice } from "@reduxjs/toolkit";
import { addNewProduct , getAllProduct, getProductWithCategory, getProductDetails} from "./productsAction";

// Initial state
const initialState = {
  newProductLoader: false,
  allProductLoader: false,
  productWithCategoryLoader: false,
  productDetailLoader: false,
  productsData:[],
  productMsg:"Please Search Product",
  productDetailData:{}
};

// Actual Slice
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    logoutProducts: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    //Add New Product
    builder.addCase(addNewProduct.pending, (state) => {
      state.newProductLoader = true;
    });
    builder.addCase(addNewProduct.fulfilled, (state, { payload }) => {
      state.newProductLoader = false;
    });
    builder.addCase(addNewProduct.rejected, (state) => {
      state.newProductLoader = false;
    });
    //All Product
    builder.addCase(getAllProduct.pending, (state) => {
      state.allProductLoader = true;
      state.productMsg = "";
      state.productsData= []
    });
    builder.addCase(getAllProduct.fulfilled, (state, { payload }) => {
      state.allProductLoader = false;
      state.productsData = payload.data;
      state.productMsg = payload.data && payload.data.length <= 0 ? "Sorry no products availavle" : "";
    });
    builder.addCase(getAllProduct.rejected, (state) => {
      state.allProductLoader = false;
      state.productMsg ="Sorry something is went wrong try again"
    });
    //Product With Category
    builder.addCase(getProductWithCategory.pending, (state) => {
      state.productWithCategoryLoader = true;
      state.productMsg = "";
      state.productsData= []
    });
    builder.addCase(getProductWithCategory.fulfilled, (state, { payload }) => {
      state.productWithCategoryLoader = false;
      state.productsData = payload.data;
      state.productMsg = payload.data && payload.data.length <= 0 ? "Sorry no products availavle in this category" : "";
    });
    builder.addCase(getProductWithCategory.rejected, (state) => {
      state.productWithCategoryLoader = false;
      state.productMsg ="Sorry something is went wrong try again"
    });
    //Product Details
    builder.addCase(getProductDetails.pending, (state) => {
      state.productDetailLoader = true;
      state.productDetailData = {}
    });
    builder.addCase(getProductDetails.fulfilled, (state, { payload }) => {
      state.productDetailLoader = false;
      state.productDetailData = payload.data
    });
    builder.addCase(getProductDetails.rejected, (state) => {
      state.productDetailLoader = false;
    });
  },
});

export const { logoutProducts } = productSlice.actions;
export default productSlice.reducer;