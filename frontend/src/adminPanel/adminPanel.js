import React, { useState } from "react";
import "./AdminPanel.css";
import SideBar from "./SideBar/SideBar";
import DashBoard from "./DashBoard/DashBoard";
import Products from "./Products/Products";
import AddProduct from "./Add Product/AddProduct";
import AddCategories from "./Addcategories/AddCategories";
import Order from "./Order/Order";
import User from "./User/User";
import AdminNavBar from "./AdminNavBar/AdminNavBar";
import AdminProfilePage from "./AdminProfilePage/AdminProfilePage";
import ReturnOrder from "./Return Order/ReturnOrder";
import ReturnCondition from "./Return Condition/ReturnCondition";
import Help from "./Help/Help";
import Suscribers from "./Suscribers/Suscribers";
import AboutAdmin from "./AboutAdmin/AboutAdmin";
import PrivicyPolicyAdmin from "./Privicy Policy Admin/PrivicyPolicyAdmin";
import TermandConditionAdmin from "./Term and Condition Admin/TermandConditionAdmin";
import Payment from "./payment/payment";
import SubCategories from "./Sub Categories/SubCategories";
import InnerCategorie from "./Inner Categorie/InnerCategorie";
import AddBanner from "./AddBanner/AddBanner";
import DealOfDay from "./DealOfDayAdmin/DealOfDay";
import AdminReview from "./AdminReview/AdminReview";
import PopUpAdmin from "./PopUpAdmin/PopUpAdmin";
import AdminCoupan from "./Admin Coupan/AdminCoupan";
import AdminWebSiteSetting from "./AdminWebSiteSetting/AdminWebSiteSetting";
import AdminRefundPage from "./AdminRefundPage/AdminRefundPage";
import AdminWebsiteAnalytics from "./Admin Website Analytics/AdminWebsiteAnalytics";
import AdminWebsiteHeader from "./Admin Website Header/AdminWebsiteHeader";
import AdminShippingGateway from "./AdminShippingGateway/AdminShippingGateway";
function AdminPanel({ setLogin }) {
  const [activePage, setActivePage] = useState("DashBoard");

  return (
    <div className="admin">
      <div className="admin_left">
        <SideBar setActivePage={setActivePage} activePage={activePage} />
      </div>
      <div className="admin_right">
        <AdminNavBar setLogin={setLogin} setActivePage={setActivePage} />
        {activePage === "DashBoard" && <DashBoard />}
        {activePage === "Products" && (
          <Products setActivePage={setActivePage} />
        )}
        {activePage === "Add Product" && <AddProduct />}
        {activePage === "Categories" && <AddCategories />}
        {activePage === "Order" && <Order />}
        {activePage === "Users" && <User />}
        {activePage === "Return Order" && <ReturnOrder />}
        {activePage === "Return Condition" && <ReturnCondition />}
        {activePage === "My Profile" && <AdminProfilePage />}
        {activePage === "Help" && <Help />}
        {activePage === "Subscribers" && <Suscribers />}
        {activePage === "About" && <AboutAdmin />}
        {activePage === "Privicy Policy" && <PrivicyPolicyAdmin />}
        {activePage === "Terms And Condition" && <TermandConditionAdmin />}
        {activePage === "Payment" && <Payment />}
        {activePage === "Sub Categories" && <SubCategories />}
        {activePage === "Inner Categories" && <InnerCategorie />}
        {activePage === "Banner" && <AddBanner />}
        {activePage === "Deal Of Day" && <DealOfDay />}
        {activePage === "Review Table" && <AdminReview />}
        {activePage === "Pop Up" && <PopUpAdmin />}
        {activePage === "Coupon" && <AdminCoupan />}
        {activePage === "Website Settings" && <AdminWebSiteSetting />}
        {activePage === "Return & Refund" && <AdminRefundPage />}
        {activePage === "Website Analytics" && <AdminWebsiteAnalytics />}
        {activePage === "Website Header" && <AdminWebsiteHeader />}
        {activePage === "Shipping Gateway" && <AdminShippingGateway />}
      </div>
    </div>
  );
}

export default AdminPanel;
