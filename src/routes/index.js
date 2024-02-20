import React from "react";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "pages/ErrorBoundary";
import RoutesMain from "./route";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <ErrorBoundary>
          <RoutesMain />
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
