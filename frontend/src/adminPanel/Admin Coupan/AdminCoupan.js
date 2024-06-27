import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import "./AdminCoupan.css";
import { Delete, Edit } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
function AdminCoupan() {
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
    height: "550px",
    overflowY: "scroll",
  };
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Submitted  Successfully!");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setCategoryId();
    setSubCategoryId();
    setInnerSubCategoryId();
    setSelectedOption();
  };
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [isLoading, setIsLoading] = useState();
  const [allCoupons, setAllCoupons] = useState();
  const [couponCode, setCouponCode] = useState();
  const [discountAmount, setDiscountAmount] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndtDate] = useState();
  const [allCategory, setAllCategory] = useState();
  const [allSubCategory, setAllSubCategory] = useState();
  const [allInnerSubCategory, setAllInnerSubCategory] = useState();
  const [allProduct, setAllProduct] = useState();
  const [categoryId, setCategoryId] = useState();
  const [subCategoryId, setSubCategoryId] = useState();
  const [innerSubCategoryId, setInnerSubCategoryId] = useState();
  const [productId, setProductId] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [filteredProduct, setFilteredProduct] = useState();
  const [couponsId, setCouponsId] = useState();
  const token = Cookies.get("adminLogin");
  const getAllCategoryHandle = async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/category"}`, {
        headers: {
          "Content-type": "multipart/form-date",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setAllCategory(data && data?.list);
    // console.log(data, "cat");
  };
  const getAllSubCategoryHandle = async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/subcategory"}`, {
        headers: {
          "Content-type": "multipart/form-date",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setAllSubCategory(data && data?.list);
    // console.log(data, "sub cat");
  };
  const getAllInnerSubCategoryHandle = async () => {
    const { data } = await axios
      .get(
        `${process.env.React_App_Base_Url + "api/admin/all-InnerSubCategory"}`,
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
    setAllInnerSubCategory(data && data?.data);
    // console.log(data, "inner sub cat");
  };
  const getAllProductHandle = async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/product"}`, {
        headers: {
          "Content-type": "multipart/form-date",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response, setIsLoading(true), handleClose())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setAllProduct(data && data?.list);
    // console.log(data, "product");
  };
  const getAllCouponsHandle = useCallback(async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/all-Coupans"}`, {
        headers: {
          "Content-type": "multipart/form-date",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setAllCoupons(data && data?.coupans);
    // console.log(data);
  }, []);
  const addCouponsHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("coupan_code", couponCode);
    formData.append("discount", discountAmount);
    formData.append("categories_id", categoryId ? categoryId : "");
    formData.append("sub_categories_id", subCategoryId ? subCategoryId : "");
    formData.append(
      "inner_subcategories_id",
      innerSubCategoryId ? innerSubCategoryId : ""
    );
    formData.append("product_id", productId);
    formData.append(
      "new_user",
      selectedOption === "new user" ? "new user" : ""
    );
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("status", 1);
    const { data } = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/admin/Coupans-create"}`,
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
      getAllCouponsHandle();
    }
    if (!data) {
      notify1();
    }
    // console.log(data, "add coupon");
  };
  const searchProductWithSkuCodeHandle = () => {
    const filter = allProduct?.filter((item) => {
      if (selectedProduct !== "") {
        return item?.sku?.toLowerCase().includes(selectedProduct.toLowerCase());
      }
    });
    setFilteredProduct(filter && filter);
    console.log(filter, "filter");
  };
  const getSingleCouponGandle = async (id) => {
    const { data } = await axios
      .get(
        `${process.env.React_App_Base_Url + "api/admin/Get-one-Coupans/" + id}`,
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
    setCouponCode(data && data?.data?.coupan_code);
    setDiscountAmount(data && data?.data?.discount);
    setStartDate(data && data?.data?.start_date);
    setEndtDate(data && data?.data?.end_date);
    setCouponsId(data && data?.data?.id);
    setProductId(data && data?.data?.product_id);
    setCategoryId(data && data?.data?.categories_id);
    setSubCategoryId(data && data?.data?.sub_categories_id);
    setInnerSubCategoryId(data && data?.data?.inner_subcategories_id);
    // console.log(data, "single blog");
  };
  const updateSingleCouponsHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("coupan_code", couponCode);
    formData.append("discount", discountAmount);
    formData.append("categories_id", categoryId ? categoryId : "");
    formData.append("sub_categories_id", subCategoryId ? subCategoryId : "");
    formData.append(
      "inner_subcategories_id",
      innerSubCategoryId ? innerSubCategoryId : ""
    );
    formData.append("product_id", productId);
    formData.append(
      "new_user",
      selectedOption === "new user" ? "new user" : ""
    );
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("status", 1);
    const data = await axios
      .post(
        `${
          process.env.React_App_Base_Url +
          "api/admin/Coupans-update/" +
          couponsId
        }`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-date",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response, setIsLoading(true),handleClose1())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
      if(data){
        notify()
        getAllCouponsHandle()
      }
      if(!data){
        notify1()
      }
    // console.log(data);
  };
  useEffect(() => {
    getAllCouponsHandle();
    getAllCategoryHandle();
    getAllSubCategoryHandle();
    getAllInnerSubCategoryHandle();
    getAllProductHandle();
  }, []);
  useEffect(() => {
    searchProductWithSkuCodeHandle();
  }, [selectedProduct]);

  return (
    <div className="admincoupan">
      <div className="product_heading">
        <h3>Coupons</h3>
        <button onClick={handleOpen}>Add New Coupon</button>
      </div>
      <div className="product_cards_admin">
        <table id="customers">
          <thead>
            <tr>
              <th style={{ width: "50px" }}>#</th>
              <th>Coupon Code</th>
              <th>Discount</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allCoupons?.map((item, index) => (
              <tr key={index}>
                <td style={{ width: "50px" }}>
                  <strong>{index + 1}</strong>
                </td>
                <td>{item?.coupan_code}</td>
                <td>
                  <p>{item?.discount}</p>
                </td>
                <td>
                  <p>{item?.start_date}</p>
                </td>
                <td>
                  <p>{item?.end_date}</p>
                </td>
                <td>
                  <Edit
                    style={{ color: "lightgray", cursor: "pointer" }}
                    onClick={() => [
                      handleOpen1(),
                      getSingleCouponGandle(item?.id),
                    ]}
                  />
                  <Delete
                    style={{ color: "#FF8D60", cursor: "pointer" }}
                    onClick={handleOpen2}
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
            <form onSubmit={addCouponsHandle}>
              <div className="admincoupanmodal">
                <p>Select One</p>
                <span>
                  <select
                    onChange={(e) => setSelectedOption(e.target.value)}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    <option value="">Select One Option</option>
                    <option value="new user">New User</option>
                    <option value="single Product">Select Product</option>
                    <option value="category">Select Category</option>
                    <option value="sub category">Select Sub Category</option>
                    <option value="inner Sub Category">
                      Select Inner Sub Category
                    </option>
                  </select>
                </span>
                {selectedOption === "single Product" && (
                  <div className="admincoupanmodal">
                    <span>
                      <input
                        type="text"
                        placeholder="Search by Product Sku Code"
                        onChange={(e) => setSelectedProduct(e.target.value)}
                      />
                    </span>
                    <span>
                      <select onChange={(e) => setProductId(e.target.value)}>
                        <option>Select a Product</option>
                        {filteredProduct?.map((item) => (
                          <option value={item?.id}>{item?.title}</option>
                        ))}
                      </select>
                    </span>
                  </div>
                )}
                {selectedOption === "category" && (
                  <div className="admincoupanmodal">
                    <span>
                      <select
                        name=""
                        id=""
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                          outline: "none",
                        }}
                        onChange={(e) => setCategoryId(e.target.value)}
                      >
                        <option value="">Select One Category</option>
                        {allCategory?.map((item) => (
                          <option value={item?.id}>{item?.title}</option>
                        ))}
                      </select>
                    </span>
                  </div>
                )}
                {selectedOption === "sub category" && (
                  <div className="admincoupanmodal">
                    <span>
                      <select
                        name=""
                        id=""
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                          outline: "none",
                        }}
                        onChange={(e) => setSubCategoryId(e.target.value)}
                      >
                        <option value="">Select One Sub Category</option>
                        {allSubCategory?.map((item) => (
                          <option value={item?.id}>{item?.title}</option>
                        ))}
                      </select>
                    </span>
                  </div>
                )}
                {selectedOption === "inner Sub Category" && (
                  <div className="admincoupanmodal">
                    <span>
                      <select
                        name=""
                        id=""
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                          outline: "none",
                        }}
                        onChange={(e) => setInnerSubCategoryId(e.target.value)}
                      >
                        <option value="">Select One Inner Sub Category</option>
                        {allInnerSubCategory?.map((item) => (
                          <option value={item?.id}>{item?.title}</option>
                        ))}
                      </select>
                    </span>
                  </div>
                )}
                <p>Coupan Code</p>
                <span>
                  <input
                    type="text"
                    placeholder="Enter Coupan Here"
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </span>
                <p>Discount</p>
                <span>
                  <input
                    type="text"
                    placeholder="Enter Discount Amount"
                    onChange={(e) => setDiscountAmount(e.target.value)}
                  />
                </span>
                <p>Start Date</p>
                <span>
                  <input
                    type="date"
                    placeholder="Enter Discount Amount"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </span>
                <p>End Date</p>
                <span>
                  <input
                    type="date"
                    placeholder="Enter Discount Amount"
                    onChange={(e) => setEndtDate(e.target.value)}
                  />
                </span>
                <span className="admincoupanmodal_span">
                  <button>Add Coupon</button>
                </span>
              </div>
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
          <Box sx={style}>
            <form onSubmit={updateSingleCouponsHandle}>
              <div className="admincoupanmodal">
                <p>Coupan Code</p>
                <span>
                  <input
                    type="text"
                    placeholder="Enter Coupan Here"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </span>
                <p>Discount</p>
                <span>
                  <input
                    type="text"
                    placeholder="Enter Discount Amount"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                  />
                </span>
                <p>Start Date</p>
                <span>
                  <input
                    type="date"
                    placeholder="Enter Discount Amount"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </span>
                <p>End Date</p>
                <span>
                  <input
                    type="date"
                    placeholder="Enter Discount Amount"
                    value={endDate}
                    onChange={(e) => setEndtDate(e.target.value)}
                  />
                </span>
                <span className="admincoupanmodal_span">
                  <button>Update Coupon</button>
                </span>
              </div>
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
          <Box sx={style}>
            <div className="admincoupanmodal">
              <p>Are You Sure?</p>

              <span className="admincoupanmodal_span_button">
                <button>No</button>
                <button>Yes</button>
              </span>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AdminCoupan;
