import React, { useEffect, useState } from "react";
import "./AddBanner.css";
import axios from "axios";
import { Delete, Edit } from "@mui/icons-material";
import { Box, CircularProgress, Fade, Modal, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import swal from "sweetalert";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
function AddBanner() {
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
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Submitted  Successfully!");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [loading, setLoading] = useState();
  const token = Cookies.get("adminLogin");
  const [bannerAddTitle, setBannerAddTitle] = useState();
  const [bannerEditTitle, setBannerEditTitle] = useState();
  const [bannerAddlink, setBannerAddLink] = useState();
  const [bannerEditlink, setBannerEditLink] = useState();
  const [bannerAddAltTag, setBannerAddAltTag] = useState();
  const [bannerEditAltTag, setBannerEditAltTag] = useState();
  const [bannerAddImage, setBannerAddImage] = useState();
  const [bannerEditImage, setBannerEditImage] = useState();
  const [bannerList, setBannerList] = useState();
  const [bannerEditId, setBannerEditId] = useState();
  const bannerListHandle = async () => {
    const response = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/banner"}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    setBannerList(response?.data?.list && response?.data?.list);
    console.log(response?.data?.list);
  };
  const bannerAddHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", bannerAddTitle);
    formData.append("link", bannerAddlink);
    formData.append("alt_tag", bannerAddAltTag);
    formData.append("image", bannerAddImage);
    const response = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/admin/banner"}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => response, setLoading(true), handleClose())
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    console.log(response);
    bannerListHandle();
    handleClose();
    setBannerAddImage();
    if (response) {
      notify();
      bannerListHandle();
    }
    if (!response) {
      notify1();
    }
  };
  const BannerEditHandle = async (id) => {
    const response = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/banner/" + id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    setBannerEditId(id);
    setBannerEditTitle(
      response?.data?.data[0]?.title && response?.data?.data[0]?.title
    );
    setBannerEditAltTag(
      response?.data?.data[0]?.alt_tag && response?.data?.data[0]?.alt_tag
    );
    setBannerEditLink(
      response?.data?.data[0]?.link && response?.data?.data[0]?.link
    );
    setBannerEditImage(
      response?.data?.data[0]?.image && response?.data?.data[0]?.image
    );
  };
  const bannerUpdateHandle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("title", bannerEditTitle);
    formData.append("link", bannerEditlink);
    formData.append("alt_tag", bannerEditAltTag);
    formData.append("image", bannerAddImage);
    const response = await axios
      .post(
        `${
          process.env.React_App_Base_Url + "api/admin/banner/" + bannerEditId
        }`,

        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-type": "multipart/form-date",
        }
      )
      .then((response) => response, setLoading(true), handleClose1())
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    console.log(response);

    if (response) {
      notify();
      bannerListHandle();
    }
    if (!response) {
      notify1();
    }
  };
  const bannerDeleteHandle = async () => {
    const response = await axios
      .delete(
        `${
          process.env.React_App_Base_Url + "api/admin/banner/" + bannerEditId
        }`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => response, setLoading(true), handleClose2())
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    console.log(response);

    if (response) {
      notify();
      bannerListHandle();
    }
    if (!response) {
      notify1();
    }
  };
  const bannerStatusHandle = async (id, status) => {
    const formData = new FormData();
    formData.append("status", status == 1 ? 0 : 1);

    const { data } = await axios
      .post(
        `${
          process.env.React_App_Base_Url +
          "api/admin/update_banner_status/" +
          id
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
      bannerListHandle();
    }
    if (!data) {
      notify1();
    }

    console.log(data);
  };

  useEffect(() => {
    bannerListHandle();
  }, []);
  return (
    <div className="addbanner">
      <div className="addbanner_heading">
        <h3>Banner</h3>
        <button onClick={handleOpen}>Add Banner</button>
      </div>
      <div className="addbanner_top">
        <table id="customers">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Banner Title</th>
              <th>Banner Link</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bannerList?.map((item, index) => (
              <tr key={item?.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item?.image}
                    alt={item?.alt_tag}
                    style={{
                      height: "50px",
                      objectFit: "contain",
                      maxWidth: "150px",
                    }}
                  />
                </td>
                <td>{item?.title}</td>
                <td>
                  <p style={{ width: "200px", overflow: "hidden" }}>
                    {item?.link}
                  </p>
                </td>
                <td>
                  {" "}
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={item?.status == 1 ? true : false}
                      // checked={productStatus===1?checked:''}
                      onClick={() => bannerStatusHandle(item?.id, item?.status)}
                      name="product_type"
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <Edit
                    style={{ color: "lightgrey", cursor: "pointer" }}
                    onClick={() => handleOpen1(BannerEditHandle(item?.id))}
                  />
                  <Delete
                    style={{ color: "rgb(255, 141, 96)", cursor: "pointer" }}
                    onClick={() => handleOpen2(setBannerEditId(item?.id))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <Box sx={style} className="modal_class">
            <form
              onSubmit={bannerAddHandle}
              enctype="multipart/form-data"
              method="post"
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Banner Title
              </Typography>
              <span>
                <input
                  type="text "
                  placeholder="Banner Title"
                  onChange={(e) => setBannerAddTitle(e.target.value)}
                  required
                />
              </span>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Banner Link
              </Typography>
              <span>
                <input
                  type="text "
                  placeholder="Banner Link"
                  onChange={(e) => setBannerAddLink(e.target.value)}
                  required
                />
              </span>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Banner Alt Tag
              </Typography>
              <span>
                <input
                  type="text "
                  placeholder="Banner Alt Tag"
                  onChange={(e) => setBannerAddAltTag(e.target.value)}
                  required
                />
              </span>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Banner Image
              </Typography>
              <span>
                <input
                  type="file"
                  onChange={(e) => setBannerAddImage(e.target.files[0])}
                  required
                />
              </span>
              <span className="modal_class_button">
                <button type="submit">Add Banner</button>
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
          <Box sx={style} className="modal_class">
            <form
              onSubmit={bannerUpdateHandle}
              enctype="multipart/form-data"
              method="post"
              action="/api-endpoitn"
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Banner Title
              </Typography>
              <span>
                <input
                  type="text "
                  placeholder="Banner Title"
                  value={bannerEditTitle ? bannerEditTitle : ""}
                  onChange={(e) => setBannerEditTitle(e.target.value)}
                  required
                />
              </span>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Banner Link
              </Typography>
              <span>
                <input
                  type="text "
                  placeholder="Banner Link"
                  value={bannerEditlink ? bannerEditlink : ""}
                  onChange={(e) => setBannerEditLink(e.target.value)}
                  required
                />
              </span>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Banner Alt Tag
              </Typography>
              <span>
                <input
                  type="text "
                  placeholder="Banner Alt Tag"
                  value={bannerEditAltTag ? bannerEditAltTag : ""}
                  onChange={(e) => setBannerEditAltTag(e.target.value)}
                  required
                />
              </span>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Banner Image
              </Typography>
              <span>
                <input
                  type="file"
                  onChange={(e) => setBannerAddImage(e.target.files[0])}
                />
              </span>
              <span>
                <img
                  src={bannerEditImage}
                  alt="banner previous Uploaded"
                  style={{ height: "50px" }}
                />
              </span>
              <span className="modal_class_button">
                <button type="submit">Edit Banner</button>
              </span>
            </form>
          </Box>
        </Fade>
      </Modal>
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
          <Box sx={style} className="modal_class">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Are You Sure
            </Typography>

            <span className="modal_class_button">
              <button
                onClick={handleClose2}
                style={{
                  cursor: "pointer",
                  marginRight: "10px",
                  background: "rgb(255, 141, 96)",
                }}
              >
                No
              </button>
              <button
                onClick={bannerDeleteHandle}
                style={{ cursor: "pointer" }}
              >
                Yes
              </button>
            </span>
          </Box>
        </Fade>
      </Modal>
      {loading && (
        <Box sx={style1}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default AddBanner;
