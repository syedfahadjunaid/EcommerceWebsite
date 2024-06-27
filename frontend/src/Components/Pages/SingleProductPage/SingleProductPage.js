import React, { useEffect, useRef, useState } from "react";
import "./SingleProductPage.css";
import AddressNavBar from "../../NavBar/AddressNavBar/AddressNavBar";
import img from "../../../Images/1.jpg";
import img1 from "../../../Images/2.jpg";
import img2 from "../../../Images/3.jpg";
import img3 from "../../../Images/4.jpg";
import img4 from "../../../Images/image 18.jpg";
import ReactImageMagnify from "react-image-magnify";
import { Favorite, FavoriteBorderOutlined, Star } from "@mui/icons-material";
import RatingCard from "../../../Cards/Rating Card/RatingCard";
import ProductCard from "../../../Cards/ProductCard/ProductCard";
import SubNavBar from "../../NavBar/SubNavBar/SubNavBar";
import MainNavBar from "../../NavBar/MainNavBar/MainNavBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCard, cartDataHandle } from "../../../Slice/cartSlice";
import {
  Box,
  ButtonBase,
  CircularProgress,
  Modal,
  Rating,
  Typography,
} from "@mui/material";
import { addToWishList } from "../../../Slice/cartSlice";
import { openLoginForm } from "../../../Slice/authSlice";
import Cookies from "js-cookie";
import HTMLReactParser from "html-react-parser";
import { discountPercentage } from "../../../discountPercentangeCalculator";
import { wishListData } from "../../../Slice/wishListSlice";
import { toast } from "react-toastify";

const images = [img, img1, img2, img3];
function SingleProductPage() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid transparent",
    boxShadow: 24,
    p: 4,
    outline: "transparent",
    borderRadius: "5px",
  };
  const userId = Cookies.get("userId");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(4);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [productImage, setProductImage] = useState([]);
  const [discountInPercentage, setDiscountInPercentage] = useState(0);

  const [img, setImg] = useState();
  const hoverHandler = (image, i) => {
    setImg(image);
    refs.current[i].classList.add("active");
    for (var j = 0; j < images.length; j++) {
      if (i !== j) {
        refs.current[j].classList.remove("active");
      }
    }
  };

  const refs = useRef([]);
  refs.current = [];
  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };
  const { ID } = useParams();

  const [favorite, setFavorite] = useState(true);
  const favoriteHandle = () => {
    setFavorite(false);
    dispatch(addToWishList(productData));
  };

  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Something Went Wrong");
  const [reviewMessage, setReviewMessage] = useState();
  const [allReview, setAllReview] = useState();
  const [isProduct, setIsProduct] = useState(false);
  const { LoginForm, userLogin } = useSelector((state) => state.user);
  const { wishList } = useSelector((state) => state?.userWishlist);
  const { cart } = useSelector((state) => state?.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [productData, setProductData] = useState();
  const [isWishlist, setIsWishlist] = useState();
  const [wishlistId, setWishlistId] = useState();
  const [activs_Image, setActivs_Image] = useState();
  const history = useNavigate();
  const getSingleProductHandle = async (id) => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/get-one-product/" + id}`, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setProductData(data && data?.Product);
    setProductImage(data && data?.Product?.image);
    setImg(data && data?.Product?.image?.image[0]);
    console.log(data);
  };
  const addWishlistHandle = async () => {
    const formData = new FormData();
    formData.append("product_id", Number(ID));
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
  const checkAvaliablityOfProductinWishListHandle = (id) => {
    const check = wishList?.product?.find(
      (item) => item?.product_id === Number(ID)
    );

    setWishlistId(check ? check?.id : "");
    setIsWishlist(check ? true : false);
    console.log(check);
  };
  const addReviewHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_id", ID);
    formData.append("category_id", productData?.category_id?.id);
    formData.append("product_review", reviewMessage);
    formData.append("rating", value);
    formData.append("user_id", userId);
    const { data } = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/Productreview-create"}`,
        formData,
        {
          headers: { "Content-type": "multipart/form-date" },
        }
      )
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    if (data) {
      notify();
      handleClose();
    }
    if (!data) {
      notify1();
    }

    console.log(data);
  };
  const checkAvaliablityOfProductInCartHandle = () => {
    const filter = cart?.data?.find((item) => item?.product_id == ID);
    console.log(filter, "filter");
    setIsProduct(filter ? true : false);
  };
  const addToCartHandle = async () => {
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("product_id", ID);
    formData.append("count", 1);
    const { data } = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/product-cart-create"}`,
        formData,
        {
          headers: { "Content-type": "multipart/form-date" },
        }
      )
      .then((response) => response, setIsLoading(true), handleClose())
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
  const getproductReviewHandle = async () => {
    const { data } = await axios
      .get(
        `${
          process.env.React_App_Base_Url + "api/Productreview-all-banner/" + ID
        }`,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      )
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setAllReview(data && data?.data);
    console.log(data, "data");
  };
  useEffect(() => {
    checkAvaliablityOfProductInCartHandle();
  }, [ID, cart]);

  useEffect(() => {
    checkAvaliablityOfProductinWishListHandle(ID);
  }, [ID, wishList]);
  useEffect(() => {
    getSingleProductHandle(ID);
    getproductReviewHandle(ID);
  }, [ID]);
  useEffect(() => {
    const data = discountPercentage(productData?.mrp, productData?.price);
    setDiscountInPercentage(data && data);
  }, [productData]);
  useEffect(() => {
    console.log(img, typeof img);
  }, [img]);
  return (
    <div className="singleproductpage">
      <SubNavBar />
      <MainNavBar />
      <AddressNavBar />
      <div className="singleproductpage_top">
        <div className="singleproductpage_top_left">
          <div className="singlePage_product_left_small_imgs">
            <div className="singlePage_product_left_small_imgs_img">
              <div className="singlePage_product_left_small_imgs_img_side">
                {productImage?.image?.map((image, i) => (
                  <img
                    src={image}
                    alt="sdsdf"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    className={img === image && "activs_image"}
                    onClick={(e) => [setImg(e.target.src)]}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="singlePage_product_left_big_img">
            {/* <img src={med1} /> */}
            <div className="singlePage_product_left_big_img_icon">
              {userLogin ? (
                !isWishlistLoading ? (
                  <ButtonBase>
                    {!isWishlist ? (
                      <FavoriteBorderOutlined
                        onClick={() => [favoriteHandle(), addWishlistHandle()]}
                      />
                    ) : (
                      <Favorite
                        className="mywishListAdd"
                        onClick={() => RemoveFromWishListHandle(wishlistId)}
                      />
                    )}
                  </ButtonBase>
                ) : (
                  <Box className="wishlist_loader">
                    <CircularProgress className="wishlist_loader_circular" />
                  </Box>
                )
              ) : (
                <ButtonBase>
                  <FavoriteBorderOutlined
                    onClick={() => dispatch(openLoginForm())}
                  />
                </ButtonBase>
              )}
            </div>
            <div className="singlePage_product_left_big_img_icon_div">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: img,
                  },
                  largeImage: {
                    src: img,
                    width: 1200,
                    height: 1800,
                  },
                  enlargedImageContainerDimensions: {
                    width: "125%",
                    height: "100%",
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="singleproductpage_top_right">
          <div className="singleproductpage_top_right_title">
            <p>{productData ? productData?.title : ""}</p>
          </div>
          <div className="singleproductpage_top_right_price">
            <strong>₹{productData?.price}</strong>
            <s>₹{productData?.mrp}</s>
            <p>{discountInPercentage ? discountInPercentage : ""}% Off</p>
          </div>
          <div className="singleproductpage_top_right_reviews">
            <span>
              <Star style={{ fontSize: "16px", color: "#FFE600" }} />
              <p>4.5</p>
            </span>
            <p>1,78,203 Ratings  </p>
            <p>& </p>
            <p> 13,975 Reviews </p>
          </div>
          <div className="singleproductpage_top_right_brand">
            <img src={img4} />
            <p>
              1 Year Manufacturer Warranty for Device and 6 Months Manufacturer
              Warranty for In-Box Accessories KNOW MORE..
            </p>
          </div>
          <div className="singleproductpage_top_right_highlight">
            <div className="singleproductpage_top_right_highlight_left">
              <p>Highlights</p>
            </div>
            <div className="singleproductpage_top_right_highlight_right">
              <span>
                <ul>
                  <li>8 GB RAM | 128 GB ROM</li>
                  <li>16.26 cm (6.4 inch) Full HD+ Display</li>
                  <li>12MP + 12MP + 8MP (OIS) | 32MP Front Camera</li>
                  <li>4500 mAh Lithium-ion Battery</li>
                </ul>
              </span>
            </div>
          </div>
          <div className="singleproductpage_top_right_sellers">
            <div className="singleproductpage_top_right_sellers_left">
              <h6>Seller</h6>
            </div>
            <div className="singleproductpage_top_right_sellers_right">
              <div>
                <p>MYTHANGLORYRetail</p>
                <span>
                  <Star style={{ fontSize: "16px", color: "#FFE600" }} />
                  <p>4.5</p>
                </span>
              </div>

              <ul>
                <li>7 Days Replacement Policy</li>
                <li>GST invoice available</li>
              </ul>
            </div>
          </div>
          <div className="singleproductpage_top_right_delivery">
            <div className="singleproductpage_top_right_delivery_left">
              <p>Delivery</p>
            </div>
            <div className="singleproductpage_top_right_delivery_right">
              <input type="text " placeholder="Enter Delivery Pincode " />
              <p>Check</p>
            </div>
          </div>
        </div>
      </div>
      <div className="singleproductpage_button">
        {userLogin ? (
          isProduct ? (
            <button onClick={() => history("/cart")}>Go To Cart</button>
          ) : (
            <button onClick={() => addToCartHandle()}>Add To Cart</button>
          )
        ) : (
          <button onClick={() => dispatch(openLoginForm())}>Add To Cart</button>
        )}
        {userLogin ? (
          <button>Buy Now</button>
        ) : (
          <button onClick={() => dispatch(openLoginForm())}>Buy Now</button>
        )}
      </div>
      <div className="singleproductpage_description">
        <div className="singleproductpage_description_heading">
          <h6>Description </h6>
        </div>
        <div className="singleproductpage_description_details">
          {HTMLReactParser ? productData?.long_desc : ""}
        </div>
      </div>
      <div className="singleproductpage_specifiction">
        {HTMLReactParser ? productData?.specification : ""}
        {/* <div className="singleproductpage_specifiction_one">
          <div className="singleproductpage_specifiction_one_left">
            <h6>Exemplary Camera</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              hendrerit tristique pretium gravida felis, sociis in felis. Diam
              habitant natoque libero, sit et duis eleifend. Lorem at Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit
              tristique pretium gravida felis, sociis in felis. Diam habitant
              natoque libero, sit et duis eleifend. Lorem at{" "}
            </p>
          </div>
          <div className="singleproductpage_specifiction_one_right">
            <img src={img5} alt="img" loading="lazy" />
          </div>
        </div>
        <div className="singleproductpage_specifiction_two">
          <div className="singleproductpage_specifiction_two_left">
            <img src={img5} alt="img" loading="lazy" />
          </div>
          <div className="singleproductpage_specifiction_two_right">
            <h6>Incredible Front Camera</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              hendrerit tristique pretium gravida felis, sociis in felis. Diam
              habitant natoque libero, sit et duis eleifend. Lorem at Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit
              tristique pretium gravida felis, sociis in felis. Diam habitant
              natoque libero, sit et duis eleifend. Lorem at{" "}
            </p>
            <p></p>
          </div>
        </div>
        <div className="singleproductpage_specifiction_one">
          <div className="singleproductpage_specifiction_one_left">
            <h6>Unmatched Vlogging</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              hendrerit tristique pretium gravida felis, sociis in felis. Diam
              habitant natoque libero, sit et duis eleifend. Lorem at Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit
              tristique pretium gravida felis, sociis in felis. Diam habitant
              natoque libero, sit et duis eleifend. Lorem at{" "}
            </p>
          </div>
          <div className="singleproductpage_specifiction_one_right">
            <img src={img5} alt="img" loading="lazy" />
          </div>
        </div>
        <div className="singleproductpage_specifiction_two">
          <div className="singleproductpage_specifiction_two_left">
            <img src={img5} alt="img" loading="lazy" />
          </div>
          <div className="singleproductpage_specifiction_two_right">
            <h6>Stupendous Night Mode</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              hendrerit tristique pretium gravida felis, sociis in felis. Diam
              habitant natoque libero, sit et duis eleifend. Lorem at Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit
              tristique pretium gravida felis, sociis in felis. Diam habitant
              natoque libero, sit et duis eleifend. Lorem at{" "}
            </p>
            <p></p>
          </div>
        </div>
        <div className="singleproductpage_specifiction_one">
          <div className="singleproductpage_specifiction_one_left">
            <h6>Brilliant 30x Space Zoom</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              hendrerit tristique pretium gravida felis, sociis in felis. Diam
              habitant natoque libero, sit et duis eleifend. Lorem at Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit
              tristique pretium gravida felis, sociis in felis. Diam habitant
              natoque libero, sit et duis eleifend. Lorem at{" "}
            </p>
          </div>
          <div className="singleproductpage_specifiction_one_right">
            <img src={img5} alt="img" loading="lazy" />
          </div>
        </div> */}
      </div>
      <div className="singleproductpage_reviews">
        <div
          className="singleproductpage_reviews_heading"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p>Rating and Review</p>
          <button onClick={handleOpen}>Add Review</button>
        </div>
        <div className="singleproductpage_reviews_cards">
          {allReview?.map((item) => (
            <RatingCard
              product_review={item?.product_review}
              rating={item?.rating}
            />
          ))}
        </div>
      </div>
      <div className="singleproductpage_similarProduct">
        <div className="singleproductpage_similarProduct_heading">
          <p>Similar products</p>
        </div>
        <div className="singleproductpage_similarProduct_products">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      <div className="singleproductpage_recentproduct">
        <div className="singleproductpage_recentproduct_heading">
          <p>Recently Viewed</p>
        </div>
        <div className="singleproductpage_recentproduct_products">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="modal_form" onSubmit={addReviewHandle}>
            <Typography id="modal-modal-description">Rate Product</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Title
            </Typography>
            <span className="form_span">
              <input type="text" placeholder="Title" />
            </span> */}

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Message
            </Typography>
            <span className="form_span">
              <textarea
                rows={5}
                placeholder="Your Message"
                onChange={(e) => setReviewMessage(e.target.value)}
                required
              />
            </span>
            {!isLoading ? (
              <button>Submit</button>
            ) : (
              <button>Submiting...</button>
            )}
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default SingleProductPage;
