import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/feathericon.min.css";
import "./assets/css/select2.min.css";
import "./assets/plugins/morris/morris.css";
import "./assets/plugins/datatables/datatables.min.css";
import "./assets/css/style.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <App />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </Provider>
  </React.StrictMode>
);
