import React, { useCallback, useEffect, useState } from "react";
import "./ProductCard.css";
import img from "../../Images/clothes-2 1.jpg";
import { Favorite, FavoriteBorder, Star, StarHalf } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { cartDataHandle } from "../../Slice/cartSlice";
import { useNavigate } from "react-router-dom";
import { openLoginForm } from "../../Slice/authSlice";
import axios from "axios";
import { wishListData } from "../../Slice/wishListSlice";
import { toast } from "react-toastify";
import { Box, CircularProgress } from "@mui/material";

function ProductCard({
  title,
  price,
  image,
  quantity,
  id,
  item,
  sort_desc,
  mrp,
}) {
  // const items=useSelector((state)=>state.allCart)
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Something Went Wrong");
  const dispatch = useDispatch();
  const [isProduct, setIsProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isWishlist, setIsWishlist] = useState();
  const [wishlistId, setWishlistId] = useState();

  const { userLogin, userId } = useSelector((state) => state?.user);
  const { wishList } = useSelector((state) => state?.userWishlist);
  const { cart } = useSelector((state) => state?.cart);
  const categoryFilterHandle = async (value) => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/" + value}`, {
        headers: { "Content-type": "multipart/form-date" },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    console.log(data);
  };

  const history = useNavigate();
  const [addWishlist, setAddWishlist] = useState(true);
  const addToWishListHandle = async () => {
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("user_id", userId);
    const { data } = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/create-product-wishlist"}`,
        formData,
        {
          headers: { "Content-type": "multipart/form-date" },
        }
      )
      .then((response) => response, setIsWishlistLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsWishlistLoading(false));
    if (data) {
      notify();
      dispatch(wishListData(userId));
    }
    if (!data) {
      notify1();
    }

    console.log(data);
  };
  const RemoveFromWishListHandle = async (id) => {
    const { data } = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/remove-wishlish/" + id}`,

        {
          headers: { "Content-type": "multipart/form-date" },
        }
      )
      .then((response) => response, setIsWishlistLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsWishlistLoading(false));
    if (data) {
      notify();
      dispatch(wishListData(userId));
    }
    if (!data) {
      notify1();
    }
    console.log(data);
  };

  const checkAvaliablityOfProductinWishListHandle = useCallback(
    (id) => {
      const check = wishList?.product?.find((item) => item?.product_id === id);

      setWishlistId(check ? check?.id : "");
      setIsWishlist(check ? true : false);
    },
    [id, wishList]
  );
  const addToCardHandle = async () => {
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("product_id", id);
    formData.append("count", 1);

    const { data } = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/product-cart-create"}`,
        formData,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      )
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    if (data) {
      notify();
      dispatch(cartDataHandle(userId));
    }
    if (!data) {
      notify1();
    }

    console.log(data);
  };
  const isProductAvaliableInCartHandle = () => {
    const filter = cart?.data?.find((item) => item?.product_id == id);

    setIsProduct(filter ? true : false);
  };
  useEffect(() => {
    isProductAvaliableInCartHandle();
  }, [id, cart]);
  useEffect(() => {
    checkAvaliablityOfProductinWishListHandle(id);
  }, [id, wishList]);

  return (
    <div className="productcard">
      <div className="productcard_img">
        {userLogin ? (
          !isWishlistLoading ? (
            <span>
              {!isWishlist ? (
                <FavoriteBorder onClick={addToWishListHandle} />
              ) : (
                <Favorite
                  style={{ color: "tomato" }}
                  onClick={() => RemoveFromWishListHandle(wishlistId)}
                />
              )}
            </span>
          ) : (
            <span>
              <Box className="wishlist_loader">
                <CircularProgress className="wishlist_loader_circular" />
              </Box>
            </span>
          )
        ) : (
          <span>
            <FavoriteBorder onClick={() => dispatch(openLoginForm())} />
          </span>
        )}

        <img
          src={image ? image : img}
          alt="product_img"
          loading="lazy"
          onClick={() => history(`/singleProduct/${id}`)}
        />
      </div>
      <div
        className="productcard_details"
        onClick={() => history(`/singleProduct/${id}`)}
      >
        <div className="productcard_details_productName">
          <p>{title ? title : "Clothes"}</p>
        </div>
        <div className="productcard_details_description">
          <p>{sort_desc ? sort_desc : "Girls pnk Embro design Top"}</p>
        </div>
        <div className="productcard_details_price">
          <strong>{price ? "₹" + price : "₹200"}</strong>
          <s>{mrp}</s>
        </div>
      </div>
      <div className="productcard_button">
        {/* <Button color="#2874F0" width='200px'>Add To Cart</Button> */}
        {userLogin ? (
          !isLoading ? (
            isProduct ? (
              <button
                className="productcard_button_button"
                onClick={() => history("/cart")}
              >
                Go To Cart
              </button>
            ) : (
              <button
                className="productcard_button_button"
                onClick={() => [addToCardHandle()]}
              >
                Add To Cart
              </button>
            )
          ) : (
            <button className="productcard_button_button" disabled>
              Adding...
            </button>
          )
        ) : (
          <button
            className="productcard_button_button"
            onClick={() => dispatch(openLoginForm())}
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
