import { useDispatch } from "react-redux";
import { logoutAuth } from "../redux/slices/authSlice/authReducer";
import {logoutProducts} from "../redux/slices/productsSlice/productsReducer";
import {logoutAgri} from "../redux/slices/agriNetwork/agriNetworkReducer";
import { useNavigate } from "react-router-dom";
import useSnackMsg from "./useSnackMsg";
import AsynStorage from "helpers/asyncLocalStorage";
import { switchRole, getProfile , getAllAddress} from "../redux/slices/authSlice/authAction";
import {setUserRole } from "../redux/slices/authSlice/authReducer";

const useSwitch = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {eSnack , sSnack} = useSnackMsg()

  const switchUser = () => {

    dispatch(switchRole()).unwrap()
    .then((res)=>{
      dispatch(logoutAuth());
      dispatch(logoutProducts());
      dispatch(logoutAgri());
      localStorage.removeItem("jwt");
      AsynStorage.setItem("jwt", res.data.token).then(() => {
        const response = res.data
        dispatch(getProfile());
        dispatch(getAllAddress())
        dispatch(setUserRole(response.role))
        if(response.role === "seller"){
          navigate("/dashboard");
          sSnack(res.message ? res.message : "Successfull role changed")
        }else{
          navigate("/");
          sSnack(res.message ? res.message : "Successfull role changed")
        }
      })
    })
    .catch((err)=>{
      eSnack(err.message ? err.message : "Sorry something is went wrong")
    })
  };

  return switchUser;
};

export default useSwitch;