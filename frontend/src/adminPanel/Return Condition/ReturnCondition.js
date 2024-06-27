import React, { useEffect, useState } from "react";
import "./ReturnCondition.css";
import { CircularProgress, Modal, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function ReturnCondition() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid transprent",
    outline: "0",
    boxShadow: 24,
    p: 4,
  };
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Submitted  Successfully!");
  const token = Cookies.get("adminLogin");
  const [isLoading, setIsLoading] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [addReturnConditionId, setAddReturnConditionId] = useState();
  const [addReturnConditionTitle, setAddReturnConditionTitle] = useState();
  const [allReturnCondition, setAllReturnCondition] = useState();
  const getAllReturnConditionHandle = async () => {
    const { data } = await axios
      .get(
        `${process.env.React_App_Base_Url + "api/admin/all-ReturnCondition"}`,
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
    setAllReturnCondition(data && data?.data);
    console.log(data);
  };
  const addReturnConditionHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", addReturnConditionTitle);
    const { data } = await axios
      .post(
        `${
          process.env.React_App_Base_Url + "api/admin/ReturnCondition-create"
        }`,
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
      getAllReturnConditionHandle();
    }
    if (!data) {
      notify1();
    }

    console.log(data, "return condition");
  };
  const getSingleReturnConditionHandle = async (id) => {
    const { data } = await axios
      .get(
        `${
          process.env.React_App_Base_Url +
          "api/admin/Get-one-ReturnCondition/" +
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
    setAddReturnConditionTitle(data && data?.data?.title);
    setAddReturnConditionId(data && data?.data?.id);

    console.log(data, "single blog");
  };
  const updateSingleReturnConditionHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", addReturnConditionTitle);

    const data = await axios
      .post(
        `${
          process.env.React_App_Base_Url +
          "api/admin/ReturnCondition-update/" +
          addReturnConditionId
        }`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-date",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response, setIsLoading(true), handleClose2())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    if (data) {
      notify();
      getAllReturnConditionHandle();
    }
    if (!data) {
      notify1();
    }
    console.log(data);
  };
  const deleteReturnConditionHandle = () => async () => {
    const data = await axios
      .delete(`${process.env.React_App_Base_Url + ""}`, {
        headers: { "Content-type": "multipart/form-date" },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    getAllReturnConditionHandle();
  }, []);
  return (
    <div className="returnCondition">
      <div className="returnCondition_header">
        <p> RETURN CONDITIONS</p>
      </div>
      <div className="returnCondition_top">
        <div className="returnCondition_top_search">
          <span>
            <input type="text" placeholder="Search" />
          </span>
          <button onClick={handleOpen}>Add a Condition</button>
        </div>
        <div className="returnCondition_top_table">
          <table id="customers">
            <thead>
              <tr>
                <th style={{ width: "100px" }}>#</th>
                <th>Return Conditions</th>
                <th style={{ width: "100px" }}> Action</th>
              </tr>
            </thead>
            <tbody>
              {allReturnCondition?.map((item, index) => (
                <tr>
                  <td style={{ width: "100px" }}>{index + 1}</td>
                  <td>{item?.title}</td>
                  <td style={{ width: "100px" }}>
                    <Edit
                      className="returnCondition_top_table_delete"
                      onClick={() => [
                        handleOpen2(),
                        getSingleReturnConditionHandle(item?.id),
                      ]}
                    />
                    <Delete
                      className="returnCondition_top_table_delete"
                      onClick={handleOpen1}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={addReturnConditionHandle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              RETURN CONDITIONS
            </Typography>
            <span className="modal_box_span">
              <input
                type="text"
                placeholder="type here"
                onChange={(e) => setAddReturnConditionTitle(e.target.value)}
              />
            </span>
            <span className="modal_box_span1">
              <button>Add</button>
            </span>
          </form>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={updateSingleReturnConditionHandle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              RETURN CONDITIONS
            </Typography>
            <span className="modal_box_span">
              <input
                type="text"
                placeholder="type here"
                value={addReturnConditionTitle}
                onChange={(e) => setAddReturnConditionTitle(e.target.value)}
              />
            </span>
            <span className="modal_box_span1">
              <button>Update</button>
            </span>
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
            Are You Sure?
          </Typography>
          <span className="modal_box_span1">
            <button
              style={{ background: "tomato", marginRight: "10px" }}
              onClick={handleClose1}
            >
              No
            </button>
            <button>Yes</button>
          </span>
        </Box>
      </Modal>
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default ReturnCondition;
