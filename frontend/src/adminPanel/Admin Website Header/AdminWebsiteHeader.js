import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import "./AdminWebsiteHeader.css";
import React, { useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import { json } from "react-router-dom";
import { toast } from "react-toastify";

function AdminWebsiteHeader() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: "550px",
    bgcolor: "background.paper",
    border: "2px solid transparent",
    boxShadow: 24,
    p: 4,
    outline: "0px",
    borderRadius: "5px",
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
  const notify1 = () => toast.warn("Something Went Wrong");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [headerTitle, setHeaderTitle] = useState();
  const [headerLink, setHeaderLink] = useState("");
  const [headerData, setHeaderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allHeaderData, setAllHeaderData] = useState();
  const token = Cookies.get("adminLogin");
  const addInputHandle = (e) => {
    e.preventDefault();
    setHeaderData([...headerData, { title: "", sub_header_link: "" }]);
  };
  const removeInputHandle = (e, index) => {
    e.preventDefault();
    const newArray = [...headerData];
    newArray.splice(index, 1);
    setHeaderData(newArray);
    console.log(newArray);
  };
  const handleValueChange = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...headerData];
    onChangeValue[index][name] = value;
    setHeaderData(onChangeValue);
  };
  const getHeaderDataHandle = async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/header"}`, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setAllHeaderData(data && data?.data);
    console.log(data?.data);
  };
  const handleHeaderSubmitHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", headerTitle);
    formData.append("link", headerLink != "" ? headerLink : null);
    // formData.append("sub_header", headerData);
    // headerData.forEach((item) => {
    //   console.log(item, "item");
    //   formData.append("sub_header[]", item);
    // });
    // headerData.forEach((item, index) => {
    //   const jsonString = JSON.stringify(item);

    //   formData.append(`sub_header[]`, jsonString);
    // });
    // headerData.forEach((obj, index) => {
    //   Object.keys(obj).forEach((key) => {
    //     formData.append(`sub_header${index}_${key}`, obj[key]);
    //   });
    // });
    formData.append("sub_header", JSON.stringify(headerData));

    const { data } = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/admin/header/create"}`,
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
      getHeaderDataHandle();
    }
    if (!data) {
      notify1();
    }
    setHeaderTitle();
    setHeaderLink("");
    setHeaderData([]);
    console.log(data);
  };
  useEffect(() => {
    getHeaderDataHandle();
  }, []);
  return (
    <div className="admincoupan">
      <div className="product_heading">
        <h3>Website Header</h3>
        <button onClick={handleOpen}>Add New Header</button>
      </div>
      <div className="addbanner_top">
        <table id="customers">
          <thead>
            <tr>
              <th>#</th>

              <th>Header Title</th>
              <th>Header Link</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allHeaderData?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{item?.title}</td>
                <td>
                  <p style={{ width: "200px", overflow: "hidden" }}>
                    {item?.link}
                  </p>
                </td>

                <td>
                  <Edit
                    style={{ color: "lightgrey", cursor: "pointer" }}
                    onClick={() => handleOpen1()}
                  />
                  <Delete
                    style={{ color: "rgb(255, 141, 96)", cursor: "pointer" }}
                    onClick={() => handleOpen2()}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Header
          </Typography>
          <form className="modal_form" onSubmit={handleHeaderSubmitHandle}>
            <p>Header</p>
            <span>
              <input
                type="text"
                placeholder="Header"
                name="headerTitle"
                onChange={(event) => setHeaderTitle(event.target.value)}
                required
              />
            </span>
            <span>
              <input
                type="text"
                placeholder="Header Link"
                name="headerLink"
                onChange={(event) => setHeaderLink(event.target.value)}
              />
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                border: "transparent",
              }}
            >
              {headerLink === "" ? (
                <button className="submit_button" onClick={addInputHandle}>
                  Add Sub Header
                </button>
              ) : (
                <button
                  className="submit_button"
                  onClick={addInputHandle}
                  style={{ cursor: "not-allowed" }}
                  disabled
                >
                  Add Sub Header
                </button>
              )}
            </span>
            {headerData?.map((item, index) => (
              <div className="modal_sub_header_div">
                <input
                  type="text"
                  placeholder="Sub Header Title"
                  name="title"
                  required
                  onChange={(event) => handleValueChange(event, index)}
                />
                <input
                  type="text"
                  placeholder="Sub Header Link"
                  name="sub_header_link"
                  required
                  onChange={(event) => handleValueChange(event, index)}
                />
                <button onClick={removeInputHandle}>Delete</button>
              </div>
            ))}
            <button type="submit" className="submit_button">
              Submit
            </button>
          </form>
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
            Add New Header
          </Typography>
          <form className="modal_form" onSubmit={handleHeaderSubmitHandle}>
            <p>Header</p>
            <span>
              <input
                type="text"
                placeholder="Header"
                name="headerTitle"
                onChange={(event) => setHeaderTitle(event.target.value)}
                required
              />
            </span>
            <span>
              <input
                type="text"
                placeholder="Header Link"
                name="headerLink"
                onChange={(event) => setHeaderLink(event.target.value)}
              />
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                border: "transparent",
              }}
            >
              <button className="submit_button" onClick={addInputHandle}>
                Add Sub Header
              </button>
            </span>
            {headerData?.map((item, index) => (
              <div className="modal_sub_header_div">
                <input
                  type="text"
                  placeholder="Sub Header Title"
                  name="title"
                  onChange={(event) => handleValueChange(event, index)}
                />
                <input
                  type="text"
                  placeholder="Sub Header Link"
                  name="link"
                  onChange={(event) => handleValueChange(event, index)}
                />
                <button onClick={removeInputHandle}>Delete</button>
              </div>
            ))}
            <button type="submit" className="submit_button">
              Submit
            </button>
          </form>
        </Box>
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
          <Box sx={style1} className="modal_class">
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
              <button style={{ cursor: "pointer" }}>Yes</button>
            </span>
          </Box>
        </Fade>
      </Modal>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default AdminWebsiteHeader;
