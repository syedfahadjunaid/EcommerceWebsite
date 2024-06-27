import React, { useEffect, useState } from "react";
import "./AdminLogin.css";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { Box, CircularProgress } from "@mui/material";

import swal from "sweetalert";
import Cookies from "js-cookie";
function AdminLogin({ setLogin }) {
  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    bgcolor: "transprent",
    border: "2px solid transprent",
    outline: "0",
    // boxShadow: 24,
    p: 4,
  };
  const [isLoading, setIsLoading] = useState(false);
  // const [open, setOpen] = React.useState(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // const notify1 = () => toast.warning("Login Failed!");
  const resquestHandle = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const sendRequest = await axios
      .post(`${process.env.React_App_Base_Url + "api/admin/login"}`, formData)
      .then((response) => response, setIsLoading(true))
      .catch((error) =>
        swal({
          title: "UnSuccess",
          text: error?.response?.data?.message,
          icon: "warning",
          dangerMode: true,
        })
      )

      .finally(() => setIsLoading(false));

    console.log(sendRequest, "jwsjsw");
    if (sendRequest?.status === 200) {
      swal({
        title: "Success",
        text: sendRequest?.data?.message,
        icon: "success",
        button: true,
      });
    }
    if (sendRequest) {
      Cookies.set("adminLogin", sendRequest?.data?.token, { expires: 7 });
    }
    setLogin(sendRequest?.data?.status === true ? true : false);
    sessionStorage.setItem(
      "adminloginDetails",
      JSON.stringify(sendRequest?.data)
    );

    setLoading(false);
  };
  return (
    <div id="id01" className="adminloginbox">
      <form className="modal-content" method="get" onSubmit={resquestHandle}>
        <div className="container">
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />

          <button type="submit" className="button">
            Login
          </button>
        </div>
      </form>

      {isLoading && (
        <Box sx={style1}>
          <CircularProgress color="success" style={{ zIndex: "1111" }} />
          {console.log("run")}
        </Box>
      )}
    </div>
  );
}

export default AdminLogin;
