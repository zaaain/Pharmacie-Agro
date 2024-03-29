import React, { useState } from "react";
import useClient from "hooks/useClient";
import EnterPhoneEmailForm from "Forms/EnterPhoneEmailForm";
import EnterOtpForm from "Forms/EnterOtpForm";
import { imgUrl } from "helpers/path";
import { roles } from "helpers/constant";
import { enterOtp, getProfile , getAllAddress} from "../redux/slices/authSlice/authAction";
import { useDispatch } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useSnackMsg from "hooks/useSnackMsg";
import { useNavigate } from "react-router-dom";
import AsynStorage from "helpers/asyncLocalStorage";
import {setUserRole } from "../redux/slices/authSlice/authReducer";


const Login = () => {

  const { api } = useClient();
  const dispatch = useDispatch();
  const { eSnack } = useSnackMsg();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [otpFlag, setOtpFlag] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [userId, setUserId] = useState("");

  const handleLogin = (val) => {

    if (!val || !val.phone || !val.phone.length) {
      eSnack("Invalid phone number provided");
      return;
    }

    const phoneWithoutFirstDigit = val.phone.slice(1);
    if (!/^\d+$/.test(phoneWithoutFirstDigit) || phoneWithoutFirstDigit.length !== 10) {
      eSnack("Invalid phone number format");
      return;
    }

    const payload = {
      type: selectedRole,
      phone: `92${phoneWithoutFirstDigit}`,
    };

    setLoader(true);
    api.post("/api/auth/password/less/login",payload)
      .then((res) => {
        const response = res.data && res.data.data;
        setLoader(false);
        setOtpFlag(true);
        setUserId(response.id);
      })
      .catch((err) => {
        setLoader(false);
        eSnack(err.message ? err.message : "Sorry something is went wrong");
      });
  };

  const handleEnterOtp = async (val) => {
    const payload = {
      id: userId,
      otp: val.otp,
    };
    dispatch(enterOtp(payload))
      .unwrap()
      .then((res) => {
        AsynStorage.setItem("jwt", res.data.token).then(() => {
          const response = res.data
          const flag = response.name;
          if (flag && localStorage.getItem("jwt")) {
            dispatch(getProfile());
            dispatch(getAllAddress())
          }
          dispatch(setUserRole(response.role))
          if(response.role === "seller"){
            navigate("/dashboard");
          }else{
            navigate("/");
          }
          
        })
      })
      .catch((err) => {
        eSnack(err.message ? err.message : "Sorry something is went wrong");
      });
  };

  const handleBack = () => {
    if (selectedRole && otpFlag) {
      setOtpFlag(false);
    }
    if (selectedRole && !otpFlag) {
      setSelectedRole("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen min-w-full bg-gradient ">
      <div className="bg-white xs:w-[90%] sm:w-[80%] md:w-[50%]  rounded-2xl p-5">
        <div className="flex justify-between items-center">
          <img
            alt="logo"
            src={imgUrl + "/logo.png"}
            className="w-[200px] h-[60px] object-cover xs:max-w-[150px] xs:max-h-[45px]"
          />
          {selectedRole && (
            <Tooltip arrow placement="top" title="Go Back">
              <IconButton onClick={() => handleBack()}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <p className="font-Roboto font-extrabold text-[42px] text-center mt-5 text-primary">
          Sign In
        </p>
        {!selectedRole && !otpFlag && (
          <div className="mt-5">
            <p className="font-[18px] font-RobotoBold text-primary ">
              Please select role type ?
            </p>
            {roles &&
              roles.map((item) => (
                <div
                  className="bg-primary h-[50px] flex justify-center items-center rounded-xl cursor-pointer hover:border-2 border-secondary mt-5"
                  key={item.id}
                  onClick={() => setSelectedRole(item.type)}
                >
                  <p className="font-Roboto text-white text-[18px]">
                    {item.name}
                  </p>
                </div>
              ))}
          </div>
        )}
        {selectedRole && !otpFlag && (
          <EnterPhoneEmailForm
            onSubmit={handleLogin}
            loader={loader}
            role={selectedRole}
          />
        )}
        {selectedRole && otpFlag && (
          <EnterOtpForm
            onSubmit={handleEnterOtp}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
