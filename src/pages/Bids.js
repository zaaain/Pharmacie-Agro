import React from "react";
import withAuth from "Hoc/withAuth";
import Layout from "layout/DashboardLayout";
import OrderCard from "components/dashboard/OrderCard";

const Bids = () => {
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

export default withAuth(Bids);
