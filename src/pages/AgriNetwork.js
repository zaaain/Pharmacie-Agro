import React from "react";
import Layout from "layout/BaseLayout";
import Card from "components/agriNetwork/Card";
import { imgUrl } from "helpers/path";

const data = [
  {
    id: 1,
    avatar: imgUrl + "/kisan.png",
    phone: "0300 0000000",
    status: "Farmer",
    address: "Rawalpindi Punjab, PAkistan",
    name: "John Doe",
  },
  {
    id: 1,
    avatar: imgUrl + "/kisan.png",
    phone: "0300 0000000",
    status: "Farmer",
    address: "Rawalpindi Punjab, PAkistan",
    name: "John Doe",
  },
  {
    id: 1,
    avatar: imgUrl + "/kisan.png",
    phone: "0300 0000000",
    status: "Farmer",
    address: "Rawalpindi Punjab, PAkistan",
    name: "John Doe",
  },
];

const AgriNetwork = () => {
  return (
    <Layout>
      <div className="my-10">
        <p className="text-center font-JosefinBold text-primary text-[32px]">
          Agri Network
        </p>
        <img
          src={imgUrl + "/basil-leaf.png"}
          alt="leaf"
          className="mx-auto mt-5"
        />
        <div className="w-[80%] mx-auto grid grid-cols-3 gap-5 mt-10">
          {data &&
            data.map((item) => (
              <div key={item.id} className="col-span-1">
                <Card data={item} />
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default AgriNetwork;
