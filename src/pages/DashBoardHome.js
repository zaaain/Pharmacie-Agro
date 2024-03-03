import React,{useEffect} from "react";
import Layout from "layout/DashboardLayout"
import withAuth from "Hoc/withAuth";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import {getProductsAnalytic} from "../redux/slices/productsSlice/productsAction"

const HomeDashboard = () => {

  const dispatch = useDispatch()
  const productsReducer = useSelector((state)=> state.products)
  const {productAnalyticLoader, productAnalyticData} = productsReducer

  useEffect(()=>{
    dispatch(getProductsAnalytic())
  },[])

  return (
    <Layout>
    <div className="p-4">
      <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 2xl:space-x-5 xl:space-x-5 lg:space-x-3 md:space-x-0 sm:space-x-0 xs:space-x-0 2xl:space-y-0 xl:space-y-0 lg:space-y-0  md:space-y-5 sm:space-y-5 xs:space-y-5">
        <div className="bg-white p-5 rounded-2xl border-t-secondary border-b-secondary border-l-primary border-r-primary border-2">
          <p className="text-[28px] font-bold font-RobotoBold text-primary">
            Total Requests
          </p>
          <div className="flex justify-center mt-5">
            <div className="w-[150px] h-[150px] rounded-full items-center justify-center flex bg-primary">
              {productAnalyticLoader ? <CircularProgress size={36} style={{color:"#fff"}}/> : (
              <p className="font-RobotoBold text-white text-[50px]">{productAnalyticData.totalRequest}</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-white p-5 rounded-2xl border-t-primary border-b-primary border-l-secondary border-r-secondary border-2">
          <p className="text-[28px] font-bold font-RobotoBold text-primary">
            Total Products
          </p>
          <div className="flex justify-center mt-5">
            <div className="w-[150px] h-[150px] rounded-full items-center justify-center flex bg-primary">
            {productAnalyticLoader ? <CircularProgress size={36} style={{color:"#fff"}}/> : (
              <p className="font-RobotoBold text-white text-[50px]">{productAnalyticData.totalProducts}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default withAuth(HomeDashboard);
