import React from "react";
import Layout from "layout/BaseLayout";
import Filter from "components/allProducts/Filter";
import Card from "components/allProducts/Card";
import { getAllProduct, getProductWithCategory } from "../redux/slices/productsSlice/productsAction";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";

const AllProducts = () => {

  const dispatch = useDispatch()
  const {allProductLoader, productWithCategoryLoader, productsData, productMsg} = useSelector((state)=> state.products)

  const handleGetAllPro = () => {
    dispatch(getAllProduct())
  }

  const handleGetCategoryPro = (val) => {
    if(!val.category) return
    dispatch(getProductWithCategory(val.category))
  }

  return (
    <Layout>
      <div className="w-[95%] mx-auto my-10">
        <div>
          <Filter handleGetAllPro={handleGetAllPro} handleGetCategoryPro={handleGetCategoryPro}/>
        </div>
        <div className="grid grid-cols-12 gap-5 mt-[60px]">
          {(allProductLoader || productWithCategoryLoader ) && (
            <div className="col-span-12 flex justify-center">
              <CircularProgress size={42} style={{color:"#668968"}}/>
            </div>
          )}
          {(!allProductLoader && !productWithCategoryLoader && productMsg !== "") && (
            <div className="col-span-12 flex justify-center">
              <p className="font-Roboto text-[18px]">{productMsg}</p>
            </div>
          )}
          {!allProductLoader && !productWithCategoryLoader && productsData && productsData.length > 0 &&
            productsData.map((item) => (
              <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-4 md:col-span-6 sm:col-span-6 xs:col-span-12" key={item.id}>
                <Card data={item} />
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;
