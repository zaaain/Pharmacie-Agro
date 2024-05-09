import React from "react";
import { useNavigate } from "react-router-dom";
import { imgPath } from "helpers/path";

const Card = ({ data }) => {
 
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-dashboard rounded-2xl">
      <img
        src={`${imgPath}${data.image[0]}`}
        alt={data.ProductType}
        className="min-w-full max-w-full min-h-[150px] max-h-[150px] object-cover rounded-t-2xl"
      />
      {/* <div className="text-center py-3">
        <p className="text-[16px] font-Roboto truncate capitalize">{data.ProductType}</p>
        <p className="text-[16px] font-Roboto truncate capitalize">{data.name ? data.name : data.brand ? data.brand : ""}</p>
        <p className="text-[16px] font-RobotoBold">{`PKR: ${data.price && data.price.toLocaleString()}`}</p>
      </div> */}
            <div className="p-3 leading-6">
        <p className="font-RobotoBold text-primary text-[16px] truncate">
           Name:{" "}
          <span className="text-black font-Roboto  ">
            {data.name && data.name}
          </span>
        </p>
        <p className="font-RobotoBold text-primary text-[16px] truncate">
           Category:{" "}
          <span className="text-black font-Roboto  ">
            {data.ProductType && data.ProductType}
          </span>
        </p>
        <p className="font-RobotoBold text-primary text-[16px] truncate">
           SubCategory:{" "}
          <span className="text-black font-Roboto  ">
            {data.subProductType ? data.subProductType : "N/A"}
          </span>
        </p>
        <p className="font-RobotoBold text-primary text-[16px] truncate">
           Brand:{" "}
          <span className="text-black font-Roboto  ">
            {data.brand ? data.brand : "N/A"}
          </span>
        </p>
        <p className="font-RobotoBold text-primary text-[16px] truncate">
           Price:{" "}
          <span className="text-black font-Roboto  ">
            {/* {data.brand ? data.brand : "N/A"} */}
            {/* {data.price ? data.price.toLocaleString()}`} */}
            {data.price ? `PKR ${data.price.toLocaleString()}` : "N/A"}
          </span>
        </p>
      </div>
      <div
        onClick={() => navigate(`/products/details?id=${data.id}`)}
        className="bg-gradient h-[55px] rounded-b-2xl p-2 flex justify-center items-center cursor-pointer"
      >
        <p className="text-white font-Roboto text-[18px]">Details</p>
      </div>
    </div>
  );
};

export default Card;
