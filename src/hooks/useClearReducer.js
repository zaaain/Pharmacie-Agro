import { useDispatch } from "react-redux";
import { logoutAuth } from "../redux/slices/authSlice/authReducer";
import {logoutProducts} from "../redux/slices/productsSlice/productsReducer";
import {logoutAgri} from "../redux/slices/agriNetwork/agriNetworkReducer";

const useClearReducer = () => {

  const dispatch = useDispatch();

  const clearReducer = () => {
    dispatch(logoutAuth());
    dispatch(logoutProducts());
    dispatch(logoutAgri());
  };

  return clearReducer;
};

export default useClearReducer;
