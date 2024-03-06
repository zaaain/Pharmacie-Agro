import React from "react";
import { imgPath } from "helpers/path";


const ProductCard = ({data}) => {

  return (
    <div className="w-full bg-white border-2 relative border-l-primary border-r-primary border-t-secondary border-b-secondary  rounded-2xl">
       <img
        className="max-h-[150px] min-h-[150px] max-w-[150px] min-w-[150px] rounded-full mx-auto my-2"
        draggable={false}
        src={`${imgPath}${data.image[0]}`}
        alt="avatar"
      /> 
      <div className="p-3 leading-6">
        <p className="font-RobotoBold text-primary text-[16px] truncate">
          Product Name:{" "}
          <span className="text-black font-Roboto  ">
            {data.name && data.name}
          </span>
        </p>
        <p className="font-RobotoBold text-primary text-[16px] truncate">
          Product Category:{" "}
          <span className="text-black font-Roboto  ">
            {data.ProductType && data.ProductType}
          </span>
        </p>
        <p className="font-RobotoBold text-primary text-[16px] truncate">
          Product Price:{" "}
          <span className="text-black font-Roboto  ">{data.price && `${data.price}/- PKR`}</span>
        </p>
      </div>

      {/* <div className="flex justify-between">
        <button className="h-[50px] w-[120px] text-white font-RobotoBold rounded-bl-xl rounded-tr-xl bg-primary">
          Delete
        </button>
        <button className="h-[50px] w-[120px] text-white font-RobotoBold rounded-br-xl rounded-tl-xl bg-primary">
          Update
        </button>
      </div> */}
    </div>
  );
};

export default ProductCard;
