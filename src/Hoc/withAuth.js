import React, { useEffect } from 'react';
import useLogout from "hooks/useLogout";
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const logout = useLogout()
    const {role} = useSelector((state) => state.auth)

    useEffect(() => {
      const isVerufy = localStorage.getItem('jwt') && role === "seller";

      if (!isVerufy) {
        logout()
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
