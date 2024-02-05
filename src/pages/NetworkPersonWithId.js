import React from "react";
import Layout from "layout/BaseLayout";
import Card from "components/allProducts/Card";
import { imgUrl } from "helpers/path";

const data = [
  {
    id: 1,
    img: imgUrl + "/agripro.jpg",
    category: "Fertilizers",
    price: 1500,
    name: "Lambda",
  },
  {
    id: 2,
    img: imgUrl + "/agripro.jpg",
    category: "Vegetables",
    price: 1500,
    name: "Lambda",
  },
  {
    id: 3,
    img: imgUrl + "/agripro.jpg",
    category: "Fruits",
    price: 1000,
    name: "Lambda",
  },
  {
    id: 4,
    img: imgUrl + "/agripro.jpg",
    category: "Fertilizers",
    price: 1200,
    name: "Lambda",
  },
];

const page = () => {
  return (
    <Layout>
    <div className="w-[90%] mx-auto my-10">
      <p className="text-[32px] font-JosefinBold text-primary text-center">
        John Doe Products
      </p>
      <img
          src={imgUrl + "/basil-leaf.png"}
          alt="leaf"
          className="mx-auto mt-5"
        />
      <div className="grid grid-cols-4 gap-5 mt-[60px]">
        {data &&
          data.map((item) => (
            <div className="col-span-1" key={item.id}>
              <Card data={item} />
            </div>
          ))}
      </div>
    </div>
    </Layout>
  );
};

export default page;
