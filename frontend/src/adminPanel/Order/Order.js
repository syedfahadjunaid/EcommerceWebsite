import React, { useState } from "react";
import "./Order.css";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import img from "../../Images/1.jpg";
function Order() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    bgcolor: "background.paper",
    border: "2px solid #fff",
    outline: "0",
    boxShadow: 24,
    borderRadius:'4px',
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="order">
      <div className="order_heading">
        <h3>Orders</h3>
      </div>
      <div className="order_top">
        <div className="order_top_search">
          <span className="order_top_search_span_input">
            <input type="text" placeholder="Search" />
          </span>

          <span className="order_top_search_span_select">
            <select name="status">
              <option>Status</option>
              <option>Active</option>
              <option>Disable</option>
              <option>Show All</option>
            </select>
          </span>
        </div>
        <div className="order_top_table">
          <table id="customers">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>#</th>
                <th>Order ID</th>
                <th>Number of products</th>
                <th>Customer</th>
                <th>Order total</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "50px" }}>1</td>
                <td>5IHAHZXO3B</td>
                <td>
                  <p>5</p>
                </td>
                <td>
                  <p>raj pandta</p>
                </td>
                <td>
                  <p>999</p>
                </td>
                <td>22/05/2023</td>
                <td>
                  <p className="payment_view_button" onClick={handleOpen}>
                    View
                  </p>
                </td>
              </tr>  
              <tr>
                <td style={{ width: "50px" }}>1</td>
                <td>5IHAHZXO3B</td>
                <td>
                  <p>5</p>
                </td>
                <td>
                  <p>raj pandta</p>
                </td>
                <td>
                  <p>999</p>
                </td>
                <td>22/05/2023</td>
                <td>
                  <p className="payment_view_button" onClick={handleOpen}>
                    View
                  </p>
                </td>
              </tr>  
              <tr>
                <td style={{ width: "50px" }}>1</td>
                <td>5IHAHZXO3B</td>
                <td>
                  <p>5</p>
                </td>
                <td>
                  <p>raj pandta</p>
                </td>
                <td>
                  <p>999</p>
                </td>
                <td>22/05/2023</td>
                <td>
                  <p className="payment_view_button" onClick={handleOpen}>
                    View
                  </p>
                </td>
              </tr>
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
          <Box sx={style}>
            <div className="orderModal">
              <div className="orderModal_top">
                <div className="orderModal_top_left">
                  <h3>Order Details</h3>
                  <p style={{marginBottom:"3px",marginTop:'3px'}}>
                    Invoice <span>#15451</span>
                  </p>
                  <p style={{marginBottom:"3px",marginTop:'3px'}}>
                    Order Date <span>20,May,2023</span>
                  </p>
                  <p style={{marginBottom:"3px",marginTop:'3px'}}>Lucknow</p>
                </div>
              </div>
              <div className="orderModalMiddle">
                <div className="orderModalMiddle_left">
                  <h3>Customer Info</h3>
                  <span>
                    <p>Name:</p>
                    <p>Fahad </p>
                  </span>
                  <span>
                    <p>Gmail:</p>
                    <p>armanal3066@gmail.com </p>
                  </span>
                  <span>
                    <p>Phone:</p>
                    <p>+91 88089050502 </p>
                  </span>
                </div>
                <div className="orderModalMiddle_right">
                  <div className="orderModalMiddle_right_left">
                    <h5>Shipping Address</h5>
                    <p>hazaratganj, Lucknow</p>
                  </div>
                  <div className="orderModalMiddle_right_right">
                    <h5>Billing Address</h5>
                    <p>hazaratganj, Lucknow</p>
                  </div>
                </div>
              </div>
              <div className="orderModal_bottom">
                <table id="customers">
                  <thead>
                    <tr>
                      <th style={{ width: "50px" }}>#</th>
                      <th>Product</th>
                      <th>Unit Price</th>
                      <th>Gst</th>
                      <th>Qty</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ width: "50px" }}>1</td>
                      <td>Product1</td>
                      <td>
                        <p>₹200</p>
                      </td>
                      <td>
                        <p>₹30</p>
                      </td>
                      <td>
                        <p>2</p>
                      </td>
                      <td>430</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="orderModal_payment_method">
              <table id="customers">
                  <thead>
                    <tr>
                    
                      <th>Payment Method</th>
                      <th>Sub Total</th>
                      <th>Shipping Cost</th>
                      <th>Grand Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                      <td>COD</td>
                      <td>
                        <p>₹4000</p>
                      </td>
                      <td>
                        <p>₹80</p>
                      </td>
                      <td>
                        <p>₹4080</p>
                      </td>
                     
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default Order;
