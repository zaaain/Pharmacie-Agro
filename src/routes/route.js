import React,{ useState} from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import useSnackMsg from "hooks/useSnackMsg";
import Modal from "components/common/base/Modal";
import SignUpForm from "Forms/SignUpForm";
import { userRegister, getProfile, getAllAddress } from "../redux/slices/authSlice/authAction";
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
import Requests from "pages/Requests";
import Bids from "pages/Bids";
import NotFound from "pages/NotFound" 
//

const RoutesMain = () => {

  const location = useLocation();
  const pathname = location.pathname
  const dispatch = useDispatch();
  const { eSnack } = useSnackMsg();
  const [open, setOpen] = useState(true);
  const jwt = localStorage.getItem("jwt");
  const authReducer = useSelector((state) => state.auth);
  const { profileData, profileLoader, role } = authReducer;
  const { name } = profileData;
  const registerFlag =
    !pathname.includes("/auth") && jwt && !name && !profileLoader
      ? true
      : false;

  const handleRegisterUser = (val) => {
    
    const values = {
      name: val.name ? val.name : undefined,
      location:{
        district: val.district ? val.district : undefined,
        tehsil: val.tehsil ? val.tehsil : undefined,
        city: val.city ? val.city : undefined,
        address: val.address ? val.address : undefined,
      }
    };
    const payload = role && role === "seller" ? values : val
    dispatch(userRegister(payload))
      .unwrap()
      .then((res) => {
        dispatch(getProfile());
        dispatch(getAllAddress())
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
        <Route exact path="/requests" element={<Requests />} />
        <Route exact path="/bids" element={<Bids />} />
        <Route exact path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />}/>
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
