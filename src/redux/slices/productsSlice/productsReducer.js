import { createSlice } from "@reduxjs/toolkit";
import { addNewProduct , getAllProduct, getProductWithCategory, getProductDetails, getProductsAnalytic, searchProduct, searchByProduct} from "./productsAction";

// Initial state
const initialState = {
  newProductLoader: false,
  allProductLoader: false,
  productWithCategoryLoader: false,
  productDetailLoader: false,
  productAnalyticLoader: false,
  productsData:[],
  productMsg:"Please Search Product",
  productDetailData:{},
  productAnalyticData:{},
  searchProductData:[],
  searchProductLoader:false,
  searchByProductLoader: false,
  searchByProductMsg: "Please Search Product",
  searchByProductData: [],
  // searchProductMsg:"xyz .."
};

// Actual Slice
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    logoutProducts: (state) => {
      return initialState;
    },
    
    clearProduct: (state,) => {
      state.searchByProductData = [];
      state.searchByProductMsg ="Please Search Product"
    }
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
      state.productMsg = payload.data && payload.data.length <= 0 ? "Sorry no products available" : "";
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
    //Product Analytic
    builder.addCase(getProductsAnalytic.pending, (state) => {
          state.productAnalyticLoader = true;
          state.productAnalyticData = {}
    });
    builder.addCase(getProductsAnalytic.fulfilled, (state, { payload }) => {
      state.productAnalyticLoader = false;
      state.productAnalyticData = payload.data
    });
    builder.addCase(getProductsAnalytic.rejected, (state) => {
        state.productAnalyticLoader = false;
    });
    //Search By Product
    builder.addCase(searchProduct.pending, (state) => {
      state.searchProductLoader = true;
      state.productMsg = "";
      state.productsData= []
    });
    builder.addCase(searchProduct.fulfilled, (state, { payload }) => {
      state.searchProductLoader = false;
      state.productsData = payload.data;
      state.productMsg = payload.data && payload.data.length <= 0 ? "Sorry no products availavle in this search" : "";
    });
    builder.addCase(searchProduct.rejected, (state) => {
      state.searchProductLoader = false;
      state.productMsg ="Sorry something is went wrong try again"
    });
    //Search By Product
    builder.addCase(searchByProduct.pending, (state) => {
      state.searchByProductLoader = true;
      state.searchByProductMsg = "";
      state.searchByProductData= []
    });
    builder.addCase(searchByProduct.fulfilled, (state, { payload }) => {
      state.searchByProductLoader = false;
      state.searchByProductData = payload.data;
      state.searchByProductMsg = payload.data && payload.data.length <= 0 ? "Sorry no products availavle in this search" : "";
    });
    builder.addCase(searchByProduct.rejected, (state) => {
      state.searchByProductLoader = false;
      state.searchByProductMsg ="Sorry something is went wrong try again"
    });
  },
});

export const { logoutProducts , clearProduct} = productSlice.actions;
export default productSlice.reducer;