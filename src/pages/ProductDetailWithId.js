import React, { useState } from "react";
import Layout from "layout/BaseLayout";
import FormInput from "components/common/base/FormInput";
import { Button } from "components/common/base/button";
import { imgUrl } from "helpers/path";

const data = {
  img: imgUrl + "/detailImg.jpg",
  price: "1500",
  ship: "Free",
  name: "Zarva",
  address: "Piplan, Mianwali, Punjab",
  quantity: "100 plastic",
  description:
    "Zinc plays a crucial role in plant growth as an essential micronutrient. It is a cofactor for various enzymes involved in metabolic processes, aiding in photosynthesis and energy production. Zinc also contributes to the formation of plant hormones, influencing growth and development. Adequate zinc levels enhance plant resistance to stress factors such as diseases and drought. However, an imbalance in zinc availability can negatively impact plant health, emphasizing the importance of maintaining proper zinc levels in soil for optimal crop growth.",
};

const ProductDetailWithId = () => {
  const [quantity, setQuantity] = useState (null);

  const handleChange = (val) => {
    if (val < 0) return;
    setQuantity(val);
  };

  return (
    <Layout>
    <div className="my-10">
      <div className="w-[80%] grid grid-cols-2 items-center mx-auto gap-10">
        <div className="col-span-1">
          <img
            src={data.img}
            alt={data.name}
            className="rounded-2xl min-w-full max-w-full min-h-[400px] max-h-[400px]"
          />
        </div>
        <div className="col-span-1">
          <p className="text-primary font-JosefinBold text-[22px]">
            {data.name}
          </p>
          <p className="text-primary font-Josefin text-[22px]">
            Quantity:{" "}
            <span className="text-neutral-800 text-[20px] font-Catamaran">
              {data.quantity}
            </span>
          </p>
          <p className="text-primary font-Josefin text-[22px]">
            Shipment:{" "}
            <span className="text-neutral-800 text-[20px] font-Catamaran">
              {data.ship}
            </span>
          </p>
          <p className="text-primary font-Josefin text-[22px]">
            Address:{" "}
            <span className="text-neutral-800 text-[20px] font-Catamaran">
              {data.address}
            </span>
          </p>
          <div className="max-w-[200px] mt-2">
            <FormInput
              placeholder="Enter Quantity"
              type="number"
              value={quantity}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <Button
              value="Add To Cart"
              height={45}
              width={140}
              font="Josefin"
              disabled={quantity <= 0}
            />
          </div>
        </div>
        <div className="col-span-2">
          <p className="font-JosefinBold text-[22px] text-primary  cursor-pointer">
            Description
          </p>
          <hr className="my-5" />
          <p className="font-Catamaran text-[18px]">{data.description}</p>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ProductDetailWithId;
