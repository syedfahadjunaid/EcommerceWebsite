import React, { useEffect, useState } from "react";
import "./payment.css";
import { Box, CircularProgress, Modal } from "@mui/material";
import { addFunctionHandle } from "../apiFunction";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Public } from "@mui/icons-material";
function Payment() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid transprent",
    outline: "0",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [codActive, setCodActive] = useState(true);
  const [razorPayActive, setRazorPayActive] = useState(true);
  const [stripeActive, setStripeActive] = useState(true);
  const [title, setTitle] = useState();
  const [paymentMethodId, setPaymentMethodId] = useState();
  const [enviroment, setEnviroment] = useState();
  const [public_key, setPublic_key] = useState();
  const [productionPublic_key, setProductionPublic_key] = useState();
  const [private_key, setPrivate_key] = useState();
  const [productionPrivate_key, setProductionPrivate_key] = useState();
  const [allPaymentAvalibale, setAllPaymentAvalibale] = useState();
  const [selectedMethod, setSelectedMethod] = useState();
  const [type, setType] = useState();
  const [isLoading, setIsLoading] = useState();
  const codHandle = () => {
    setCodActive(!codActive);
  };
  const razorpayHandle = () => {
    setRazorPayActive(!razorPayActive);
  };
  const stripeHandle = () => {
    setStripeActive(!stripeActive);
  };
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Submitted  Successfully!");
  const token = Cookies.get("adminLogin");
  const getAllPaymentMethodHandle = async () => {
    const { data } = await axios
      .get(
        `${process.env.React_App_Base_Url + "api/admin/Payment-Getway-all"}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setAllPaymentAvalibale(data && data?.PaymentGetaway);

    console.log(data, "all payment");
  };
  const addPayment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", `${title + selectedMethod}`);
    formData.append("public_key", public_key);
    formData.append("client_id", "1");
    formData.append("secret_key", private_key);
    formData.append("production_public_key", productionPublic_key);
    formData.append("production_client_id", "1");
    formData.append("production_secret_key", productionPrivate_key);
    formData.append("status", "1");
    formData.append("type", selectedMethod === "Production" ? 1 : 0);
    const data = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/admin/Payment-Getway-create"}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response, handleClose())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    if (data) {
      notify();
      getAllPaymentMethodHandle();
    }

    console.log(data);
  };
  const getSinglePaymentMethod = async (id) => {
    handleOpen1();
    const { data } = await axios
      .get(
        `${
          process.env.React_App_Base_Url +
          "api/admin/Get-one-Payment-Getway/" +
          id
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
    setPaymentMethodId(data && data?.PaymentGetaway?.id);
    setSelectedMethod(
      data && data?.PaymentGetaway?.type === 1 ? "Production" : "SendBox"
    );
    setPublic_key(data && data?.PaymentGetaway?.public_key);
    setPrivate_key(data && data?.PaymentGetaway?.secret_key);
    setType(data && data?.PaymentGetaway?.type);
    setProductionPublic_key(
      data && data?.PaymentGetaway?.production_public_key
    );
    setProductionPrivate_key(
      data && data?.PaymentGetaway?.production_secret_key
    );
    setTitle(data && data?.PaymentGetaway?.title);
    console.log(data, "single Payment", data?.PaymentGetaway?.id);
  };
  const updateSinglePaymentMethod = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", `${title}`);
    formData.append("public_key", public_key);
    formData.append("client_id", "1");
    formData.append("secret_key", private_key);
    formData.append("production_public_key", productionPublic_key);
    formData.append("production_client_id", "1");
    formData.append("production_secret_key", productionPrivate_key);
    formData.append("status", "1");
    formData.append("type", selectedMethod === "Production" ? 1 : 0);
    const data = await axios
      .post(
        `${
          process.env.React_App_Base_Url +
          "api/admin/Payment-Getway-update/" +
          paymentMethodId
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
      getAllPaymentMethodHandle();
    }
    if (!data) {
      notify1();
    }
    console.log(data);
  };
  useEffect(() => {
    getAllPaymentMethodHandle();
  }, []);
  return (
    <div className="payment">
      <div className="payment_heading">
        <h3>Payment</h3>
        <>
          <button className="add_button_admin" onClick={handleOpen}>
            Add New Payment Method
          </button>
        </>
      </div>
      <div className="payment_table">
        <p>PAYMENTS Option</p>
        <table id="customers">
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>COD</td>
            <td onClick={codHandle}>
              <span
                className={
                  codActive
                    ? "payment_table_span"
                    : "payment_table_span_deactive"
                }
              >
                {codActive ? "Active" : "Deactive"}
              </span>{" "}
            </td>
            <td></td>
          </tr>
          {allPaymentAvalibale?.map((item, index) => (
            <tr>
              <td>{item?.title}</td>
              <td onClick={razorpayHandle}>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={item?.status === 1 ? true : false}
                    // checked={productStatus===1?checked:''}
                    name="product_type"
                  />
                  <span className="slider round"></span>
                </label>
              </td>
              <td onClick={() => [getSinglePaymentMethod(item?.id)]}>
                <p className="payment_view_button">View</p>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="subcategories_modal">
          <form onSubmit={addPayment}>
            <p style={{ marginBottom: "10px" }}>ENVIRONMENT</p>
            <select
              onChange={(e) => setSelectedMethod(e.target.value)}
              required
            >
              <option>Select</option>
              <option value="Production">Production</option>
              <option value="SendBox">SendBox</option>
            </select>

            <input
              type="text"
              placeholder="Title"
              className="input_full_width"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {selectedMethod === "SendBox" && (
              <div className="subcategories_modal_div">
                <div className="subcategories_modal_div_left">
                  <p style={{ marginBottom: "4px" }}> PUBLIC KEY</p>
                  <span>
                    <input
                      type="text"
                      placeholder="rzp_test_4r8y0wDMkrUDFn"
                      onChange={(e) => setPrivate_key(e.target.value)}
                      required
                    />
                  </span>
                </div>
                <div className="subcategories_modal_div_right">
                  <p style={{ marginBottom: "4px" }}> SECRET KEY</p>
                  <span>
                    <input
                      type="text"
                      placeholder="rzp_test_4r8y0wDMkrUDFn"
                      onChange={(e) => setPublic_key(e.target.value)}
                      required
                    />
                  </span>
                </div>
              </div>
            )}
            {selectedMethod === "Production" && (
              <div className="subcategories_modal_div">
                <div className="subcategories_modal_div_left">
                  <p style={{ marginBottom: "4px" }}>PRODUCTION PUBLIC KEY</p>
                  <span>
                    <input
                      type="text"
                      placeholder="rzp_test_4r8y0wDMkrUDFn"
                      onChange={(e) => setProductionPublic_key(e.target.value)}
                      required
                    />
                  </span>
                </div>
                <div className="subcategories_modal_div_right">
                  <p style={{ marginBottom: "4px" }}>PRODUCTION SECRET KEY</p>
                  <span>
                    <input
                      type="text"
                      placeholder="rzp_test_4r8y0wDMkrUDFn"
                      onChange={(e) => setProductionPrivate_key(e.target.value)}
                      required
                    />
                  </span>
                </div>
              </div>
            )}
            <span className="subcategories_modal_span">
              <button onClick={handleClose}>Cancel</button>
              <button>Add Payment Method</button>
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
        <Box sx={style} className="subcategories_modal">
          <form onSubmit={updateSinglePaymentMethod}>
            <p style={{ marginBottom: "10px" }}>ENVIRONMENT</p>
            <select
              value={type === 1 ? "Production" : "SendBox"}
              onChange={(e) => setSelectedMethod(e.target.value)}
              required
            >
              <option>Select</option>
              <option value="Production">Production</option>
              <option value="SendBox">SendBox</option>
            </select>

            <input
              type="text"
              placeholder="Title"
              className="input_full_width"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {selectedMethod === "SendBox" && (
              <div className="subcategories_modal_div">
                <div className="subcategories_modal_div_left">
                  <p style={{ marginBottom: "4px" }}> PUBLIC KEY</p>
                  <span>
                    <input
                      type="text"
                      placeholder="rzp_test_4r8y0wDMkrUDFn"
                      value={public_key}
                      onChange={(e) => setPrivate_key(e.target.value)}
                      required
                    />
                  </span>
                </div>
                <div className="subcategories_modal_div_right">
                  <p style={{ marginBottom: "4px" }}> SECRET KEY</p>
                  <span>
                    <input
                      type="text"
                      placeholder="rzp_test_4r8y0wDMkrUDFn"
                      value={private_key}
                      onChange={(e) => setPublic_key(e.target.value)}
                      required
                    />
                  </span>
                </div>
              </div>
            )}
            {selectedMethod === "Production" && (
              <div className="subcategories_modal_div">
                <div className="subcategories_modal_div_left">
                  <p style={{ marginBottom: "4px" }}>PRODUCTION PUBLIC KEY</p>
                  <span>
                    <input
                      type="text"
                      placeholder="rzp_test_4r8y0wDMkrUDFn"
                      value={productionPublic_key}
                      onChange={(e) => setProductionPublic_key(e.target.value)}
                      required
                    />
                  </span>
                </div>
                <div className="subcategories_modal_div_right">
                  <p style={{ marginBottom: "4px" }}>PRODUCTION SECRET KEY</p>
                  <span>
                    <input
                      type="text"
                      placeholder="rzp_test_4r8y0wDMkrUDFn"
                      value={productionPrivate_key}
                      onChange={(e) => setProductionPrivate_key(e.target.value)}
                      required
                    />
                  </span>
                </div>
              </div>
            )}
            <span
              className="subcategories_modal_span"
              style={{ marginTop: "10px" }}
            >
              <button onClick={handleClose1}>Cancel</button>
              <button>Update</button>
            </span>
          </form>
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

export default Payment;
