

import React from "react";
import { Button } from "components/common/base/button";



const SellingCard = ({ data }) => {
  return (
    <div className="bg-white shadow-dashboard rounded-2xl">
        <img src={data.img} alt={data.name}  className="min-w-full max-w-full min-h-[150px] max-h-[150px] rounded-t-2xl"/>
      <div className="text-center py-3">
        <p className="text-[16px] font-Roboto">{data.category}</p>
        <p className="text-[16px] font-Roboto">{data.name}</p>
        <p className="text-[16px] font-RobotoBold">{`PKR: ${data.price.toLocaleString()}`}</p>
      </div>
      <div className="bg-gradient rounded-b-2xl p-2 flex justify-end">
        <div>
          <Button
            height={40}
            width={120}
            value="Details"
            variant="outline"
            font="Roboto"
          />
        </div>
      </div>
    </div>
  );
};

export default SellingCard;
