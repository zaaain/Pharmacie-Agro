import React, { useState } from "react";
import useClient from "hooks/useClient";
import EnterPhoneEmailForm from "Forms/EnterPhoneEmailForm";
import EnterOtpForm from "Forms/EnterOtpForm";
import { imgUrl } from "helpers/path";
import { roles } from "helpers/constant";
import { enterOtp, getProfile } from "../redux/slices/authSlice/authAction";
import { useDispatch } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useSnackMsg from "hooks/useSnackMsg";
import { useNavigate } from "react-router-dom";
import AsynStorage from "helpers/asyncLocalStorage";
import Cookies from "js-cookie";

const Login = () => {
  const { api } = useClient();
  const dispatch = useDispatch();
  const { eSnack } = useSnackMsg();
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [otpLoader, setOtpLoader] = useState(false);
  const [otpFlag, setOtpFlag] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [userNum, setUserNum] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

  const handleLogin = (val) => {
    const payload = {
      type: selectedRole,
      phone:
        selectedRole !== "company" && val.phone ? `92${val.phone}` : undefined,
      email: selectedRole === "company" && val.email ? val.email : undefined,
    };
    setLoader(true);
    if (selectedRole !== "company" && val.phone) {
      setUserNum(val.phone);
    }
    if (selectedRole === "company" && val.email) {
      setUserEmail(val.email);
    }
    api
      .post(
        selectedRole === "company"
          ? "/api/auth/password/less/login"
          : "/api/auth/password/less/login",
        payload
      )
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
          const flag = response.firstName && response.lastName;
          if (flag && localStorage.getItem("jwt")) {
            dispatch(getProfile());
          }
          navigate("/");
        })
      })
      .catch((err) => {
        console.log("2",err)
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
            className="w-[200px] h-[60px] object-cover"
          />
          {selectedRole && (
            <Tooltip arrow placement="top" title="Go Back">
              <IconButton onClick={() => handleBack()}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <p className="font-Josefin font-extrabold text-[42px] text-center mt-5 text-primary">
          Sign In
        </p>
        {!selectedRole && !otpFlag && (
          <div className="mt-5">
            <p className="font-[18px] font-CatamaranBold text-primary ">
              Please select role type ?
            </p>
            {roles &&
              roles.map((item) => (
                <div
                  className="bg-primary h-[50px] flex justify-center items-center rounded-xl cursor-pointer hover:border-2 border-secondary mt-5"
                  key={item.id}
                  onClick={() => setSelectedRole(item.type)}
                >
                  <p className="font-Josefin text-white text-[18px]">
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
            num={userNum}
            email={userEmail}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
