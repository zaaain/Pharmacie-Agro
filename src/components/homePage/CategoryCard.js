import React from "react";
import { Button } from "components/common/base/button";

const CategoryCard= ({ data }) => {
  return (
    <div className="border-2 border-t-secondary border-l-secondary border-r-primary border-b-primary p-5 h-full flex flex-col rounded-2xl items-center text-center justify-center">
      <p className="text-primary font-JosefinBold text-[22px] xs:text-[18px]">{data.title}</p>
      <p className=" font-Catamaran text-[16px] my-5">{data.about}</p>
      <Button
        value="Shop Now"
        variant="secondary"
        width={150}
        height={40}
        font="Josefin"
      />
    </div>
  );
};

export default CategoryCard;
