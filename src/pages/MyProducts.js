import React from "react";
import Layout from "layout/DashboardLayout"
import ProductCard from "components/dashboard/ProductCard";
import { Button } from "components/common/base/button";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const data = [1, 2, , 3, , 4, 5, , 6, 7, 8, 9];
  const navigate = useNavigate()
  return (
    <Layout>
      <div className="flex justify-center mb-2 z-10 bg-white sticky top-0 p-4"> 
        <Button
          variant="primary"
          value="Add New Product"
          height={50}
          width={200}
          onClick={()=>navigate("/products/new")}
        />
      </div>
      <div className="p-4">
      <div className="grid grid-cols-3 gap-8">
        {data.map((item) => (
          <div className="col-span-1" key={item}>
            <ProductCard />
          </div>
        ))}
      </div>
      </div>
    </Layout>
  );
};

export default Products;
