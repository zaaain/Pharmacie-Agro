import React from "react";

const ProductCard = () => {
  return (
    <div className="w-full bg-white border-2 border-l-primary border-r-primary border-t-secondary border-b-secondary  rounded-2xl">
      <img
        className="rounded-full my-3 mx-auto w-[150px] h-[150px]"
        draggable={false}
        src="/product.jpg"
        alt="avatar"
      />
      <div className="p-3 leading-6">
        <p className="font-CatamaranBold text-primary text-[16px] truncate">
          Product Name:{" "}
          <span className="text-black font-Catamaran  ">
            This is a product name
          </span>
        </p>
        <p className="font-CatamaranBold text-primary text-[16px] truncate">
          Product Category:{" "}
          <span className="text-black font-Catamaran  ">
            This is a product category
          </span>
        </p>
        <p className="font-CatamaranBold text-primary text-[16px] truncate">
          Product Price:{" "}
          <span className="text-black font-Catamaran  ">1000 PRs</span>
        </p>
      </div>

      <div className="flex justify-between">
        <button className="h-[50px] w-[120px] text-white font-CatamaranBold rounded-bl-xl rounded-tr-xl bg-primary">
          Delete
        </button>
        <button className="h-[50px] w-[120px] text-white font-CatamaranBold rounded-br-xl rounded-tl-xl bg-primary">
          Update
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
