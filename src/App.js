import React from "react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import "./App.css";
import AppRouter from "./routes/index";
import { store } from "./redux/store";

const snackIcons = {
  success: "😄 😎 ",
  error: "😠",
  warning: "⚠️",
  info: "ℹ️",
};

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <SnackbarProvider maxSnack={3} iconVariant={snackIcons}>
          <AppRouter />
        </SnackbarProvider>
      </Provider>
    </div>
  );
};

export default App;
