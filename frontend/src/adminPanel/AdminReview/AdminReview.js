import React, { useEffect, useState } from "react";
import "./AdminReview.css";
import { Delete, Edit } from "@mui/icons-material";
import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
function AdminReview() {
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
  const token = Cookies.get("adminLogin");
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allReview, setAllReview] = useState();
  const getAllReviewHandle = async () => {
    const { data } = await axios
      .get(
        `${
          process.env.React_App_Base_Url + "api/admin/Productreview-all-banner"
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
    setAllReview(data && data?.data);
    console.log(data, "admin review");
  };
  useEffect(() => {
    getAllReviewHandle();
  }, []);
  return (
    <div className="product">
      <div className="product_heading">
        <h3>Review Table</h3>
      </div>
      <div className="product_product">
        <table id="customers">
          <thead>
            <tr>
              <th style={{ width: "40px" }}>#</th>
              <th style={{ width: "120px" }}>Product Category</th>
              <th style={{ width: "120px" }}>Product Title</th>
              <th>Product Review</th>
              <th style={{ width: "120px" }}>Product Rating</th>
              <th style={{ width: "120px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {allReview?.map(() => (
              <tr>
                <td style={{ width: "40px" }}>1</td>
                <td style={{ width: "120px" }}>Men's Wear</td>
                <td style={{ width: "40px" }}> Title</td>
                <td>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Dolorem quidem molestiae quo, voluptatum ipsam possimus. Eum
                    magnam quaerat quasi quos! Nobis ex recusandae magnam
                    praesentium atque saepe repellendus nesciunt nisi!
                  </p>
                </td>
                <td style={{ width: "120px" }}>4.5/5</td>
                <td style={{ width: "120px" }}>
                  <Delete
                    style={{ color: "rgb(255, 141, 96)", cursor: "pointer" }}
                    onClick={handleOpen1}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default AdminReview;
