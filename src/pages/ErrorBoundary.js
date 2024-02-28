import React, { useState } from "react";
import { Button } from "components/common/base/button";
import { useNavigate } from "react-router-dom";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate("/"); // Navigate to the home page
  };

  const handleOnError = (error, errorInfo) => {
  
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="w-full h-screen bg-gradient flex items-center justify-center">
        <div className="w-[400px] h-[400px]  bg-white rounded-[100%] flex flex-col items-center justify-center">
          <h1 className="text-primary font-Roboto text-[24px]">
            Something went wrong.
          </h1>
          <Button
            width={150}
            height={50}
            value="Home"
            variant="primary"
            onClick={handleNavigateToHome}
          />
        </div>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
