import React, { useState, useEffect } from "react";
import withAuth from "Hoc/withAuth";
import Layout from "layout/DashboardLayout"
import ProductCard from "components/dashboard/ProductCard";
import { Button } from "components/common/base/button";
import { useNavigate } from "react-router-dom";
import useClient from "hooks/useClient";
import { CircularProgress } from "@mui/material";

const Products = () => {

  const [data, setData] = useState([])
  const [loader,setLoader] = useState(false)
  const navigate = useNavigate()
  const {api} = useClient()
  const jwt = localStorage.getItem("jwt");

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
          height={50}
          width={200}
          onClick={()=>navigate("/products/new")}
        />
      </div>
      <div className="p-4">
      <div className="grid grid-cols-3 gap-8">
        {loader && (
          <div className="col-span-3 flex items-center justify-center">
            <CircularProgress size={36} style={{color:"#668968"}}/>
          </div>
        )}
        {!loader && data && data.length === 0 && (
          <div className="col-span-3 flex items-center justify-center">
            <p className="font-Josefin text-[18px]">You have not added current any product !</p>
          </div>
        )}
        {!loader && data && data.length > 0 && data.map((item) => (
          <div className="col-span-1" key={item}>
            <ProductCard data={item} />
          </div>
        ))}
      </div>
      </div>
    </Layout>
  );
};

export default withAuth(Products);
