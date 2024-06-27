import React, { useState } from "react";
import AdminLogin from "./AdminLogin/AdminLogin";
import AdminPanel from "./adminPanel";
import Cookies from "js-cookie";

function AdminLoginPage() {
  const token=Cookies.get('adminLogin')
  const [login, setLogin] = useState(token?true:false );
  return <div >{login ? <AdminPanel setLogin={setLogin}/> : <AdminLogin setLogin={setLogin}/>}</div>;
}

export default AdminLoginPage;
