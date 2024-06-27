import React, { useState } from "react";
import "./UserProfile.css";
import userProfile from "../../../Images/Ellipse 15.jpg";
import { Delete, FilterAlt, Remove, Shop } from "@mui/icons-material";
import { Alert, Box, Modal, Typography } from "@mui/material";
import gpay from "../../../Images/gpay.png";
import paytm from "../../../Images/paytm.jpg";
import mastercard from "../../../Images/mastercard.jpg";
import visacard from "../../../Images/visa.jpg";
import { useNavigate } from "react-router-dom";
import img from "../../../Images/Mask group.png";
import SubNavBar from "../../NavBar/SubNavBar/SubNavBar";
import MainNavBar from "../../NavBar/MainNavBar/MainNavBar";
import AddressNavBar from "../../NavBar/AddressNavBar/AddressNavBar";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
function UserProfile() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #fff",
    outline: "0",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
  };
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Something Went Wrong");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [accountSetting, setAccount] = useState(true);

  const [manageAddress, setManageAddress] = useState(false);
  const [payment, setPayment] = useState(false);
  const [payment1, setPayment1] = useState(false);
  const [card, setCard] = useState(false);
  const [myOrder, setMyOrder] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Profile Information");
  const [pinCode, setPinCode] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();

  const history = useNavigate();
  const userId = Cookies.get("userId");
  const { userLogin } = useSelector((state) => state?.user);
  const [isLoading, setIsLoading] = useState(false);
  const getUserDataHandle = () => {};
  const updateUserProfileHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", "arman");
    formData.append("address", address);
    formData.append("city", city);
    formData.append("pincode", pinCode);
    const data = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/update/" + userId}`,
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
    }
    if (!data) {
      notify1();
    }
    console.log(data);
  };

  if (!userLogin) {
    return (
      <>
        <SubNavBar />
        <MainNavBar />
        <div className="notlogin">
          <p> You Must To Be Login To Access This Page</p>
        </div>
      </>
    );
  }
  return (
    <div className="userprofile">
      <SubNavBar />
      <MainNavBar />
      <AddressNavBar />
      <div className="userprofile_top">
        <div className="userprofile_left">
          <span>
            <p>UserName</p>
            <img src={userProfile} alt="Profile Pic" loading="lazy" />
          </span>
          <span>
            <p style={{ cursor: "pointer" }}>Account Settings</p>
            <Remove className="userprofile_left_icon" />
          </span>
          {accountSetting && (
            <div className="userprofile_left_div">
              <p
                onClick={() => setSelectedTab("Profile Information")}
                style={{ cursor: "pointer" }}
                className={
                  selectedTab === "Profile Information" && "active_tab"
                }
              >
                Profile Information
              </p>
              <p
                onClick={() => setSelectedTab("Manage Addresses")}
                style={{ cursor: "pointer" }}
                className={selectedTab === "Manage Addresses" && "active_tab"}
              >
                Manage Addresses
              </p>
            </div>
          )}
          <span onClick={() => setPayment(payment === false ? true : false)}>
            <p style={{ cursor: "pointer" }}>Payments Option</p>
            <Remove className="userprofile_left_icon" />
          </span>
          {payment && (
            <div className="userprofile_left_div">
              <p
                onClick={() => setSelectedTab("Saved Card")}
                style={{ cursor: "pointer" }}
                className={selectedTab === "Saved Card" && "active_tab"}
              >
                Saved Card
              </p>
              <p
                onClick={() => setSelectedTab("Saved UPI")}
                style={{ cursor: "pointer" }}
                className={selectedTab === "Saved UPI" && "active_tab"}
              >
                Saved UPI
              </p>
            </div>
          )}
          <span>
            <p
              onClick={() => setSelectedTab("My Order")}
              style={{ cursor: "pointer" }}
              className={selectedTab === "My Order" && "active_tab"}
            >
              My Order
            </p>
            <Remove className="userprofile_left_icon" />
          </span>
        </div>
        <div className="userprofile_right">
          {selectedTab === "Profile Information" && (
            <>
              {" "}
              <span className="userprofile_right_profile_information">
                <p>Profile Information</p>
                <p className="userprofile_right_edit">Edit</p>
              </span>
              <span className="userprofile_right_profile_name">
                <p>User Profile</p>
                <input type="file" style={{ border: "transparent" }} />
              </span>
              <span className="userprofile_right_profile_name">
                <p>Full name</p>
                <input type="text" placeholder="Full Name" />
              </span>
              <span className="userprofile_right_profile_gender">
                <p>Your Gender</p>
                <div>
                  <span>
                    <input type="radio" name="gender" />
                    <p>Male</p>
                  </span>
                  <span>
                    <input type="radio" name="gender" />
                    <p>Female</p>
                  </span>
                </div>
              </span>
              <span className="userprofile_right_profile_email userprofile_right_profile_name">
                <p>Email Address</p>
                <input type="text" placeholder="User Email" />
              </span>
              <span className="userprofile_right_profile_mobile userprofile_right_profile_name">
                <p>Mobile Number</p>
                <input type="text" placeholder="Mobile Number" />
              </span>
            </>
          )}

          {selectedTab === "Manage Addresses" && (
            <>
              <form onSubmit={updateUserProfileHandle}>
                <span className="userprofile_right_profile_information">
                  <p>Manage Address</p>
                  <p className="userprofile_right_edit">Edit</p>
                </span>
                <span className="userprofile_right_profile_address">
                  <p>Full Address</p>
                  <div>
                    <input
                      type="number"
                      style={{
                        border: "transparent",
                        outline: "transparent",
                      }}
                      placeholder="Pin Code"
                      onChange={(e) => setPinCode(e.target.value)}
                      required
                    />

                    <input
                      style={{
                        border: "transparent",
                        outline: "transparent",
                      }}
                      placeholder="City"
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />

                    <p>
                      <textarea
                        rows="5"
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "transparent",
                          border: "transparent",
                          outline: "transparent",
                        }}
                        placeholder="User Address"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      ></textarea>
                    </p>
                  </div>
                </span>
                {!isLoading ? (
                  <button type="submit" className="edit_button">
                    Update Address
                  </button>
                ) : (
                  <button className="edit_button" disabled>
                    Saving...
                  </button>
                )}
              </form>
              {/* <div className="userprofile_right_profile_new_address">
                <p onClick={handleOpen}>Add a New Address +</p>
              </div> */}
            </>
          )}

          {selectedTab === "Saved Card" && (
            <>
              <span className="userprofile_right_profile_information">
                <p>Saved UPI</p>
              </span>
              <div className="userprofile_right_saved_upi">
                <span>
                  <p>Google Pay</p>
                  <img src={gpay} alt="upi provider logo" loading="lazy" />
                </span>
                <Delete style={{ color: "#7B7B7B", cursor: "pointer" }} />
              </div>
              <div className="userprofile_right_saved_upi">
                <span>
                  <p>Paytm UPI</p>
                  <img src={paytm} alt="upi provider logo" loading="lazy" />
                </span>
                <Delete style={{ color: "#7B7B7B", cursor: "pointer" }} />
              </div>
            </>
          )}
          {selectedTab === "Saved UPI" && (
            <>
              <span className="userprofile_right_profile_information">
                <p>Saved Card</p>
              </span>
              <div className="userprofile_right_saved_upi">
                <span>
                  <p>4545 xxxx xxxx xx45</p>
                  <img src={visacard} alt="upi provider logo" loading="lazy" />
                </span>
                <Delete style={{ color: "#7B7B7B", cursor: "pointer" }} />
              </div>
              <div className="userprofile_right_saved_upi">
                <span>
                  <p>4545 xxxx xxxx xx45</p>
                  <img
                    src={mastercard}
                    alt="upi provider logo"
                    loading="lazy"
                  />
                </span>
                <Delete style={{ color: "#7B7B7B", cursor: "pointer" }} />
              </div>
            </>
          )}
          {selectedTab === "My Order" && (
            <>
              <span className="userprofile_right_profile_information">
                <p>My Order</p>
                <FilterAlt />
              </span>
              <div className="userprofile_right_saved_card1">
                <div className="userprofile_right_saved_card_header">
                  <span>
                    <Shop className="userprofile_right_saved_card_header_icon" />
                    <p>Order Delivered</p>
                  </span>
                  <p>Order of Date</p>
                </div>
                <div className="userprofile_right_saved_card_main">
                  <div className="userprofile_right_saved_card_main_left">
                    <Shop className="userprofile_right_saved_card_header_icon" />
                    <span>
                      <p>Order ID</p>
                    </span>
                  </div>
                  <div className="userprofile_right_saved_card_main_right">
                    <p>PDF13213144</p>
                    <p>Download Invoie</p>
                  </div>
                </div>
                <div className="userprofile_right_saved_card_bottom">
                  <button>Order Return</button>
                  <button onClick={() => history("/product")}>Reorder</button>
                </div>
              </div>
            </>
          )}
          <div className="userprofile_bottom">
            <div className="userprofile_bottomheading">
              <p>Frequently Ask Question</p>
            </div>
            <div className="userprofile_bottomQuestion">
              <p>
                What happens when I update my email address (or mobile number)?
              </p>
              <p>
                Your login email id (or mobile number) changes, likewise. You'll
                receive all your account related communication on your updated
                email address (or mobile number).
              </p>
              <p>
                It happens as soon as you confirm the verification code sent to
                your email (or mobile) and save the changes.
              </p>
              <p>
                What happens to my existing Flipkart account when I update my
                email address (or mobile number)?
              </p>
              <p>
                What happens to my existing Flipkart account when I update my
                email address (or mobile number)?
              </p>
              <p>
                Flipkart has a 'single sign-on' policy. Any changes will reflect
                in your Seller account also.
              </p>
              <p>
                Does my Seller account get affected when I update my email
                address?
              </p>
              <p>
                Updating your email address (or mobile number) doesn't
                invalidate your account. Your account remains fully functional.
                You'll continue seeing your Order history, saved information and
                personal details.
              </p>
            </div>
          </div>
          <div className="userprofile_bottom_deactiveaccount">
            <p className="deactiveaccount">Deactive Account</p>
            <img src={img} alt="img" loading="lazy" />
          </div>
        </div>
        <div className="userprofile_right__mobile">
          <span>
            <p>UserName</p>
            <img src={userProfile} alt="profile pic" loading="lazy" />
          </span>
          <span>
            <p>Account Settings</p>
          </span>
          <span>
            {" "}
            <p>Profile Information</p>
          </span>
          {accountSetting && (
            <div className="userprofile_right__mobile_div">
              {" "}
              {/* <span className="userprofile_right_profile_information">
              <p>Profile Information</p>
              <p className="userprofile_right_edit">Edit</p>
            </span> */}
              <span className="userprofile_right_profile_name">
                <p>Full name</p>
                <p>User Name</p>
              </span>
              <span className="userprofile_right_profile_gender">
                <p>Your Gender</p>
                <div>
                  <span>
                    <input type="radio" name="gender" />
                    <p>Male</p>
                  </span>
                  <span>
                    <input type="radio" name="gender" />
                    <p>Female</p>
                  </span>
                </div>
              </span>
              <span className="userprofile_right_profile_email">
                <p>Email Address</p>
                <p>admin@branding360.in</p>
              </span>
              <span className="userprofile_right_profile_mobile">
                <p>Mobile Number</p>
                <p>+91 9919444434</p>
              </span>
            </div>
          )}
          <span>
            <p>Manage Addresses</p>
          </span>
          {manageAddress && (
            <>
              {" "}
              {/* <span className="userprofile_right_profile_information">
              <p>Manage Address</p>
              <p className="userprofile_right_edit">Edit</p>
            </span> */}
              <span className="userprofile_right_profile_address">
                <p>Full Address</p>
                <div>
                  <input type="radio" />
                  <p>Your Home Address</p>
                </div>
              </span>
              <div className="userprofile_right_profile_new_address">
                <p onClick={handleOpen}>Add a New Address +</p>
              </div>
            </>
          )}
          <span>
            <p>Payments</p>
          </span>
          <span>
            <p>Saved UPI</p>
          </span>
          {card && (
            <>
              {/* <span className="userprofile_right_profile_information">
              <p>Saved UPI</p>
            </span> */}
              <div className="userprofile_right_saved_upi">
                <span>
                  <p>Google Pay</p>
                  <img src={gpay} alt="upi provider logo" loading="lazy" />
                </span>
                <Delete style={{ color: "#7B7B7B", cursor: "pointer" }} />
              </div>
              <div className="userprofile_right_saved_upi">
                <span>
                  <p>Paytm UPI</p>
                  <img src={paytm} alt="upi provider logo" loading="lazy" />
                </span>
                <Delete style={{ color: "#7B7B7B", cursor: "pointer" }} />
              </div>
            </>
          )}
          <span>
            <p>Saved Card</p>
          </span>
          {payment1 && (
            <>
              {/* <span className="userprofile_right_profile_information">
              <p>Saved Card</p>
            </span> */}
              <div className="userprofile_right_saved_upi">
                <span>
                  <p>4545 xxxx xxxx xx45</p>
                  <img src={visacard} alt="upi provider logo" loading="lazy" />
                </span>
                <Delete style={{ color: "#7B7B7B", cursor: "pointer" }} />
              </div>
              <div className="userprofile_right_saved_upi">
                <span>
                  <p>4545 xxxx xxxx xx45</p>
                  <img
                    src={mastercard}
                    alt="upi provider logo"
                    loading="lazy"
                  />
                </span>
                <Delete style={{ color: "#7B7B7B", cursor: "pointer" }} />
              </div>
            </>
          )}
          <span>
            <p>My Order</p>
          </span>
          {myOrder && (
            <>
              {/* <span className="userprofile_right_profile_information">
              <p>My Order</p>
              <FilterAlt />
            </span> */}
              <div className="userprofile_right_saved_card1">
                <div className="userprofile_right_saved_card_header">
                  <span>
                    <Shop className="userprofile_right_saved_card_header_icon" />
                    <p>Order Delivered</p>
                  </span>
                  <p>Order of Date</p>
                </div>
                <div className="userprofile_right_saved_card_main">
                  <div className="userprofile_right_saved_card_main_left">
                    <Shop className="userprofile_right_saved_card_header_icon" />
                    <span>
                      <p>Order ID</p>
                    </span>
                  </div>
                  <div className="userprofile_right_saved_card_main_right">
                    <p>PDF13213144</p>
                    <p>Download Invoie</p>
                  </div>
                </div>
                <div className="userprofile_right_saved_card_bottom">
                  <button>Order Return</button>
                  <button onClick={() => history("/product")}>Reorder</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="address_box_modal">
          <div className="address_modal">
            <span>
              <input type="text" placeholder="Full Name" />
            </span>
            <span>
              <input type="text" placeholder="Mobile No" />
            </span>
          </div>
          <div className="address_modal">
            <span>
              <input type="text" placeholder="Your Email Address" />
            </span>
            <span>
              <input type="text" placeholder="State" />
            </span>
          </div>
          <div className="address_modal_zipcode">
            <span>
              <input type="text" placeholder="Zip Code" />
            </span>
            <span>
              <input type="text" placeholder="City" />
            </span>{" "}
            <span>
              <input type="text" placeholder="LandMark" />
            </span>
          </div>
          <div className="address_modal_address_type">
            <p>Address Type</p>
            <div>
              <span>
                <input type="radio" name="address" />
                <p>Home</p>
              </span>
              <span>
                <input type="radio" name="address" />
                <p>Other</p>
              </span>
            </div>
            <button className="address_modal_button">Save</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default UserProfile;
