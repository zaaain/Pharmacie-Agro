import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorBoundary from "pages/ErrorBoundary";
import Home from "pages/Home";
import Login from "pages/Login";
import AllProducts from "pages/AllProducts"
import AgriNetwork from "pages/AgriNetwork"
import ProductDetailWithId from "pages/ProductDetailWithId"
import AgriNetworkPersonWithId from "pages/NetworkPersonWithId"
import DashboardHome from "pages/DashBoardHome"
import MyProducts from "pages/MyProducts"
import AddNewProduct from "pages/AddNewProduct";
import Profile from "pages/Profile";
import Orders from "pages/Orders"

const AppRouter = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/products/all" element={<AllProducts />} />
          <Route path="/agri-network" element={<AgriNetwork />} />
          <Route path="/products/:id" element={<ProductDetailWithId />} />
          <Route path="/agri-network/:id" element={<AgriNetworkPersonWithId />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/products/my" element={<MyProducts />} />
          <Route path="/products/new" element={<AddNewProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default AppRouter;
