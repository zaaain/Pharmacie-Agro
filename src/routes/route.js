import React,{useState} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import useSnackMsg from "hooks/useSnackMsg";
import Modal from "components/common/base/Modal";
import SignUpForm from "Forms/SignUpForm";
import { userRegister, getProfile } from "../redux/slices/authSlice/authAction";
import { useDispatch, useSelector } from "react-redux";
//
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
import Bids from "pages/Bids";
//

const RoutesMain = () => {

  const location = useLocation();
  const pathname = location.pathname
  const dispatch = useDispatch();
  const { eSnack } = useSnackMsg();
  const [open, setOpen] = useState(true);
  const jwt = localStorage.getItem("jwt");
  const authReducer = useSelector((state) => state.auth);
  const { profileData, profileLoader } = authReducer;
  const { firstName, lastName } = profileData;
  const registerFlag =
    !pathname.includes("/auth") && jwt && !firstName && !lastName && !profileLoader
      ? true
      : false;

  const handleRegisterUser = (val) => {
    const payload = {
      firstName: val.firstName,
      lastName: val.lastName,
      location: val.location,
    };
    dispatch(userRegister(payload))
      .unwrap()
      .then((res) => {
        dispatch(getProfile());
        setOpen(false);
      })
      .catch((err) => {
        eSnack(err.message ? err.message : "Something is went wrong");
      });
  };

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth/login" element={<Login />} />
        <Route exact path="/products/all" element={<AllProducts />} />
        <Route exact path="/agri-network" element={<AgriNetwork />} />
        <Route exact path="/products/details" element={<ProductDetailWithId />} />
        <Route
          exact
          path="/agri-network/products"
          element={<AgriNetworkPersonWithId />}
        />
        <Route exact path="/dashboard" element={<DashboardHome />} />
        <Route exact path="/products/my" element={<MyProducts />} />
        <Route exact path="/products/new" element={<AddNewProduct />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/bids" element={<Bids />} />
      </Routes>
      {registerFlag && (
        <Modal isOpen={open} title={`Please Enter Info`}>
          <SignUpForm onSubmit={handleRegisterUser} />
        </Modal>
      )}
    </>
  );
};

export default RoutesMain;
