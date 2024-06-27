import React, { useEffect, useRef, useState } from "react";
import "./MainNavBar.css";
import logo from "../../../Images/LOGO.png";
import img from "../../../Images/image 25.jpg";

import {
  AccountCircle,
  Close,
  FavoriteBorder,
  KeyboardArrowDown,
  MailOutline,
  Menu,
  PermIdentity,
  Search,
  ShoppingCartCheckout,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Box, ButtonBase, CircularProgress, Modal } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import logo from '../../../Images/LOGO.png'

import { closeLoginForm, setActiveUser } from "../../../Slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import Cookies from "js-cookie";

function MainNavBar({ loginTrue }) {
  const dispatch = useDispatch();
  const { userToken, userName } = useSelector((state) => state.user);

  const history = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 850,
    bgcolor: "background.paper",
    border: "2px solid #fff",
    outline: 0,
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
  };
  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    bgcolor: "transprent",
    border: "2px solid transprent",
    outline: "0",
    // boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(closeLoginForm());
  };
  const [openSearchTab, setOpenSearchTab] = useState(false);
  const [login, setLogin] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [hamburger, setHamburder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [search, setSearch] = useState("");
  const [searchedResult, setSearchedResult] = useState([]);
  const openRef = useRef();
  // const [userToken, setUserToken] = useState(null);
  const passwordHandle = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  const passwordHandle1 = () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
    } else {
      setConfirmPasswordType("password");
    }
  };

  const openFormSignUp = () => {
    setLogin(false);
    setSignUp(true);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password1 = useRef({});
  password1.current = watch("registerPassword", "");
  const openFormLogin = () => {
    setLogin(true);
    setSignUp(false);
  };
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const response = await axios
      .post(`${process.env.React_App_Base_Url + "api/login"}`, formData)
      .then((response) => response, setIsLoading(true))
      .catch((error) =>
        swal({
          title: "UnSuccess",
          text: error?.response?.data?.message,
          icon: "warning",
          dangerMode: true,
        })
      )
      .finally(() => setIsLoading(false));
    if (response?.status === 200) {
      swal({
        title: "Success",
        text: response?.data?.message,
        icon: "success",
        button: true,
      });
    }
    console.log("userInfo", response);
    Cookies.set("userId", response?.data?.user?.id, { expires: 7 });
    Cookies.set("userToken", response?.data?.token, { expires: 7 });
    Cookies.set("userName", response?.data?.user?.name, { expires: 7 });
    localStorage.setItem("userToken", JSON.stringify(response?.data));
    dispatch(
      setActiveUser({
        userId: response?.data?.user?.id,
        userName: response?.data?.user?.name,
        userEmail: response?.data?.user?.email,
        userToken: response?.data?.token,
      })
    );
    handleClose();
  };
  const onSubmit1 = async (data1) => {
    const formData = new FormData();
    formData.append("email", data1.registerEmail);
    formData.append("name", data1.UserName);
    formData.append("password", data1.registerPassword);
    formData.append("password_confirmation", data1.registerPassword);
    formData.append("mobile", data1.registerMobile);
    const response = await axios
      .post(`${process.env.React_App_Base_Url + "api/register"}`, formData)
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    console.log(response);
  };
  const logoutHandle = async () => {
    // const response=await axios.get('http://localhost:8000/api/logout')
    // console.log(response)
    dispatch(setActiveUser({ userName: "", userEmail: "", userToken: "" }));
    localStorage.removeItem("userToken");
    swal({
      title: "Success",
      text: "Logout Success",
      icon: "success",
      button: true,
    });
  };
  // console.log(watch("example")); // watch input value by passing the name of it
  const { cart } = useSelector((state) => state.cart);
  const { product } = useSelector((state) => state.allProduct);

  const ref = useRef();
  const { websiteData } = useSelector((state) => state?.HomePage);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (hamburger && ref.current && !ref.current.contains(e.target)) {
        setHamburder(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [hamburger]);
  const selectedCategories = () => {
    history("/catergoiespage");
    setHamburder(false);
  };
  const selectedCategories1 = () => {
    history("/discountOffer");
    setHamburder(false);
  };
  useEffect(() => {
    if (loginTrue === true) {
      setOpen(true);
    }
  }, [loginTrue]);
  const { LoginForm } = useSelector((state) => state.user);
  useEffect(() => {
    setOpen(LoginForm ? true : false);
  }, [LoginForm]);
  useEffect(() => {
    let handler = (e) => {
      if (!openRef.current.contains(e.target)) {
        setOpenSearchTab(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  const seacrhResultHandle = async () => {
    const filter = await product?.Product?.filter((item) => {
      if (search !== "") {
        return item?.title?.toLowerCase().includes(search?.toLowerCase());
      }
    });
    setSearchedResult(filter && filter);
    console.log(filter, "filter", search);
  };
  useEffect(() => {
    seacrhResultHandle();
  }, [search]);

  return (
    <>
      <div className="mainnavbar">
        <div className="mainnavbar_logo">
          <span className="mainnavbar_logo_menU_icon_span">
            {!hamburger && (
              <Menu
                className="mainnavbar_logo_menU_icon "
                onClick={() => setHamburder(true)}
              />
            )}
            {hamburger && (
              <Close
                className="mainnavbar_logo_menU_icon "
                onClick={() => setHamburder(false)}
              />
            )}
          </span>

          <Link to="/">
            {" "}
            <img
              src={
                process.env.React_App_Base_Url +
                "storage/logo/" +
                websiteData?.[0]?.logo
              }
              alt="logo"
              loading="lazy"
            />
          </Link>
        </div>
        <div className="mainnavbar_search" ref={openRef}>
          <div>
            <input
              type="text"
              placeholder="Search"
              className="mainnavbar_search_input"
              onClick={() => setOpenSearchTab(true)}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Search />
          </div>

          {openSearchTab && (
            <div className="mainnavbar_search_result">
              {searchedResult?.length > 0 ? (
                searchedResult?.map((item, index) => (
                  <span
                    key={index}
                    onClick={() => [
                      history(`/singleProduct/${item?.id}`),
                      setOpenSearchTab(false),
                    ]}
                  >
                    <Search />
                    <p>{item?.title}</p>
                  </span>
                ))
              ) : (
                <div className="see_all_result">
                  <p>No Result Found</p>
                </div>
              )}
              {searchedResult?.length > 0 && (
                <div className="see_all_result">
                  <p
                    onClick={() => [
                      history(`/product/search/${search}`),
                      setOpenSearchTab(false),
                    ]}
                  >
                    See All Result
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mainnavbar_login">
          {!userToken && (
            <span onClick={handleOpen}>
              <AccountCircle className="mainnavbar_login_icon" />
              <p>Login</p>
            </span>
          )}
          {userToken && (
            <>
              {
                <div className="mainnavbar_login_div dropdown">
                  <p className="mainnavbar_login_username">
                    {" "}
                    {userName} <KeyboardArrowDown className="dropbtn_arrow" />
                  </p>
                  <span className=" dropdown-content">
                    <p onClick={() => history("/userprofile")}>My Profile</p>
                    <p onClick={logoutHandle}>Logout</p>
                  </span>
                </div>
              }
            </>
          )}
          <ButtonBase className="wishlisticon">
            <FavoriteBorder
              className="mainnavbar_login_icons"
              onClick={() => history("/wishlist")}
            />
          </ButtonBase>

          <span className="mainnavbar_login_cart">
            <ShoppingCartCheckout onClick={() => history("/cart")} />
            {cart?.data?.length > 0 ? <p>{cart?.data?.length}</p> : ""}
          </span>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="login_box">
            <div className="login_navbar">
              <img src={logo} />
              <Close
                onClick={handleClose}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#2874f0",
                  color: "#fff",
                  fontSize: "30px",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div className="login_top">
              <div className="login_top_left">
                <img src={img} alt="banner" />
              </div>
              {login && (
                <div className="login_top_right">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h6>Welcome To Shop </h6>

                    <span className="login_top_right_email">
                      <input
                        type="text"
                        placeholder="Email "
                        {...register("email", {
                          required: true,
                          pattern:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                      />
                      <MailOutline style={{ color: "#6E798C" }} />
                    </span>
                    {errors.email && (
                      <p className="loginFormError">Please check the Email</p>
                    )}
                    <span className="login_top_right_password">
                      <input
                        type={passwordType}
                        placeholder="Password "
                        {...register("password", {
                          // required: true,
                          // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                        })}
                      />
                      {passwordType === "password" ? (
                        <VisibilityOff
                          style={{ color: "#6E798C" }}
                          onClick={passwordHandle}
                        />
                      ) : (
                        <Visibility
                          style={{ color: "#6E798C" }}
                          onClick={passwordHandle}
                        />
                      )}
                    </span>
                    {errors.password && (
                      <p className="loginFormError">
                        Please check the Password
                      </p>
                    )}
                    <div className="login_top_right_div">
                      <span>
                        <input type="checkbox" />
                        <p> Remember me</p>
                      </span>
                      <Link
                        to="/forgetpassword"
                        target="_blank"
                        className="login_top_right_div_link"
                      >
                        {" "}
                        <p>Forget Password?</p>
                      </Link>
                    </div>
                    <span className="login_top_right_button">
                      {!isLoading ? (
                        <button type="submit">Login</button>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      )}
                    </span>
                  </form>
                  <span className="login_top_right_account">
                    {" "}
                    Don't Have an Account ?
                    <p onClick={openFormSignUp}>Sign Up For Free </p>
                  </span>
                </div>
              )}
              {signUp && (
                <div className="login_top_right">
                  <form onSubmit={handleSubmit(onSubmit1)}>
                    <h6>welcome to shop </h6>
                    <span className="login_top_right_email">
                      <input
                        type="text"
                        placeholder="Full Name"
                        {...register("UserName", {
                          required: true,
                        })}
                      />
                      <PermIdentity style={{ color: "#6E798C" }} />
                    </span>
                    {errors.UserName && (
                      <p className="loginFormError">Please Enter Your Name</p>
                    )}
                    <span className="login_top_right_email">
                      <input
                        type="text"
                        placeholder="Email "
                        {...register("registerEmail", {
                          required: true,
                          pattern:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                      />
                      <MailOutline style={{ color: "#6E798C" }} />
                    </span>{" "}
                    {errors.registerEmail && (
                      <p className="loginFormError">Please Enter Valid Email</p>
                    )}
                    <span className="login_top_right_email">
                      <input
                        type="tel"
                        placeholder="Mobile number "
                        {...register("registerMobile", {
                          required: true,
                          pattern: /^[0-9+-]+$/,
                          minLength: 10,
                          maxLength: 12,
                        })}
                      />
                      <MailOutline style={{ color: "#6E798C" }} />
                    </span>
                    {errors.registerMobile && (
                      <p className="loginFormError">
                        Please Enter Valid Number
                      </p>
                    )}
                    <span className="login_top_right_password">
                      <input
                        type={passwordType}
                        placeholder="Password "
                        {...register("registerPassword", {
                          required: "**Password is required",
                          minLength: {
                            value: 4,
                            message:
                              "**Password must be more than 6 characters",
                          },
                          maxLength: {
                            value: 12,
                            message:
                              "**Password cannot exceed more than 12 characters",
                          },
                        })}
                      />
                      {passwordType === "password" ? (
                        <VisibilityOff
                          style={{ color: "#6E798C" }}
                          onClick={passwordHandle}
                        />
                      ) : (
                        <Visibility
                          style={{ color: "#6E798C" }}
                          onClick={passwordHandle}
                        />
                      )}
                    </span>
                    {errors.registerPassword && (
                      <p className="loginFormError">
                        {errors?.password?.message}
                      </p>
                    )}
                    <span className="login_top_right_password">
                      <input
                        type={confirmPasswordType}
                        placeholder="Conform Password "
                        {...register("registerPasswordConfirm", {
                          required: true,
                          validate: (value) =>
                            value === password1.current ||
                            "The passwords do not match",
                        })}
                      />
                      {confirmPasswordType === "password" ? (
                        <VisibilityOff
                          style={{ color: "#6E798C" }}
                          onClick={passwordHandle1}
                        />
                      ) : (
                        <Visibility
                          style={{ color: "#6E798C" }}
                          onClick={passwordHandle1}
                        />
                      )}
                    </span>
                    {errors.registerPasswordConfirm && (
                      <p className="loginFormError">
                        {errors?.registerPasswordConfirm?.message}
                      </p>
                    )}
                    <div className="login_top_right_div">
                      <span>
                        <input type="checkbox" />
                        <p> Remember me</p>
                      </span>
                      {/* <p>Forget Password?</p> */}
                    </div>
                    <span className="login_top_right_button">
                      {!isLoading ? (
                        <button>Sign Up</button>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      )}
                    </span>
                  </form>
                  <span className="login_top_right_account">
                    {" "}
                    have a account ? <p onClick={openFormLogin}>Login </p>
                  </span>
                  {isLoading && (
                    <Box sx={style1}>
                      <CircularProgress />
                    </Box>
                  )}
                </div>
              )}
            </div>
          </Box>
        </Modal>
      </div>

      {hamburger && (
        <div
          className={
            hamburger
              ? "mobile_nav_bar scale-in-tl"
              : "mobile_nav_bar scale-out-tl"
          }
          ref={ref}
        >
          <p onClick={selectedCategories}>All Categories</p>
          <p onClick={selectedCategories1}>Offer Zone</p>
          <p>My Orders</p>
          <p onClick={() => history("/cart")}>My Cart</p>
          <p>My WishList</p>
          <p>My Account</p>
          <p>My Notification</p>
          <p>Notification Prefrence</p>
          <p>Help Center</p>
          <p>Legal</p>
        </div>
      )}
      <div className="phonesearchbar">
        <input type="type" placeholder="Search Something" />
        <Search />
      </div>
    </>
  );
}

export default MainNavBar;
