import React, { useState } from "react";
import "./SideBar.css";
import {
  AddBox,
  AddToPhotos,
  ArrowForwardIos,
  Category,
  FormatListBulleted,
  Home,
  IndeterminateCheckBox,
  Info,
  LibraryAdd,
  LocalMall,
  LocalOffer,
  Paid,
  Person,
  Security,
  ShoppingCart,
  Store,
} from "@mui/icons-material";

// import { List } from "@mui/material";
function SideBar({ activePage, setActivePage }) {
  const [categoryList, setCategoryList] = useState(false);
  const [cms, setCMS] = useState(false);
  const handleCategory = () => {
    setCategoryList(!categoryList);
  };
  const handleCMS = () => {
    setCMS(!cms);
  };
  return (
    <div className="sidebar">
      <div className="sidebar_admin_logo">
        <p> Admin Pannel</p>
      </div>
      <span
        onClick={() => [setActivePage("DashBoard")]}
        className={activePage === "DashBoard" ? "active_sideBar" : ""}
      >
        <Home className="sidebar_icon" />
        <p>DashBoard</p>
      </span>
      <span
        onClick={() => [setActivePage("Products")]}
        className={activePage === "Products" ? "active_sideBar" : ""}
      >
        <LocalMall className="sidebar_icon" />
        <p>Products</p>
      </span>
      <span
        onClick={() => [setActivePage("Add Product")]}
        className={activePage === "Add Product" ? "active_sideBar" : ""}
      >
        <ShoppingCart className="sidebar_icon" />
        <p>Add Product</p>
      </span>
      <span onClick={handleCategory}>
        <FormatListBulleted className="sidebar_icon" />
        <p
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          Categories{" "}
          <ArrowForwardIos
            style={{ fontSize: "15px", marginLeft: "20px", color: "#111" }}
            className={categoryList ? "rotate-90-cw" : ""}
          />{" "}
        </p>
      </span>
      {categoryList && (
        <div className="categoryList_div" style={{ cursor: "pointer" }}>
          <span
            onClick={() => setActivePage("Categories")}
            className={activePage === "Categories" ? "active_sideBar1" : ""}
          >
            <Category className="sidebar_icon" />
            <p>Categories</p>
          </span>
          <span
            onClick={() => setActivePage("Sub Categories")}
            className={activePage === "Sub Categories" ? "active_sideBar1" : ""}
          >
            <AddBox className="sidebar_icon" />
            <p>Sub Categories</p>
          </span>
          <span
            onClick={() => setActivePage("Inner Categories")}
            className={
              activePage === "Inner Categories" ? "active_sideBar1" : ""
            }
          >
            <LibraryAdd className="sidebar_icon" />

            <p>Inner Categories</p>
          </span>
        </div>
      )}
      <span
        onClick={() => setActivePage("Order")}
        className={activePage === "Order" ? "active_sideBar" : ""}
      >
        <Store className="sidebar_icon" />
        <p>Order</p>
      </span>
      <span
        onClick={() => setActivePage("Users")}
        className={activePage === "Users" ? "active_sideBar" : ""}
      >
        <Person className="sidebar_icon" />
        <p>Users</p>
      </span>
      <span
        onClick={() => setActivePage("Payment")}
        className={activePage === "Payment" ? "active_sideBar" : ""}
      >
        <Paid className="sidebar_icon" />
        <p>Payment</p>
      </span>
      <span
        onClick={() => setActivePage("Coupon")}
        className={activePage === "Coupon" ? "active_sideBar" : ""}
      >
        <Person className="sidebar_icon" />
        <p>Coupon</p>
      </span>
      <span
        onClick={() => setActivePage("Return Order")}
        className={activePage === "Return Order" ? "active_sideBar" : ""}
      >
        <Person className="sidebar_icon" />
        <p>Return Order</p>
      </span>
      <span
        onClick={() => setActivePage("Return Condition")}
        className={activePage === "Return Condition" ? "active_sideBar" : ""}
      >
        <Person className="sidebar_icon" />
        <p>Return Condition</p>
      </span>
      <span
        onClick={() => setActivePage("Help")}
        className={activePage === "Help" ? "active_sideBar" : ""}
      >
        <Person className="sidebar_icon" />
        <p>Help</p>
      </span>
      <span
        onClick={() => setActivePage("Subscribers")}
        className={activePage === "Subscribers" ? "active_sideBar" : ""}
      >
        <Person className="sidebar_icon" />
        <p>Subscribers</p>
      </span>
      <span
        onClick={() => setActivePage("Review Table")}
        className={activePage === "Review Table" ? "active_sideBar" : ""}
      >
        <Person className="sidebar_icon" />
        <p>Review Table</p>
      </span>
      <span
        onClick={() => setActivePage("Website Settings")}
        className={activePage === "Website Settings" ? "active_sideBar" : ""}
      >
        <Person className="sidebar_icon" />
        <p>Website Settings</p>
      </span>
      <span
        onClick={() => setActivePage("Website Analytics")}
        className={activePage === "Website Analytics" ? "active_sideBar" : ""}
      >
        <Person className="sidebar_icon" />
        <p>Website Analytics</p>
      </span>
      <span
        onClick={() => setActivePage("Website Header")}
        className={activePage === "Website Header" ? "active_sideBar" : ""}
      >
        <Person className="sidebar_icon" />
        <p>Website Header</p>
      </span>
      <span
        onClick={() => setActivePage("Shipping Gateway")}
        className={activePage === "Shipping Gateway" ? "active_sideBar" : ""}
      >
        <Person className="sidebar_icon" />
        <p>Shipping Gateway</p>
      </span>

      <span onClick={handleCMS}>
        <Person className="sidebar_icon" />
        <p
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          CMS Pages{" "}
          <ArrowForwardIos
            style={{ fontSize: "15px", marginLeft: "20px", color: "#111" }}
            className={categoryList ? "rotate-90-cw" : ""}
          />
        </p>
      </span>
      {cms && (
        <div className="categoryList_div" style={{ cursor: "pointer" }}>
          <span
            onClick={() => setActivePage("About")}
            className={activePage === "About" ? "active_sideBar1" : ""}
          >
            <Info className="sidebar_icon" />
            <p>About</p>
          </span>
          <span
            onClick={() => setActivePage("Privicy Policy")}
            className={activePage === "Privicy Policy" ? "active_sideBar1" : ""}
          >
            <Security className="sidebar_icon" />
            <p>Privicy Policy</p>
          </span>
          <span
            onClick={() => setActivePage("Return & Refund")}
            className={
              activePage === "Return & Refund" ? "active_sideBar1" : ""
            }
          >
            <Security className="sidebar_icon" />
            <p>Return & Refund</p>
          </span>
          <span
            onClick={() => setActivePage("Terms And Condition")}
            className={
              activePage === "Terms And Condition" ? "active_sideBar1" : ""
            }
          >
            <IndeterminateCheckBox className="sidebar_icon" />
            <p>Terms And Condition</p>
          </span>
          <span
            onClick={() => setActivePage("Banner")}
            className={activePage === "Banner" ? "active_sideBar1" : ""}
          >
            <IndeterminateCheckBox className="sidebar_icon" />
            <p>Banner</p>
          </span>
          <span
            onClick={() => setActivePage("Deal Of Day")}
            className={activePage === "Deal Of Day" ? "active_sideBar1" : ""}
          >
            <LocalOffer className="sidebar_icon" />
            <p>Deal Of Day</p>
          </span>
          <span
            onClick={() => setActivePage("Pop Up")}
            className={activePage === "Pop Up" ? "active_sideBar1" : ""}
          >
            <AddToPhotos className="sidebar_icon" />
            <p>Pop Up</p>
          </span>
        </div>
      )}
    </div>
  );
}

export default SideBar;
