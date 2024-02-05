import React from "react";
import Layout from "layout/BaseLayout";
import Filter from "components/allProducts/Filter";
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

const AllProducts = () => {
  return (
    <Layout>
      <div className="w-[95%] mx-auto my-10">
        <div>
          <Filter />
        </div>
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

export default AllProducts;
