import React, { useEffect, useState} from "react";
import Layout from "layout/BaseLayout";
import FormInput from "components/common/base/FormInput";
import { Button } from "components/common/base/button";
import { imgPath } from "helpers/path";
import { useDispatch , useSelector} from "react-redux";
import { getProductDetails } from "../redux/slices/productsSlice/productsAction";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { CircularProgress } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useClient from "hooks/useClient";
import useLogout from "hooks/useLogout";
import useSnackMsg from "hooks/useSnackMsg";


const ProductDetailWithId = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = queryString.parse(location.search);
  const {productDetailLoader, productDetailData} = useSelector((state)=> state.products)
  const userID = useSelector((state)=> state.auth.profileData.id)
  const {api} = useClient()
  const logout = useLogout()
  const {eSnack, sSnack} = useSnackMsg()
  const jwt = localStorage.getItem("jwt");
  const [orderLoader, setOrderLoader] = useState(false)
  const [bidLoader, setBidLoader] = useState(false)
  const [bidPrice, setBidPrice] = useState(null)

  useEffect(()=>{
    if(!id) return
    dispatch(getProductDetails(id))
  },[])

  const getOwner = (idx) => {
    if(userID === idx){
      return true
    }
    else{
      return false
    }
  }

  const handleOrderNow = (idx) => {
    if(!idx) return
    if(!jwt){
      logout()
    }
    if(idx && jwt){
      const payload = {productId:idx}
      setOrderLoader(true)
      api.post(`/api/product/buy`, payload)
      .then((res)=>{
        setOrderLoader(false)
        sSnack(`Successfully your order done seller contact you very soon`)
        navigate(-1)
      })
      .catch((err)=>{
        setOrderLoader(false)
        eSnack(`Sorry something is went wron`)
        navigate(-1)
      })
    }
  }

  const handleBidNow = (idx) => {
    if(!idx) return
    if(!jwt){
      logout()
    }
    if(idx && jwt){
      const payload = {productId:idx, price:bidPrice}
      setBidLoader(true)
      api.post(`/api/product/bid`, payload)
      .then((res)=>{
        setBidLoader(false)
        sSnack(`Successfully your bid done seller contact you very soon`)
        navigate(-1)
      })
      .catch((err)=>{
        setBidLoader(false)
        eSnack(`Sorry something is went wron`)
      })
    }
  }

  return (
    <Layout>
    <div className="my-10">
      <div className="mx-auto w-[90%]">
        <div className="shadow-dashboard p-2 flex items-center w-[90px] justify-center mb-5 rounded-lg cursor-pointer" onClick={()=>navigate(-1)}>
          <ArrowBackIcon className="text-primary"/>
          <p className="ml-2 font-CatamaranBold text-[16px]">Back</p>
        </div>
      </div>
      {productDetailLoader ? <CircularProgress size={42} style={{color:"#668968", display:"flex", margin:"0 auto"}}/> :
      <div className="w-[80%] grid grid-cols-2 items-center mx-auto gap-10">
        <div className="col-span-1">
          <img
            src={productDetailData && productDetailData.image && productDetailData && productDetailData.image.length && `${imgPath}${productDetailData.image[0]}`}
            alt={productDetailData.name}
            className="rounded-2xl min-w-full max-w-full min-h-[400px] max-h-[400px]"
          />
        </div>
        <div className="col-span-1">
          <p className="text-primary font-JosefinBold text-[22px] capitalize">
            {productDetailData.name && productDetailData.name}
          </p>
          <p className="text-primary font-Josefin text-[22px]">
            Price:{" "}
            <span className="text-neutral-800 text-[20px] font-Catamaran">
              {productDetailData.price && `${productDetailData.price} PRs ${productDetailData.tax && productDetailData.tax === "inclusive" ? "with tax" : "with out tax"}`}
            </span>
          </p>
          <p className="text-primary font-Josefin text-[22px]">
            Shipment:{" "}
            <span className="text-neutral-800 text-[20px] font-Catamaran capitalize">
              {productDetailData.shipping && productDetailData.shipping === "free" ? "Free" : "Not Free"}
            </span>
          </p>
          <p className="text-primary font-Josefin text-[22px]">
          Product available in these cities:
          </p>
          {productDetailData.user && productDetailData.user.address && productDetailData.user.address.length > 0 && productDetailData.user.address.map((item)=>(
                <p className="text-neutral-800 text-[20px] font-Catamaran">
                {item.city}
              </p>
          ))}
            <p className="text-primary font-Josefin text-[22px]">
            Seller Name:{" "}
            <span className="text-neutral-800 text-[20px] font-Catamaran">
              {productDetailData && productDetailData.user && `${productDetailData.user.firstName} ${productDetailData.user.lastName}`}
            </span>
          </p>
          {productDetailData.user && productDetailData.user.phone && (
                     <p className="text-primary font-Josefin text-[22px]">
                    Seller Phone:{" "}
                     <span className="text-neutral-800 text-[20px] font-Catamaran">
                       {productDetailData && productDetailData.user && productDetailData.user.phone}
                     </span>
                   </p>
          )}
          {productDetailData.user && productDetailData.user.email && (
                     <p className="text-primary font-Josefin text-[22px]">
                     Seller Email:{" "}
                     <span className="text-neutral-800 text-[20px] font-Catamaran">
                       {productDetailData && productDetailData.user && productDetailData.user.email}
                     </span>
                   </p>
          )}
          <div className="mt-4">
            <Button
              value="Order Now"
              height={45}
              width={140}
              font="Josefin"
              disabled={getOwner(productDetailData.user && productDetailData.user.id) || orderLoader}
              loader={orderLoader}
              onClick={() => handleOrderNow(productDetailData.id)}
            />
          </div>
          {!getOwner(productDetailData.user && productDetailData.user.id) && productDetailData.bidding && productDetailData.bidding === "yes" && (
          <>
          <div className="max-w-[200px] mt-4">
            <FormInput
              placeholder="Enter Bid Price"
              type="number"
              value={bidPrice}
              onChange={(e)=> setBidPrice(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <Button
              value="Bid Now"
              height={45}
              width={140}
              font="Josefin"
              onClick={() => handleBidNow(productDetailData.id)}
              loader={bidLoader}
              disabled={bidLoader || !bidPrice|| bidPrice <= 0}
            />
          </div>
          </>
          )}
        </div>
        <div className="col-span-2">
          <p className="font-JosefinBold text-[22px] text-primary  cursor-pointer">
            Description
          </p>
          <hr className="my-5" />
          <p className="font-Catamaran text-[18px] capitalize">{productDetailData.description}</p>
        </div>
      </div>
      }
    </div>
    </Layout>
  );
};

export default ProductDetailWithId;
