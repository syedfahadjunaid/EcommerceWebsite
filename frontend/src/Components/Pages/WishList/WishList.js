import React, { useState } from "react";
import "./WishList.css";
import SubNavBar from "../../NavBar/SubNavBar/SubNavBar";
import MainNavBar from "../../NavBar/MainNavBar/MainNavBar";
import img from "../../../Images/1.jpg";
import { Delete, Star } from "@mui/icons-material";
import { Box, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { removeWishList } from "../../../Slice/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { wishListData } from "../../../Slice/wishListSlice";
import Cookies from "js-cookie";
function WishList() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #fff",
    outline: "0",
    boxShadow: 24,
    p: 4,
  };
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userId = Cookies.get("userId");
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Something Went Wrong");
  const [wishListId, setWishListId] = useState();
  const [isLoading, setIsLoading] = useState();
  const { userLogin } = useSelector((state) => state.user);

  const { wishList } = useSelector((state) => state.userWishlist);
  const removeWishlistProductHandle = async () => {
    const { data } = await axios
      .post(
        `${
          process.env.React_App_Base_Url + "api/remove-wishlish/" + wishListId
        }`,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      )
      .then((response) => response, setIsLoading(true), handleClose())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    if (data) {
      notify();
      dispatch(wishListData(userId));
    }
    if (!data) {
      notify1();
    }
    console.log(data);
  };
  if (!userLogin) {
    return (
      <div>
        <p>You Need To Login First</p>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <SubNavBar />
      <MainNavBar />
      <div className="wishlist_headline">
        <p>My WishList</p>
      </div>
      <div className="wishlist_cards">
        {wishList?.product?.map((item) => (
          <div className="wishlist_cards_card">
            <div className="wishlist_cards_card_img">
              <img src={item.image ? item?.image : img} alt="img" />
            </div>
            <div className="wishlist_cards_card_details">
              <div className="wishlist_cards_card_details_left">
                <p>
                  {item.title
                    ? item?.title
                    : "SAMSUNG Galaxy F13 (Waterfall Blue, 64 GB) (4 GB RAM)"}
                </p>
                <div>
                  <span>
                    4.5
                    <Star style={{ fontSize: "15px", marginLeft: "2px" }} />
                  </span>
                  <p>{item.price ? item?.price : "(18,000)"} </p>
                </div>
              </div>
              <div className="wishlist_cards_card_details_right">
                <Delete
                  style={{ color: "#6E798C", cursor: "pointer" }}
                  onClick={() => handleOpen(setWishListId(item?.id))}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are You Sure ?
          </Typography>
          <span className="wishlist_modal">
            <button onClick={handleClose}>No</button>
            <button onClick={removeWishlistProductHandle}>Yes</button>
          </span>
        </Box>
      </Modal>
    </div>
  );
}

export default WishList;
