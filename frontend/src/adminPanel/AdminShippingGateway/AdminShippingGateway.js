import { Delete, Edit } from "@mui/icons-material";
import { Box, Modal, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AdminShippingGateway() {
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
    outline: "transparent",
    borderRadius: "5px",
  };
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Something Went Wrong");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState();
  const [apiKey, setApiKey] = useState();
  const [secureKey, setSecureKey] = useState();
  const [gatewayId, setGatewayId] = useState();
  const token = Cookies.get("adminLogin");
  const [gatewayData, setGatewayData] = useState();
  const getAllShippingGatewayDataHandle = async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/shipping"}`, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setGatewayData(data && data?.data);
    console.log(data);
  };
  const shippingGatewayAddHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("public_key", apiKey);
    formData.append("scoure_key", secureKey);
    formData.append("status", 1);
    const { data } = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/admin/shipping/create"}`,
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
      getAllShippingGatewayDataHandle();
    }
    if (!data) {
      notify1();
    }

    console.log(data);
  };
  const getOneShippingGatewayHandle = async (id) => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/shipping/" + id}`, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setTitle(data && data?.data?.title);
    setApiKey(data && data?.data?.public_key);
    setSecureKey(data && data?.data?.scoure_key);
    setGatewayId(data && data?.data?.id);

    console.log(data, "single blog");
  };
  const updateOneGatewayHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("public_key", apiKey);
    formData.append("scoure_key", secureKey);
    formData.append("status", 1);
    const { data } = await axios
      .post(
        `${
          process.env.React_App_Base_Url +
          "api/admin/shipping/update/" +
          gatewayId
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
      getAllShippingGatewayDataHandle();
    }
    if (!data) {
      notify1();
    }
    console.log(data);
  };
  const deleteOneGatewayHandle = async () => {
    const data = await axios
      .delete(`${process.env.React_App_Base_Url + "api/admin/" + gatewayId}`, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    getAllShippingGatewayDataHandle();
  }, []);

  return (
    <div className="admincoupan">
      <div className="product_heading">
        <h3>Shipping Gateway</h3>
        <button onClick={handleOpen}>Add New Shipping Gateway</button>
      </div>
      <div className="addbanner_top">
        <table id="customers">
          <thead>
            <tr>
              <th>#</th>

              <th>Title</th>
              <th>Api Key</th>
              <th>Secure Key</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {gatewayData?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{item?.title}</td>

                <td>
                  <p style={{ width: "200px", overflow: "hidden" }}>
                    {item?.public_key}
                  </p>
                </td>

                <td>{item?.scoure_key}</td>

                <td>
                  <Edit
                    style={{ color: "lightgrey", cursor: "pointer" }}
                    onClick={() => [
                      getOneShippingGatewayHandle(item?.id),
                      handleOpen1(),
                    ]}
                  />
                  <Delete
                    style={{ color: "rgb(255, 141, 96)", cursor: "pointer" }}
                    //   onClick={() => handleOpen2()}
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
            Shipping Gateway
          </Typography>
          <form className="modal_form" onSubmit={shippingGatewayAddHandle}>
            <p>Title</p>
            <span>
              <input
                type="text"
                placeholder="Title"
                name="Title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </span>
            <p>Api Key</p>
            <span>
              <input
                type="text"
                placeholder="Api Key"
                name="ApiKey"
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
            </span>
            <p>Secure Key</p>
            <span>
              <input
                type="text"
                placeholder="Secure Key"
                onChange={(e) => setSecureKey(e.target.value)}
                name="SecureKey"
              />
            </span>
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
            Shipping Gateway
          </Typography>
          <form className="modal_form" onSubmit={updateOneGatewayHandle}>
            <p>Title</p>
            <span>
              <input
                type="text"
                placeholder="Title"
                name="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </span>
            <p>Api Key</p>
            <span>
              <input
                type="text"
                placeholder="Api Key"
                name="ApiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
            </span>
            <p>Secure Key</p>
            <span>
              <input
                type="text"
                placeholder="Secure Key"
                name="SecureKey"
                value={secureKey}
                onChange={(e) => setSecureKey(e.target.value)}
                required
              />
            </span>
            <button type="submit" className="submit_button">
              Update
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminShippingGateway;
