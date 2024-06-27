import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import "./AdminWebsiteAnalytics.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Delete, Edit } from "@mui/icons-material";

function AdminWebsiteAnalytics() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid transparent",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
    height: "550px",
    outline: "transparent",
    borderRadius: "5px",
  };
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Something Went Wrong");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState();
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [description, setDescription] = useState();
  const [analyticsId, setAnalyticsId] = useState();
  const [adminWebsiteAnalyticsData, setAdminWebsiteAnalyticsData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("adminLogin");
  const getAllWebsiteAnalyticsHandle = async () => {
    const { data } = await axios
      .get(
        `${
          process.env.React_App_Base_Url + "api/admin/website-analysis-title"
        }`,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setAdminWebsiteAnalyticsData(data && data?.data);

    console.log(data?.data);
  };
  const addNewWebsiteAnalyticsHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("script", description);

    const { data } = await axios
      .post(
        `${
          process.env.React_App_Base_Url +
          "api/admin/website-analysis-title/create"
        }`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response, setIsLoading(true), handleClose())
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
  const getOneWebsiteAnalyticsDataHandle = async (id) => {
    handleOpen1();
    const { data } = await axios
      .get(
        `${
          process.env.React_App_Base_Url +
          "api/admin/website-analysis-title/" +
          id
        }`,
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
    setTitle(data && data?.data?.title);
    setDescription(data && data?.data?.script);
    setAnalyticsId(data && data?.data?.id);
    console.log(data?.data, "single blog");
  };
  const updateWebsiteAnalyticsDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("script", description);
    const data = await axios
      .post(
        `${
          process.env.React_App_Base_Url +
          "api/admin/website-analysis-title/update/" +
          analyticsId
        }`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-date",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response, setIsLoading(true), handleClose1())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    if (data) {
      notify();
      getAllWebsiteAnalyticsHandle();
    }
    if (!data) {
      notify1();
    }

    console.log(data, "data");
  };
  useEffect(() => {
    getAllWebsiteAnalyticsHandle();
  }, []);
  return (
    <div className="admincoupan">
      <div className="product_heading">
        <h3>Website Analytics</h3>
        <button onClick={handleOpen}>Add New Analytics</button>
      </div>
      <div className="product_cards_admin">
        <table id="customers">
          <thead>
            <tr>
              <th style={{ width: "50px" }}>#</th>
              <th>Title</th>
              <th>Script</th>
              <th>Status</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {adminWebsiteAnalyticsData?.map((item, index) => (
              <tr key={index}>
                <td style={{ width: "50px" }}>
                  <strong>{index + 1}</strong>
                </td>
                <td>{item?.title}</td>
                <td>{item?.script}</td>
                <td>
                  {" "}
                  <span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        // checked={productStatus===1?checked:''}
                        name="product_type"
                      />
                      <span className="slider round"></span>
                    </label>
                  </span>
                </td>

                <td>
                  <Edit
                    style={{ color: "lightgray", cursor: "pointer" }}
                    onClick={() => getOneWebsiteAnalyticsDataHandle(item?.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Website Analytics
          </Typography>
          <div
            className="privicypolicyadmin_update"
            style={{ marginTop: "20px" }}
          >
            <form onSubmit={addNewWebsiteAnalyticsHandle}>
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                className="privicypolicyadmin_update_input"
                onChange={(e) => setTitle(e.target.value)}
              />
              <JoditEditor
                className="editor"
                onChange={(newContent) => setDescription(newContent)}
              />
              <button type="submit" style={{ marginTop: "10px" }}>
                Add
              </button>
            </form>
          </div>
        </Box>
      </Modal>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Website Analytics
          </Typography>
          <div
            className="privicypolicyadmin_update"
            style={{ marginTop: "20px" }}
          >
            <form onSubmit={updateWebsiteAnalyticsDataHandle}>
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                value={title}
                className="privicypolicyadmin_update_input"
                onChange={(e) => setTitle(e.target.value)}
              />
              <JoditEditor
                className="editor"
                value={description}
                onChange={(newContent) => setDescription(newContent)}
              />
              <button type="submit" style={{ marginTop: "10px" }}>
                Update
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminWebsiteAnalytics;
