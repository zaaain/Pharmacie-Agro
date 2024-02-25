import React from "react";
import { useNavigate } from "react-router-dom";
import { imgPath } from "helpers/path";
import Chip from "components/common/base/chip";

const Card = ({ data }) => {
 
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-dashboard rounded-2xl">
      <img
        src={`${imgPath}${data.image[0]}`}
        alt={data.ProductType}
        className="min-w-full max-w-full min-h-[150px] max-h-[150px] object-cover rounded-t-2xl"
      />
      <div className="text-center py-3">
        <p className="text-[16px] font-Catamaran">{data.ProductType}</p>
        <p className="text-[16px] font-Catamaran">{data.name}</p>
        <p className="text-[16px] font-CatamaranBold">{`PKR: ${data.price}`}</p>
      </div>
      <div
        onClick={() => navigate(`/products/details?id=${data.id}`)}
        className="bg-gradient h-[55px] rounded-b-2xl p-2 flex justify-center items-center cursor-pointer"
      >
        <p className="text-white font-Josefin text-[18px]">Details</p>
      </div>
    </div>
  );
};

export default Card;
