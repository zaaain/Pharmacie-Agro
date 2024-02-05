import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-dashboard rounded-2xl">
      <img
        src={data.img}
        alt={data.name}
        className="min-w-full max-w-full min-h-[150px] max-h-[150px] object-cover rounded-t-2xl"
      />
      <div className="text-center py-3">
        <p className="text-[16px] font-Catamaran">{data.category}</p>
        <p className="text-[16px] font-Catamaran">{data.name}</p>
        <p className="text-[16px] font-CatamaranBold">{`PKR: ${data.price}`}</p>
      </div>
      <div
        onClick={() => navigate(`/products/${data.id}`)}
        className="bg-gradient h-[55px] rounded-b-2xl p-2 flex justify-center items-center cursor-pointer"
      >
        <p className="text-white font-Josefin text-[18px]">Details</p>
      </div>
    </div>
  );
};

export default Card;
