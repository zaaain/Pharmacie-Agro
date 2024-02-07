import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";
import "./App.css";
import AppRouter from "./routes/index";
import { persistor, store } from "./redux/store";

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
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider maxSnack={3} iconVariant={snackIcons}>
            <AppRouter />
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
