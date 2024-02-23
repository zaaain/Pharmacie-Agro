import React, { useEffect} from "react";
import Layout from "layout/BaseLayout";
import FormInput from "components/common/base/FormInput";
import { Button } from "components/common/base/button";
import { imgUrl,imgPath } from "helpers/path";
import { useDispatch , useSelector} from "react-redux";
import { getProductDetails } from "../redux/slices/productsSlice/productsAction";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { CircularProgress } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const data = {
  img: imgUrl + "/patatoo.jpg",
  price: "1500",
  ship: "Free",
  name: "Patato",
  address: "Piplan, Mianwali, Punjab",
  quantity: "100 plastic",
  description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
};

const ProductDetailWithId = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = queryString.parse(location.search);
  const {productDetailLoader, productDetailData} = useSelector((state)=> state.products)

  useEffect(()=>{
    if(!id) return
    dispatch(getProductDetails(id))
  },[])

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
            src={`${imgPath}${productDetailData.image[0]}`}
            alt={productDetailData.name}
            className="rounded-2xl min-w-full max-w-full min-h-[400px] max-h-[400px]"
          />
        </div>
        <div className="col-span-1">
          <p className="text-primary font-JosefinBold text-[22px] capitalize">
            {productDetailData.name}
          </p>
          <p className="text-primary font-Josefin text-[22px]">
            Quantity:{" "}
            <span className="text-neutral-800 text-[20px] font-Catamaran">
              {productDetailData.pkgQuantity}
            </span>
          </p>
          <p className="text-primary font-Josefin text-[22px]">
            Shipment:{" "}
            <span className="text-neutral-800 text-[20px] font-Catamaran capitalize">
              {productDetailData.shipping}
            </span>
          </p>
          <p className="text-primary font-Josefin text-[22px]">
            Address:{" "}
            <span className="text-neutral-800 text-[20px] font-Catamaran">
              {data.address}
            </span>
          </p>
          <div className="mt-4">
            <Button
              value="Order Now"
              height={45}
              width={140}
              font="Josefin"
            />
          </div>
          {productDetailData.bidding && productDetailData.bidding === "yes" && (
          <>
          <div className="max-w-[200px] mt-2">
            <FormInput
              placeholder="Enter Bid Price"
              type="number"
              // value={quantity}
              // onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <Button
              value="Bid Now"
              height={45}
              width={140}
              font="Josefin"
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
