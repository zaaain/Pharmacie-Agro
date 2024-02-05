import React from "react";
import Layout from "layout/DashboardLayout";
import OrderCard from "components/dashboard/OrderCard";

const Order = () => {
  return (
    <Layout>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <OrderCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
