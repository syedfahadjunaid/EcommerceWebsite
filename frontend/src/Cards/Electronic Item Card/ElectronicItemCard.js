import React, { useState } from "react";
import "./ElectronicItemCard.css";
import {
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
  Star,
} from "@mui/icons-material";
import img from "../../Images/image 17.jpg";
import { useNavigate } from "react-router-dom";
import { ButtonBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList,removeWishList } from "../../Slice/cartSlice";
function ElectronicItemCard({ title, image, price, item, id, mrp }) {
    const productData={
        id:id,
        title:title,
        image:image,
        price:price,
        mrp:mrp
    }
  const history = useNavigate();
  const [addWishList, setAddWishList] = useState(true);
  const {wishlist}=useSelector((state)=>state.allCart.wishlist)
  const dispatch=useDispatch()
  const addToWishListHandle=()=>{
    setAddWishList(false)
    dispatch(addToWishList(productData))
  }
  const RemoveFromWishListHandle=()=>{
    setAddWishList(true)
    dispatch(removeWishList(productData?.id))
  }
  return (
    <div className="electronicItemcard">
      <div className="electronicItemcard_first">
        <div className="electronicItemcard_first_favroits">
          {addWishList ? (
            <ButtonBase >
              <FavoriteBorder onClick={addToWishListHandle} />
            </ButtonBase>
          ) : (
            <ButtonBase>
              <Favorite style={{ color: "tomato" }} onClick={RemoveFromWishListHandle}/>
            </ButtonBase>
          )}
        </div>
        <img
          src={image ? image : img}
          alt="product img"
          loading="lazy"
          onClick={() => history(`/singleProduct/${id}`)}
        />
      </div>
      <div
        className="electronicItemcard_second"
        onClick={() => history(`/singleProduct/${id}`)}
      >
        <h6>
          {title ? title : " SAMSUNG Galaxy F23 5G (Forest Green, 128 GB)"}
        </h6>
        <div>
          <span>
            <Star
              className="electronicItemcard_second_icon"
              style={{ color: "#FFE600" }}
            />
            <p>4.5</p>
          </span>
          <p>1,78,203 Ratings & </p>
          <p> 13,975 Reviews</p>
        </div>
        <ul>
          <li>Intel Core i5 Processor (12th Gen)</li>
          <li>16 GB DDR4 RAM</li>
          <li>64 bit Windows 11 Operating System</li>
          <li>512 GB SSD</li>
          <li>2 Year Carry-In Warranty Term</li>
        </ul>
      </div>
      <div
        className="electronicItemcard_third"
        onClick={() => history(`/singleProduct/${id}`)}
      >
        <strong>₹{price ? price : "35,000"}</strong>
        <span>
          {" "}
          <s>₹{mrp ? mrp : "40,000"}</s> <p>12%OFF</p>
        </span>

        <p>Free delivery</p>
        <p>Easy & Free Return</p>
      </div>
    </div>
  );
}

export default ElectronicItemCard;
