import { useDispatch } from "react-redux";
import { logoutAuth } from "../redux/slices/authSlice/authReducer";
import {logoutProducts} from "../redux/slices/productsSlice/productsReducer";
import { useNavigate } from "react-router-dom";

const useLogout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutAuth());
    dispatch(logoutProducts());
    localStorage.removeItem("jwt");
    navigate("/auth/login");
  };

  return logout;
};

export default useLogout;
