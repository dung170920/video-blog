import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const ToastMsg = () => {
  return <ToastContainer pauseOnHover position="top-right" autoClose={5000} />;
};

export default ToastMsg;
