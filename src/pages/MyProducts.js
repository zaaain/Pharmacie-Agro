import React, { useState, useEffect } from "react";
import withAuth from "Hoc/withAuth";
import Layout from "layout/DashboardLayout"
import ProductCard from "components/dashboard/ProductCard";
import { Button } from "components/common/base/button";
import { useNavigate } from "react-router-dom";
import useClient from "hooks/useClient";
import { CircularProgress } from "@mui/material";
import { useWindowSize } from "react-use";

const Products = () => {

  const [data, setData] = useState([])
  const [loader,setLoader] = useState(false)
  const navigate = useNavigate()
  const {api} = useClient()
  const jwt = localStorage.getItem("jwt");
  const {width} = useWindowSize()

  const handleGetMyProducts = () => {
    if(!jwt) return
    const skip = data && data.length 
    setLoader(true)
    api.get(`/api/product/my?skip=${skip}`)
    .then((res)=>{
      setData(res.data && res.data.data)
      setLoader(false)
    })
    .catch((err)=>{
      setLoader(false)
    })
  }

  useEffect(()=>{
    handleGetMyProducts()
  },[])


  return (
    <Layout>
      <div className="flex justify-center mb-2 z-10 bg-white sticky top-0 p-4"> 
        <Button
          variant="primary"
          value="Add New Product"
          height={width < 768 ? 40 : 50}
          width={width < 768 ? 160 : 200}
          onClick={()=>navigate("/products/new")}
        />
      </div>
      <div className="p-4">
      <div className="grid grid-cols-6 gap-8">
        {loader && (
          <div className="col-span-6 flex items-center justify-center">
            <CircularProgress size={36} style={{color:"#668968"}}/>
          </div>
        )}
        {!loader && data && data.length === 0 && (
          <div className="col-span-6 flex items-center justify-center">
            <p className="font-Roboto text-[18px]">You have not added current any product !</p>
          </div>
        )}
        {!loader && data && data.length > 0 && data.map((item) => (
          <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-3 sm:col-span-3 xs:col-span-6" key={item}>
            <ProductCard data={item} />
          </div>
        ))}
      </div>
      </div>
    </Layout>
  );
};

export default withAuth(Products);
