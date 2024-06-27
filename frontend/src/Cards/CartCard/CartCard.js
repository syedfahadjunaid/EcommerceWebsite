import React, { useEffect, useState } from "react";
import "./CartCard.css";
import img from "../../Images/1.jpg";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  cartDataHandle,
  decreaseItemQuantity,
  getCartTotal,
  increaseItemQuantity,
  removeItem,
} from "../../Slice/cartSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { discountPercentage } from "../../discountPercentangeCalculator";
import { json } from "react-router-dom";
function CartCard({ image, title, price, quantity, id, mrp }) {
  const userId = Cookies.get("userId");
  const [discount, setDiscount] = useState();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [productQuantity, setProductQuantity] = useState(quantity);
  const increaseItemQuantityHandle = async () => {
    const formData = new FormData();
    formData.append("count", productQuantity);
    const { data } = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/product-cart-update/" + id}`,
        formData,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      )
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    if (data) {
      dispatch(cartDataHandle(userId));
    }

    console.log(data);
  };
  const removeItemFromCartHandle = async () => {
    const { data } = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/product-cart-remove/" + id}`,

        {
          headers: { "Content-type": "multipart/form-date" },
        }
      )
      .then((response) => response, setIsRemoving(true))
      .catch((error) => console.log(error))
      .finally(() => setIsRemoving(false));
    if (data) {
      dispatch(cartDataHandle(userId));
    }

    console.log(data);
  };
  useEffect(() => {
    const data = discountPercentage(mrp, price);
    setDiscount(data && data);
  }, [price, mrp]);
  useEffect(() => {
    increaseItemQuantityHandle();
  }, [productQuantity]);
  console.log(JSON.parse(image)[0], "image", typeof image);
  return (
    <div className="cartcard">
      <div className="cartcard_left">
        <img
          src={
            image
              ? `${
                  process.env.React_App_Base_Url +
                  "storage/product/" +
                  JSON.parse(image)[0]
                }`
              : img
          }
          alt="img"
          loading="lazy"
        />
        <div className="cartcard_left_quantity">
          <span
            className="cartcard_left_quantity_icon"
            onClick={() =>
              setProductQuantity(
                productQuantity === 1 ? 1 : productQuantity - 1
              )
            }
          >
            <Remove style={{ fontSize: "25px", color: "#2874F0" }} />
          </span>
          <span className="cartcard_left_quantity_number">
            {productQuantity ? productQuantity : "1"}
          </span>
          <span
            className="cartcard_left_quantity_icon"
            onClick={() => setProductQuantity(productQuantity + 1)}
          >
            <Add style={{ fontSize: "25px", color: "#2874F0" }} />
          </span>
        </div>
      </div>
      <div className="cartcard_right">
        <div className="cartcard_right_heading">
          <h6>
            {" "}
            {title
              ? title
              : "SAMSUNG Galaxy S21 FE 5G (Lavender, 128 GB) (8 GB RAM)"}
          </h6>
        </div>
        <div className="cartcard_right_seller">
          <p>Seller:LimeStone</p>
        </div>
        <div className="cartcard_right_price">
          <s>₹{mrp}</s>
          <strong>{price ? price : "₹271"} </strong>
          <p>{discount}% Off</p>
        </div>
        <div className="cartcard_right_savelater">
          {!isRemoving ? (
            <p onClick={removeItemFromCartHandle}>REMOVE</p>
          ) : (
            <p>Removing...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartCard;
