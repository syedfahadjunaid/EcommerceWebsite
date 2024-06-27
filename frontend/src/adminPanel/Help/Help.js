import React, { useEffect, useState } from "react";
import "./Help.css";
import axios from "axios";
import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { Visibility } from "@mui/icons-material";
function Help() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 550,
    bgcolor: "background.paper",
    border: "2px solid transparent",
    boxShadow: 24,
    p: 4,
    outline: "0",
    borderRadius: "5px",
    overflowY: "scroll",
  };
  const token = Cookies.get("adminLogin");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [allHelpData, setAllHelpData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userSubject, setUsersubject] = useState();
  const [userMessage, setUserMessage] = useState();
  const getAllHelpDataHandle = async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/all-contact-us"}`, {
        headers: {
          "Content-type": "multipart/form-date",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setAllHelpData(data && data?.data);
    console.log(data);
  };
  const getSingleHelpDataHandle = async (id) => {
    handleOpen();
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/contact-us/" + id}`, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setUserName(data && data?.data?.name);
    setUserEmail(data && data?.data?.email);
    setUsersubject(data && data?.data?.subject);
    setUserMessage(data && data?.data?.message);

    console.log(data, "single blog");
  };
  useEffect(() => {
    getAllHelpDataHandle();
  }, []);
  return (
    <div className="help">
      <div className="help_heading">
        <h3>Help</h3>
      </div>
      <div className="help_top">
        <div className="help_top_search">
          <span>
            <input type="text" placeholder="Search" />
          </span>
        </div>
        <div className="help_top_table">
          <table id="customers">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allHelpData?.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item?.name}</td>
                  <td>
                    <p>{item?.email}</p>
                  </td>
                  <td>
                    <p>{item?.subject} </p>
                  </td>
                  <td>
                    <p
                      style={{
                        width: "150px",
                        maxHeight: "150px",
                        overflow: "hidden",
                      }}
                    >
                      {item?.message}
                    </p>
                  </td>
                  <td>
                    <Visibility
                      onClick={() => getSingleHelpDataHandle(item?.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form style={{ width: "100%" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              User Name
            </Typography>
            <span className="modal_span">
              <input type="text" value={userName} disabled />
            </span>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              User Email
            </Typography>
            <span className="modal_span">
              <input type="text" value={userEmail} disabled />
            </span>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Subject
            </Typography>
            <span className="modal_span">
              <input type="text" value={userSubject} disabled />
            </span>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Message
            </Typography>
            <span className="modal_span">
              <textarea rows={5} value={userMessage} disabled />
            </span>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Help;
