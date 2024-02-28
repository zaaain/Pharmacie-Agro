import React from "react";

const ServiceCard = ({ data }) => {
  return (
    <div className="bg-white shadow-card p-5 rounded-2xl">
      <img
        src={data.img}
        alt={data.name}
        className="max-w-[50px] max-h-[50px] object-cover"
      />
      <p className="font-Roboto text-[20px] mt-5">{data.name}</p>
    </div>
  );
};

export default ServiceCard;
