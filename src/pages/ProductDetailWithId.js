import React, { useEffect, useState} from "react";
import Layout from "layout/BaseLayout";
import FormInput from "components/common/base/FormInput";
import { Button } from "components/common/base/button";
import { imgPath , imgUrl} from "helpers/path";
import { useDispatch , useSelector} from "react-redux";
import { getProductDetails } from "../redux/slices/productsSlice/productsAction";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { CircularProgress } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useClient from "hooks/useClient";
import useLogout from "hooks/useLogout";
import useSnackMsg from "hooks/useSnackMsg";
import { packagingType } from "helpers/constant";
import LocationOnIcon from '@mui/icons-material/LocationOn';



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

const getPkgType = (type) => {
  const val = packagingType && packagingType.find((item) => item.value === type)
  return val.label ? val.label : "" 
}

  return (
    <Layout>
    <div className="my-10">
      <div className="mx-auto w-[90%] xs:w-[95%]">
        <div className="shadow-dashboard p-2 flex items-center w-[90px] justify-center mb-5 rounded-lg cursor-pointer" onClick={()=>navigate(-1)}>
          <ArrowBackIcon className="text-primary"/>
          <p className="ml-2 font-RobotoBold text-[16px]">Back</p>
        </div>
      </div>
      {productDetailLoader ? <CircularProgress size={42} style={{color:"#668968", display:"flex", margin:"0 auto"}}/> :
      <div className="w-[90%] grid grid-cols-12 mx-auto gap-10 xs:gap-0 xs:space-y-3">
        
        <div className="col-span-3 xs:col-span-12">
          <div  className="w-full h-full flex flex-col items-center justify-center border-primary border-2 p-5 rounded-2xl">
            <p className="text-primary  font-RobotoBold text-[22px] text-center"> Seller Information</p>
            <div className="mt-5 flex flex-col items-center justify-center">
            <img
            src={productDetailData && productDetailData.user && productDetailData.user.avatar ?`${imgPath}${productDetailData.user.avatar}` : `${imgUrl}/kisan.png`}
            alt={productDetailData.name}
            className="rounded-full w-[100px] h-[100px] bg-cover"
          />
          {productDetailData && productDetailData.user && productDetailData.user.firstName && productDetailData.user.lastName && (
            <p className="text-primary font-RobotoBold text-[22px] pt-2">{productDetailData.user.firstName && productDetailData.user.lastName && `${productDetailData.user.firstName} ${productDetailData.user.lastName}`}</p>
          )}
               {productDetailData && productDetailData.user && productDetailData.user.phone && (
            <p className="text-primary font-RobotoBold text-[22px] pt-2">{productDetailData.user.phone && productDetailData.user.phone}</p>
          )}
                   {productDetailData && productDetailData.user && productDetailData.user.email && (
            <p className=" font-RobotoBold text-[16px] pt-2">{productDetailData.user.email && productDetailData.user.email}</p>
          )}
            </div>
          </div>
        </div>
        <div className="col-span-6 xs:col-span-12">
          <div className="w-full h-full flex flex-col shadow-dashboard rounded-xl bg-white p-5">
          <p className="text-primary font-RobotoBold text-[22px] text-center">Product Information</p>
          <div className="mt-3">
            {productDetailData.ProductType && (
            <p className=" text-[18px] text-primary font-Roboto">
              Product Type: <span className="text-black font-Roboto capitalize">{productDetailData.ProductType && productDetailData.ProductType}</span>
            </p>
            )}
            {productDetailData.name && (
            <p className=" text-[18px] text-primary font-Roboto">
              Product Name: <span className="text-black font-Roboto capitalize">{productDetailData.name && productDetailData.name}</span>
            </p>
            )}
            {productDetailData.brand && (
            <p className=" text-[18px] text-primary font-Roboto">
              Product Brand: <span className="text-black font-Roboto capitalize">{productDetailData.brand && productDetailData.brand}</span>
            </p>
            )}
            {productDetailData.pkgQuantity && (
            <p className=" text-[18px] text-primary font-Roboto">
              Package Quantity: <span className="text-black font-Roboto capitalize">{productDetailData.pkgQuantity && productDetailData.pkgQuantity}</span>
            </p>
            )}
            {productDetailData.pkgWeight && (
            <p className=" text-[18px] text-primary font-Roboto">
              Package Weight: <span className="text-black font-Roboto capitalize">{productDetailData.pkgWeight && productDetailData.pkgWeight}</span>
            </p>
            )}
            {productDetailData.pkgType && (
            <p className=" text-[18px] text-primary font-Roboto">
              Package Type: <span className="text-black font-Roboto capitalize">{productDetailData.pkgType && getPkgType(productDetailData.pkgType)}</span>
            </p>
            )}
            {productDetailData.availableFrom && (
            <p className=" text-[18px] text-primary font-Roboto">
              Available From: <span className="text-black font-Roboto capitalize">{productDetailData.availableFrom && productDetailData.availableFrom}</span>
            </p>
            )}
                   {productDetailData.shelfLifeStart && (
            <p className=" text-[18px] text-primary font-Roboto">
              Shelf Life Start: <span className="text-black font-Roboto capitalize">{productDetailData.shelfLifeStart && productDetailData.shelfLifeStart}</span>
            </p>
            )}
            {productDetailData.shelfLifeEnd && (
            <p className=" text-[18px] text-primary font-Roboto">
              Shelf Life End: <span className="text-black font-Roboto capitalize">{productDetailData.shelfLifeEnd && productDetailData.shelfLifeEnd}</span>
            </p>
            )}
             {productDetailData.user && productDetailData.user.address && productDetailData.user.address.length > 0 && (
            <div className="mt-2 bg-[#f5f6f7] rounded-lg">
              <p className=" text-[18px] text-primary font-Roboto">Product available in these cities:</p>
                 {productDetailData.user && productDetailData.user.address && productDetailData.user.address.length > 0 && 
           productDetailData.user.address.map((item, index)=>(
            <p className="text-[18px] text-black font-Roboto capitalize">
            {`${index+ 1}. ${item.city}`}
          </p>
            ))}
            </div>
            )}
        
          </div>
          </div>
        </div>
        <div className="col-span-3 xs:col-span-12">
          <div  className="w-full h-full flex flex-col items-center justify-center bg-[#f5f6f7] p-5 rounded-2xl border-4 border-dashed">
            <p className="text-primary font-RobotoBold text-[22px] text-center">Pricing</p>
            <div className="flex flex-col justify-center items-center">
            {productDetailData.tax && (
            <p className=" text-[18px] text-primary font-Roboto">
              Tax: <span className="text-black font-Roboto capitalize">{productDetailData.tax && productDetailData.tax}</span>
            </p>
            )}
            {productDetailData.price && (
            <p className=" text-[18px] text-primary font-Roboto">
              Price: <span className="text-black font-Roboto capitalize">{productDetailData.price && productDetailData.price} PRs</span>
            </p>
            )}
          <div className="mt-1">
            <Button
              value="Order Now"
              height={45}
              width={140}
              font="Roboto"
              disabled={getOwner(productDetailData.user && productDetailData.user.id) || orderLoader}
              loader={orderLoader}
              onClick={() => handleOrderNow(productDetailData.id)}
            />
          </div>
              {!getOwner(productDetailData.user && productDetailData.user.id) && productDetailData.bidding && productDetailData.bidding === "yes" && (
          <>
          <div className="w-full mt-5">
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
              font="Roboto"
              onClick={() => handleBidNow(productDetailData.id)}
              loader={bidLoader}
              disabled={bidLoader || !bidPrice|| bidPrice <= 0}
            />
          </div>
          </>
          )}
            </div>
          </div>
          
        </div>
        <div className="col-span-12 mt-2">
        <p className="font-RobotoBold text-[22px] text-primary  cursor-pointer">
            Product Images
            <hr className="my-2" />
            <div className="w-full grid grid-cols-12 gap-5 xs:gap-0 xs:space-y-3">
  {productDetailData && productDetailData.image && productDetailData.image.length > 0 && productDetailData.image.map((item, index) => (
    <div key={index} className="col-span-4 xs:col-span-12 h-48 ">
      <img 
        alt={item} 
        src={`${imgPath}${item}`} 
        className="max-w-full min-w-full h-full object-cover rounded-2xl"
      />
    </div>
  ))}
</div>
          </p>
        </div>
        {/* <div className="col-span-1">
          <img
            src={productDetailData && productDetailData.image && productDetailData && productDetailData.image.length && `${imgPath}${productDetailData.image[0]}`}
            alt={productDetailData.name}
            className="rounded-2xl min-w-full max-w-full min-h-[400px] max-h-[400px]"
          />
        </div>
        <div className="col-span-1">
          <p className="text-primary font-RobotoBold text-[22px] capitalize">
            {productDetailData.name && productDetailData.name}
          </p>
          <p className="text-primary font-Roboto text-[22px]">
            Price:{" "}
            <span className="text-neutral-800 text-[20px] font-Roboto">
              {productDetailData.price && `${productDetailData.price} PRs ${productDetailData.tax && productDetailData.tax === "inclusive" ? "with tax" : "with out tax"}`}
            </span>
          </p>
          <p className="text-primary font-Roboto text-[22px]">
            Shipment:{" "}
            <span className="text-neutral-800 text-[20px] font-Roboto capitalize">
              {productDetailData.shipping && productDetailData.shipping === "free" ? "Free" : "Not Free"}
            </span>
          </p>
          <p className="text-primary font-Roboto text-[22px]">
          Product available in these cities:
          </p>
          <div className="grid grid-cols-4">
          {productDetailData.user && productDetailData.user.address && productDetailData.user.address.length > 0 && productDetailData.user.address.map((item, index)=>(
            
                <p className="text-neutral-800 text-[20px] font-Roboto col-span-1">
                {`${index+ 1}.${item.city}`}
              </p>
           
          ))}
           </div>
            <p className="text-primary font-Roboto text-[22px]">
            Seller Name:{" "}
            <span className="text-neutral-800 text-[20px] font-Roboto">
              {productDetailData && productDetailData.user && `${productDetailData.user.firstName} ${productDetailData.user.lastName}`}
            </span>
          </p>
          {productDetailData.user && productDetailData.user.phone && (
                     <p className="text-primary font-Roboto text-[22px]">
                    Seller Phone:{" "}
                     <span className="text-neutral-800 text-[20px] font-Roboto">
                       {productDetailData && productDetailData.user && productDetailData.user.phone}
                     </span>
                   </p>
          )}
          {productDetailData.user && productDetailData.user.email && (
                     <p className="text-primary font-Roboto text-[22px]">
                     Seller Email:{" "}
                     <span className="text-neutral-800 text-[20px] font-Roboto">
                       {productDetailData && productDetailData.user && productDetailData.user.email}
                     </span>
                   </p>
          )}
          <div className="mt-4">
            <Button
              value="Order Now"
              height={45}
              width={140}
              font="Roboto"
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
              font="Roboto"
              onClick={() => handleBidNow(productDetailData.id)}
              loader={bidLoader}
              disabled={bidLoader || !bidPrice|| bidPrice <= 0}
            />
          </div>
          </>
          )}
        </div> */}
        <div className="col-span-12">
          <p className="font-RobotoBold text-[22px] text-primary  cursor-pointer">
            Description
          </p>
          <hr className="my-2" />
          <p className="font-Roboto text-[18px] capitalize">{productDetailData.description}</p>
        </div>
      </div>
      } 
    </div>
    </Layout>
  );
};

export default ProductDetailWithId;
