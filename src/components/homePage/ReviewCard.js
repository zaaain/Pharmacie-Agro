import React from "react";

const ReviewCard = ({ data }) => {
  return (
    <div className="border-2 border-t-secondary border-l-secondary border-r-primary border-b-primary p-5 flex flex-col rounded-2xl h-full min-w-full">
      <div className="flex">
        <img
          src={data.avatar}
          alt="avatar"
          className="max-w-[50px] min-h-[50px] max-h-[50px] min-w-[50px] rounded-full"
        />
        <div className="ml-5">
          <p className="font-CatamaranBold text-[18px]">{data.name}</p>
          <p className="font-JosefinBold text-[18px] text-primary">
            {data.rating}
          </p>
        </div>
      </div>
      <p className="text-[16px] font-Catamaran">{data.reviewText}</p>
    </div>
  );
};

export default ReviewCard;
