import React, { useEffect, useState } from "react";
import "./User.css";
import axios from "axios";
import PaginationPage from "../../Pagination/Pagination";
import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
function User() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #FFF",
    boxShadow: 24,
    outline: "0",
    p: 4,
  };
  const style2 = {
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
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("SomeThing Went Wrong!");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = Cookies.get("adminLogin");
  const [userList, setUserList] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState();
  const [userProfilePic, setUserProfilePic] = useState();
  const [userProfileName, setUserProfileName] = useState();
  const [userProfileEmail, setUserProfileEmail] = useState();
  const [userProfileMobile, setUserProfileMobile] = useState();
  const [userProfileAddress, setUserProfileAddress] = useState();
  const [userProfileCity, setUserProfileCity] = useState();
  const [userProfilePinCode, setUserProfilePinCode] = useState();
  const [isLoading, setLoading] = useState(false);
  const userListhandle = async () => {
    const response = await axios.get(
      `${process.env.React_App_Base_Url + "api/admin/user"}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setUserList(response?.data?.list && response?.data?.list);
    setCount(
      response?.data?.list && (response?.data?.list.length / 10).toFixed(0)
    );
    console.log(response);
  };
  const userProfileViewHandle = async (id) => {
    const response = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/user/" + id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response, setLoading);
    setUserProfileAddress(
      response?.data?.data?.address && response?.data?.data?.address
    );
    setUserProfileCity(
      response?.data?.data?.city && response?.data?.data?.city
    );
    setUserProfileEmail(
      response?.data?.data?.email && response?.data?.data?.email
    );
    setUserProfileMobile(
      response?.data?.data?.mobile && response?.data?.data?.mobile
    );
    setUserProfileName(
      response?.data?.data?.name && response?.data?.data?.name
    );
    setUserProfilePic(
      response?.data?.data?.image && response?.data?.data?.image
    );
    setUserProfilePinCode(
      response?.data?.data?.pincode && response?.data?.data?.pincode
    );
    console.log(response?.data?.data);
  };
  const userActiveStatusHandle = async (id, status) => {
    const formData = new FormData();
    formData.append("status", status == 1 ? 0 : 1);
    const { data } = await axios

      .post(
        `${
          process.env.React_App_Base_Url + "api/admin/user_status_update/" + id
        }`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    if (data) {
      notify();
      userListhandle();
    }
    if (!data) {
      notify1();
    }

    console.log(data);
  };
  useEffect(() => {
    userListhandle();
  }, []);
  return (
    <div className="user">
      <div className="user_heading">
        <h3>Customers</h3>
      </div>
      <div className="user_top">
        <div className="user_top_search_heading">
          <input type="text" placeholder="Search" />
          <div>
            <span>
              <select name="status">
                <option>Status:all</option>
                <option>Active Only</option>
                <option>Disable</option>
              </select>
            </span>
          </div>
        </div>
        <div className="user_top_user">
          <table id="customers">
            <thead>
              <tr>
                <th>User id</th>
                <th>Profile Pic</th>
                <th>Name</th>
                <th>Email & Mobile No</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {userList
                ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
                ?.map((item, index) => (
                  <tr key={item?.id}>
                    <td>
                      <strong>{item?.id}</strong>
                    </td>
                    <td>
                      <img
                        src={item?.image}
                        style={{
                          height: "50px",
                          width: "50px",
                          objectFit: "contain",
                        }}
                      />
                    </td>
                    <td>
                      <p>{item?.name}</p>
                    </td>
                    <td>
                      <p>{item?.email}</p>

                      <p>{item?.mobile}</p>
                    </td>
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={item?.status === 1 ? true : false}
                          // checked={productStatus===1?checked:''}
                          onClick={() =>
                            userActiveStatusHandle(item?.id, item?.status)
                          }
                          name="product_type"
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>
                      <p
                        style={{
                          color: "#fff",
                          background: "#FF8D60",
                          width: "60px",
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "center",
                          padding: "5px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleOpen(userProfileViewHandle(item?.id))
                        }
                      >
                        View
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="user_Pagination">
        <PaginationPage count={count} setPage={setPage} />
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              User Details
            </Typography>
            <div className="adminuserdetails">
              <div className="adminuserdetails_left">
                <img
                  src={userProfilePic}
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className="adminuserdetails_right">
                <span className="userDetails_span">
                  <p>Full Name</p>
                  <p>{userProfileName}</p>
                </span>

                <span className="userDetails_span">
                  <p>Mobile</p>
                  <p>{userProfileMobile}</p>
                </span>

                <span className="userDetails_span">
                  <p>Email</p>
                  <p>{userProfileEmail}</p>
                </span>

                <span className="userDetails_span">
                  <p>Address</p>
                  <p style={{ width: "230px" }}>{userProfileAddress}</p>
                </span>

                <span className="userDetails_span">
                  <p>City</p>
                  <p>{userProfileCity}</p>
                </span>

                <span className="userDetails_span">
                  <p>Pin Code</p>
                  <p>{userProfilePinCode}</p>
                </span>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
      {isLoading && (
        <Box sx={style2}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default User;
