import React, { useEffect, useState } from "react";
import "./SubTotalCard.css";
import { useSelector } from "react-redux";
import axios from "axios";
function SubTotalCard() {
  const [total, setTotal] = useState();
  const [gstArray, setGstArray] = useState();
  const [totalGst, setTotalGst] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState();
  const { cart } = useSelector((state) => state.cart);
  console.log(cart?.data, "cart");
  const getTotalHandle = () =>
    setTotal(
      cart?.data?.reduce((sum, item) => {
        const price = Number(item?.price);
        const quantity = Number(item?.count);
        sum = price * quantity + sum;
        return sum;
      }, 0)
    );
  const getGstCatculatorHandle = () => {
    const gstTotal = cart?.data?.map((item) => {
      return Math.round((item?.price * item?.gst) / 100) * item?.count;
    });
    setGstArray(gstTotal && gstTotal);
    console.log(gstTotal, "gstTotal");
  };
  const gstHandle = () => {
    const total = gstArray?.reduce((sum, item) => {
      sum = item + sum;
      return sum;
    }, 0);
    setTotalGst(total && total);
    console.log(total, "ggggggg");
  };
  useEffect(() => {
    getTotalHandle();
    getGstCatculatorHandle();
  }, [cart]);
  useEffect(() => {
    gstHandle();
  }, [gstArray]);
  const checkCouponCodeHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("coupan_code", couponCode);
    formData.append("date", Date.now());

    const { data } = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/coupans-varifaction"}`,
        formData,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      )
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));

    console.log(data);
  };
  return (
    <div className="subtotalcard">
      <div className="subtotalcard_heading" style={{ flexDirection: "column" }}>
        <p>Coupon Code </p>
        <span>
          <form onSubmit={checkCouponCodeHandle}>
            <input
              type="text"
              placeholder="Coupon Code"
              onChange={(e) => setCouponCode(e.target.value)}
              required
            />
            <button>Apply</button>
          </form>
        </span>
      </div>
      <div className="subtotalcard_heading">
        <p>Total Items </p>
      </div>
      <div className="subtotalcard_details">
        <span>
          <p>Sub Total</p>
          <strong>₹{total}.00</strong>
        </span>
        <span>
          <p>Tax's</p>
          <strong>₹{totalGst}.00</strong>
        </span>
        <span>
          <p>Shipping</p>
          <strong>₹50.00</strong>
        </span>
        <span>
          <p>Total</p>
          <strong>₹{total + totalGst + 50}.00</strong>
        </span>
      </div>
    </div>
  );
}

export default SubTotalCard;
