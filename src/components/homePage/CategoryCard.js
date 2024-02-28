import React from "react";
import { Button } from "components/common/base/button";
import { useNavigate } from "react-router-dom";

const CategoryCard= ({ data }) => {
const navigate = useNavigate()

  return (
    <div className="border-2 border-t-secondary border-l-secondary border-r-primary border-b-primary p-5 h-full flex flex-col rounded-2xl items-center text-center justify-center">
      <p className="text-primary font-RobotoBold text-[22px] xs:text-[18px]">{data.title}</p>
      <p className=" font-Roboto text-[16px] my-5">{data.about}</p>
      <Button
        value="Shop Now"
        variant="secondary"
        width={150}
        height={40}
        font="Roboto"
        onClick={()=>navigate("/products/all")}
      />
    </div>
  );
};

export default CategoryCard;
