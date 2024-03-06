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
  const {role} = useSelector((state)=> state.auth)
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

  const handleRequestNow = (idx) => {
    if(!idx) return
    if(!jwt){
      logout()
    }
    if(idx && jwt){
      const payload = {productId:idx}
      setOrderLoader(true)
      api.post(`/api/product/request`, payload)
      .then((res)=>{
        setOrderLoader(false)
        sSnack(`Successfully your request done seller contact you very soon`)
        navigate(-1)
      })
      .catch((err)=>{
        setOrderLoader(false)
        eSnack(err.message ? err.message :`Sorry something is went wron`)
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

console.log("productDetailData", productDetailData)

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
        
        <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-12 sm:col-span-12 xs:col-span-12">
          <div  className="w-full h-full flex flex-col items-center justify-center border-primary border-2 p-5 rounded-2xl">
            <p className="text-primary  font-RobotoBold text-[22px] text-center"> Seller Information</p>
            <div className="mt-5 flex flex-col items-center justify-center">
            <img
            src={productDetailData && productDetailData.user && productDetailData.user.avatar ?`${imgPath}${productDetailData.user.avatar}` : `${imgUrl}/kisan.png`}
            alt={productDetailData.name}
            className="rounded-full w-[100px] h-[100px] bg-cover"
          />
          {productDetailData && productDetailData.user && productDetailData.user.name && (
            <p className="text-primary font-RobotoBold text-[22px] pt-2">{productDetailData.user.name && productDetailData.user.name}</p>
          )}
               {productDetailData && productDetailData.user && productDetailData.user.phone && (
            <p className="text-primary font-RobotoBold text-[22px] pt-2">{productDetailData.user.phone && "0" + productDetailData.user.phone.replace(/^92/, "")}</p>
          )}
            </div>
          </div>
        </div>
        <div className="2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12  xs:col-span-12">
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
                 {productDetailData.composition && productDetailData.composition.length > 0 && (
            <div className="mt-2 bg-[#f5f6f7] rounded-lg p-1">
              <p className=" text-[18px] text-primary font-Roboto">Product Composition:</p>
            {productDetailData.composition && productDetailData.composition.length > 0 && productDetailData.composition.map((item, index)=>(
              <>
              {item.name && (
            <p className="text-[16px] text-primary font-RobotoBold truncate">Name:
            <span className="text-balance font-Roboto text-black">{item.name}</span>
            
          </p>
          )}
          {item.value && (
            <p className="text-[16px] text-primary font-RobotoBold truncate">Percentage:
            <span className="text-balance font-Roboto text-black">{item.value}</span>
          </p>
          )}
          
</>

            ))}
            </div>
            )}
          {productDetailData.user && productDetailData.address && productDetailData.address.length > 0 && (
            <div className="mt-2 bg-[#f5f6f7] rounded-lg p-1">
              <p className=" text-[18px] text-primary font-Roboto">Product Location:</p>
              <div className="grid grid-cols-2 gap-3">
            {productDetailData.address && productDetailData.address.length > 0 && productDetailData.address.map((item, index)=>(
            //  <p className="text-[18px] text-black font-Roboto capitalize">
            //   {`${index+ 1}. ${item.address}, ${item.tehsil}, ${item.city}, ${item.district}`}
            //   </p>
            <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 p-2 bg-white shadow-card rounded-lg">
              <p className="text-primary font-bold text-[14px]">City: <span className="text-black font-normal">{item.city}</span></p>
              <p className="text-primary font-bold text-[14px]">District: <span className="text-black font-normal">{item.district}</span></p>
              <p className="text-primary font-bold text-[14px]">Tehsil: <span className="text-black font-normal">{item.tehsil}</span></p>
              <p className="text-primary font-bold text-[14px]">Address: <span className="text-black font-normal">{item.address}</span></p>
              </div>
            ))}
            </div>
            </div>
          )}
          </div>
          </div>
        </div>
        <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-12 sm:col-span-12  xs:col-span-12">
          <div  className="w-full h-full flex flex-col items-center justify-center bg-[#f5f6f7] p-5 rounded-2xl border-4 border-dashed">
            <p className="text-primary font-RobotoBold text-[22px] text-center">Pricing</p>
            <div className="flex flex-col justify-center items-center">
            {productDetailData.price && (
            <p className=" text-[18px] text-primary font-Roboto mt-3">
              Price: <span className="text-black font-Roboto capitalize ">{productDetailData.price && productDetailData.price}/- PKR</span>
            </p>
            )}
            {role && role !== "seller" && (
            <>
          <div className="mt-1">
            <Button
              value="Request Seller"
              height={45}
              width={140}
              font="Roboto"
              disabled={getOwner(productDetailData.user && productDetailData.user.id) || orderLoader}
              loader={orderLoader}
              onClick={() => handleRequestNow(productDetailData.id)}
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
    <div key={index} className="2xl:col-span-3 xl:col-span-3 lg:col-span-4 md:col-span-6 sm:col-span-6 xs:col-span-12 h-48 ">
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
