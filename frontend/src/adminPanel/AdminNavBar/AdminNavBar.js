import React from "react";
import "./AdminNavBar.css";
import profilepic from "../../Images/Ellipse 15.jpg";

import swal from "sweetalert";
import Cookies from "js-cookie";
function AdminNavBar({ setActivePage, setLogin }) {
  const adminLogoutHandle = async () => {
    // const response = await axios.get("http://localhost:8000/api/admin/logout");
    // console.log(response);

    sessionStorage.removeItem("adminloginDetails");
    Cookies.remove('adminLogin')
    setLogin(false);
    swal({
      title: "Success",
      text: "Logout Success",
      icon: "success",
      button: true,
    });
  };
  return (
    <div className="adminnavbar">
      <span>
        <input type="text" placeholder="Search" />
      </span>

      <div className="adminnavbar_div">
        <img src={profilepic} alt="profile " />
        <span className="adminnavbar_login">
          <p onClick={() => setActivePage("My Profile")}>My Profile</p>
          <p onClick={adminLogoutHandle}>Logout</p>
        </span>
      </div>
    </div>
  );
}

export default AdminNavBar;
