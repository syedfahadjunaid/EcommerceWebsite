import React, { useEffect, useState } from "react";
import "./PopUpAdmin.css";
import { Delete, Edit } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import img from "../../Images/image 24.jpg";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function PopUpAdmin() {
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
    height: "550px",
    overflowY: "scroll",
  };
  const style1 = {
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
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Submitted  Successfully!");
  const token = Cookies.get("adminLogin");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popUpData, setPopUpData] = useState();
  const [popupTitle, setPopupTitle] = useState();
  const [popupAltTag, setPopupAltTag] = useState();
  const [popupLink, setPopupLink] = useState();
  const [popupImage, setPopupImage] = useState([]);
  const [popupImagePrev, setPopupImagePrev] = useState([]);
  const [popupId, setPopupId] = useState();
  const getPopDataHandle = async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/popup-all-banner"}`, {
        headers: {
          "Content-type": "multipart/form-date",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setPopUpData(data && data?.Banner);
    console.log(data);
  };
  const addPopHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", popupTitle);
    formData.append("link", popupLink);
    formData.append("alttag", popupAltTag);
    formData.append("image", popupImage);
    const { data } = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/admin/popup-create"}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-date",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response, setIsLoading(true), handleClose())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    if (data) {
      notify();
      getPopDataHandle();
    }
    if (!data) {
      notify1();
    }
    console.log(data);
  };
  const getSinglePopData = async (id) => {
    const { data } = await axios
      .get(
        `${process.env.React_App_Base_Url + "api/admin/Get-one-popup/" + id}`,
        {
          headers: {
            "Content-type": "multipart/form-date",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setPopupTitle(data && data?.banner?.title);
    setPopupAltTag(data && data?.banner?.alttag);
    setPopupLink(data && data?.banner?.link);
    setPopupImagePrev(data && data?.banner?.image);
    setPopupId(data && data?.banner?.id);
    console.log(data, "single blog");
  };
  const updatePopupDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", popupTitle);
    formData.append("link", popupLink);
    formData.append("alttag", popupAltTag);
    formData.append(
      "image",
      popupImage?.length === 0 ? popupImagePrev : popupImage
    );
    const data = await axios
      .post(
        `${
          process.env.React_App_Base_Url + "api/admin/popup-update/" + popupId
        }`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response, setIsLoading(true), handleClose1())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    if (data) {
      notify();
      getPopDataHandle();
    }
    if (!data) {
      notify1();
    }

    console.log(data);
  };
  const deletePopupHandle = async () => {
    const data = await axios
      .delete(
        `${
          process.env.React_App_Base_Url + "api/admin/popup-delete/" + popupId
        }`,
        {
          headers: {
            "Content-type": "multipart/form-date",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response, setIsLoading(true),handleClose2())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    if (data) {
      notify();
      getPopDataHandle();
    }
    if (!data) {
      notify1();
    }
  };
  useEffect(() => {
    getPopDataHandle();
  }, []);
  return (
    <div className="product">
      <div className="product_heading">
        <h3>PopUp</h3>
       {popUpData?.length===0 && <button onClick={handleOpen}>Add PopUp</button>}
      </div>
      <div className="product_product">
        <div className="product_cards_admin">
          <table id="customers">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>#</th>
                <th style={{ width: "150px" }}>PopUp Image</th>
                <th style={{ width: "200px" }}> PopUp Title</th>
                <th style={{ width: "300px" }}>PopUp Link</th>
                <th style={{ width: "200px" }}>PopUp Alt Tag</th>
                <th style={{ width: "200px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {popUpData?.map((item, index) => (
                <tr>
                  <td style={{ width: "50px" }}>{index + 1}</td>
                  <td style={{ width: "150px" }}>
                    <img
                      src={item?.image}
                      style={{ width: "80px", height: "80px" }}
                      alt={item?.alttag}
                    />
                  </td>
                  <td style={{ width: "200px" }}>{item?.title}</td>
                  <td style={{ width: "300px" }}>{item?.link}</td>
                  <td style={{ width: "200px" }}>{item?.alttag}</td>
                  <td style={{ width: "100px" }}>
                    <Edit
                      style={{ color: "lightgrey" }}
                      onClick={() => [
                        handleOpen1(),
                        getSinglePopData(item?.id),
                      ]}
                    />
                    <Delete
                      style={{ color: "rgb(255, 141, 96)" }}
                      onClick={() => [handleOpen2(), setPopupId(item?.id)]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          <Box sx={style} className="popupAdminModal">
            <form onSubmit={addPopHandle}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                PopUp Title
              </Typography>
              <span>
                <input
                  type="text"
                  placeholder="Title"
                  onChange={(e) => setPopupTitle(e.target.value)}
                />
              </span>
              <Typography
                id="transition-modal-description"
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}
              >
                PopUp Link
              </Typography>
              <span>
                <input
                  type="text"
                  placeholder="Link"
                  onChange={(e) => setPopupLink(e.target.value)}
                />
              </span>
              <Typography
                id="transition-modal-description"
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}
              >
                PopUp Alt Tag
              </Typography>
              <span>
                <input
                  type="text"
                  placeholder="Alt Tag"
                  onChange={(e) => setPopupAltTag(e.target.value)}
                />
              </span>
              <Typography
                id="transition-modal-description"
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}
              >
                PopUp Image
              </Typography>
              <span>
                <input
                  type="file"
                  onChange={(e) => setPopupImage(e.target.files[0])}
                />
              </span>
              <span className="popupAdminModal_span">
                <button>Add PopUp</button>
              </span>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open1}>
          <Box sx={style} className="popupAdminModal">
            <form onSubmit={updatePopupDataHandle}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                PopUp Title Edit
              </Typography>
              <span>
                <input
                  type="text"
                  placeholder="Title Edit"
                  value={popupTitle}
                  onChange={(e) => setPopupTitle(e.target.value)}
                />
              </span>
              <Typography
                id="transition-modal-description"
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}
              >
                PopUp Link Edit
              </Typography>
              <span>
                <input
                  type="text"
                  placeholder="Link Edit"
                  value={popupLink}
                  onChange={(e) => setPopupLink(e.target.value)}
                />
              </span>
              <Typography
                id="transition-modal-description"
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}
              >
                PopUp Alt Tag Edit
              </Typography>
              <span>
                <input
                  type="text"
                  placeholder="Alt Tag"
                  value={popupAltTag}
                  onChange={(e) => setPopupAltTag(e.target.value)}
                />
              </span>
              <Typography
                id="transition-modal-description"
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}
              >
                PopUp Image Edit
              </Typography>
              <span>
                <input
                  type="file"
                  onChange={(e) => setPopupImage(e.target.value)}
                />
              </span>
              <Typography
                id="transition-modal-description"
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}
              >
                PopUp Image Uploaded
              </Typography>
              <span style={{ border: "transparent" }}>
                <img
                  src={popupImagePrev}
                  style={{ height: "100px", width: "100px" }}
                  alt=""
                />
              </span>
              <span className="popupAdminModal_span">
                <button>Update Popup</button>
              </span>
            </form>
          </Box>
        </Fade>
      </Modal>{" "}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open2}>
          <Box sx={style1}>
            <Typography
              id="transition-modal-description"
              variant="h6"
              component="h2"
              sx={{ mt: 2 }}
            >
              Are You Sure ?
            </Typography>
            <span className="popupAdminModal_span_delete">
              <button onClick={handleClose2}>No</button>
              <button onClick={deletePopupHandle}>Yes</button>
            </span>
          </Box>
        </Fade>
      </Modal>
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default PopUpAdmin;
