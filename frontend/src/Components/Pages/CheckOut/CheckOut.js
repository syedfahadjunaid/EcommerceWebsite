import React, { useEffect } from "react";
import "./CheckOut.css";
import SubTotalCard from "../../../Cards/SubTotalcard/SubTotalCard";
import MainNavBar from "../../NavBar/MainNavBar/MainNavBar";

function CheckOut() {
  
  return (
    <div className="checkout">
      <MainNavBar />
      <div className="checkout_headline">
        <h6>Checkout</h6>
      </div>

      <div className="checkout_top">
        <div className="checkout_left">
          <p>Billing Details</p>
          <form >
            <div className="checkout_left_form_div">
              <p>Full Name</p>
              <input
                type="text"
                placeholder="Your Name"
                className="checkout_left_form_div_input"
              />
            </div>
            <div className="checkout_left_form_div">
              <p>Street Address</p>
              <input
                type="text"
                placeholder="House Number or No Apt"
                className="checkout_left_form_div_input"
              />
            </div>
            <div className="checkout_left_form_div">
              <p>Town/City</p>
              <input
                type="text"
                placeholder="lucknow"
                className="checkout_left_form_div_input"
              />
            </div>
            <div className="checkout_left_form_div">
              <p>State</p>
              <input
                type="text"
                placeholder="Uttar Predesh"
                className="checkout_left_form_div_input"
              />
            </div>
            <div className="checkout_left_form_div">
              <p>Postcode</p>
              <input
                type="text"
                placeholder="231001 "
                className="checkout_left_form_div_input"
              />
            </div>
            <div className="checkout_left_form_div">
              <p>Phone Number</p>
              <input
                type="text"
                placeholder="91 1234567890"
                className="checkout_left_form_div_input"
              />
            </div>

            <div className="checkout_left_form_div">
              <p>Email Address</p>
              <input
                type="text"
                placeholder="test@gmail.com"
                className="checkout_left_form_div_input"
              />
            </div>

            <div className="checkout_left_form_div1">
              <button>Place Order</button>
            </div>
          </form>
        </div>
        <div className="checkout_right">
          <SubTotalCard />
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
