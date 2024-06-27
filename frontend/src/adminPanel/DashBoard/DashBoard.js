import React, { useState } from "react";
import "./DashBoard.css";
import {
  Cancel,
  KeyboardReturn,
  LocalMall,
  Paid,
  Shop2,
  Timeline,
} from "@mui/icons-material";
import { VictoryBar, VictoryChart, VictoryPie } from "victory";
import { Backdrop, Fade, Modal, Box } from "@mui/material";

function DashBoard() {
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
    borderRadius: "4px",
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="dashboard">
      <div className="dashboard_heading">
        <h3>Dashboard</h3>
      </div>
      <div className="dashboard_cards">
        <div className="dashboard_cards_card">
          <span className="dashboard_cards_card_icon">
            <Paid style={{ color: "#0D6EFD", fontSize: "35px" }} />
          </span>
          <span>
            <p>Total Sale</p>
            <strong>₹20,000</strong>
          </span>
        </div>{" "}
        <div className="dashboard_cards_card">
          <span
            className="dashboard_cards_card_icon "
            style={{ backgroundColor: "#D1E7DD" }}
          >
            <Shop2 style={{ color: "#198754", fontSize: "35px" }} />
          </span>

          <span>
            <p>Total Orders</p>
            <strong>200</strong>
          </span>
        </div>{" "}
        <div className="dashboard_cards_card">
          <span
            className="dashboard_cards_card_icon "
            style={{ backgroundColor: "#FFF3CD" }}
          >
            <LocalMall style={{ color: "#FFC107", fontSize: "35px" }} />
          </span>
          <span>
            <p>Total Products</p>
            <strong>700</strong>
          </span>
        </div>
      </div>
      <div className="dashboard_cards">
        <div className="dashboard_cards_card">
          <span className="dashboard_cards_card_icon">
            <KeyboardReturn style={{ color: "#0D6EFD", fontSize: "35px" }} />
          </span>
          <span>
            <p>Total Return</p>
            <strong>30</strong>
          </span>
        </div>{" "}
        <div className="dashboard_cards_card">
          <span
            className="dashboard_cards_card_icon "
            style={{ backgroundColor: "#D1E7DD" }}
          >
            <Cancel style={{ color: "#198754", fontSize: "35px" }} />
          </span>

          <span>
            <p>Total Cancelled Orders</p>
            <strong>20</strong>
          </span>
        </div>{" "}
        <div className="dashboard_cards_card">
          <span
            className="dashboard_cards_card_icon "
            style={{ backgroundColor: "#FFF3CD" }}
          >
            <Timeline style={{ color: "#FFC107", fontSize: "35px" }} />
          </span>
          <span>
            <p>Your balance</p>
            <strong>₹7,000</strong>
          </span>
        </div>
      </div>
      <div className="dashboard_charts">
        <div className="dashboard_charts_sale">
          <p>Sale Statistics</p>
          <VictoryChart domainPadding={25}>
            <VictoryBar
              categories={{
                x: ["men's", "women's", "electronic", "appliance", "mobile"],
              }}
              data={[
                { x: "men's", y: 1 },
                { x: "women's", y: 2 },
                { x: "electronic", y: 3 },
                { x: "appliance", y: 2 },
                { x: "mobile", y: 1 },
              ]}
            />
          </VictoryChart>
        </div>
        <div className="dashboard_charts_product">
          <p>Products Statistics</p>
          <VictoryPie
            data={[
              { x: "Mobile", y: 35 },
              { x: "Electronic", y: 40 },
              { x: "Tv", y: 55 },
            ]}
          />
        </div>
      </div>
      <div className="dashboard_latest_order">
        <div className="dashboard_latest_order_heading">
          <p>Latest orders</p>
        </div>
        <div className="dashboard_latest_order_table">
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
              </tr>{" "}
              <tr>
                <td style={{ width: "50px" }}>2</td>
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
              </tr>{" "}
              <tr>
                <td style={{ width: "50px" }}>3</td>
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
              </tr>{" "}
              <tr>
                <td style={{ width: "50px" }}>4</td>
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
              </tr>{" "}
              <tr>
                <td style={{ width: "50px" }}>5</td>
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
              </tr>{" "}
              <tr>
                <td style={{ width: "50px" }}>6</td>
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
              </tr>{" "}
              <tr>
                <td style={{ width: "50px" }}>7</td>
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
                  <p style={{ marginBottom: "3px", marginTop: "3px" }}>
                    Invoice <span>#15451</span>
                  </p>
                  <p style={{ marginBottom: "3px", marginTop: "3px" }}>
                    Order Date <span>20,May,2023</span>
                  </p>
                  <p style={{ marginBottom: "3px", marginTop: "3px" }}>
                    Lucknow
                  </p>
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

export default DashBoard;
