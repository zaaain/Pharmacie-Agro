import React from "react";
import { imgPath } from "helpers/path";


const SearchProductCard = ({data, onSelect}) => {

  return (
    <div className="w-full bg-white border-2 relative border-l-primary border-r-primary border-t-secondary border-b-secondary  rounded-lg">
       <img
        className="max-h-[150px] min-h-[150px] max-w-[150px] min-w-[150px] rounded-full mx-auto my-2"
        draggable={false}
        src={data.image && data.image.length > 0 && `${imgPath}${data.image[0]}`}
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
      </div>
      <div onClick={()=>onSelect(data)} className="bg-primary cursor-pointer w-full h-[50px] rounded-b-lg flex justify-center items-center">
        <p className="font-RobotoBold text-white text-[16px]">Added</p>
      </div>
    </div>
  );
};

export default SearchProductCard;
