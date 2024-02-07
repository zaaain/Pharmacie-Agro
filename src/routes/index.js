import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorBoundary from "pages/ErrorBoundary";
import Home from "pages/Home";
import Login from "pages/Login";
import AllProducts from "pages/AllProducts";
import AgriNetwork from "pages/AgriNetwork";
import ProductDetailWithId from "pages/ProductDetailWithId";
import AgriNetworkPersonWithId from "pages/NetworkPersonWithId";
import DashboardHome from "pages/DashBoardHome";
import MyProducts from "pages/MyProducts";
import AddNewProduct from "pages/AddNewProduct";
import Profile from "pages/Profile";
import Orders from "pages/Orders";
import Modal from "components/common/base/Modal";
import SignUpForm from "Forms/SignUpForm";
import { pathname } from "helpers/path";
import { userRegister, getProfile } from "../redux/slices/authSlice/authAction";
import { useDispatch, useSelector } from "react-redux";
import useSnackMsg from "hooks/useSnackMsg";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { eSnack } = useSnackMsg();
  const [open, setOpen] = useState(true);
  const jwt = localStorage.getItem("jwt");
  const authReducer = useSelector((state) => state.auth);
  const { profileData , profileLoader } = authReducer;
  const { firstName, lastName } = profileData;

 

  const handleRegisterUser = (val) => {
    const payload = {
      firstName: val.firstName,
      lastName: val.lastName,
      location: {
        address: "G7 Islamabad",
        city: "Islamabad",
        province: "capital",
        pincode: "423423",
        country: "Pakistan",
        latitude: "-23.4",
        longitude: "12.5",
      },
    };
    dispatch(userRegister(payload))
      .unwrap()
      .then((res) => {
        dispatch(getProfile());
        setOpen(false)
      })
      .catch((err) => {
        eSnack(err.message ? err.message : "Something is went wrong");
      });
  };

  return (
    <>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/products/all" element={<AllProducts />} />
            <Route path="/agri-network" element={<AgriNetwork />} />
            <Route path="/products/:id" element={<ProductDetailWithId />} />
            <Route
              path="/agri-network/:id"
              element={<AgriNetworkPersonWithId />}
            />
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/products/my" element={<MyProducts />} />
            <Route path="/products/new" element={<AddNewProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </ErrorBoundary>
      </Router>
      {!pathname.includes("/auth") && jwt && !firstName && !lastName && (
        <Modal isOpen={open} title={`Please Enter Info`}>
          <SignUpForm onSubmit={handleRegisterUser} />
        </Modal>
      )}
    </>
  );
};

export default AppRouter;
