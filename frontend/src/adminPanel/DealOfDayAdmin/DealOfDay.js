import React, { useEffect, useState } from "react";
import "./DealOfDay.css";
import { Delete, Edit } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function DealOfDay() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    outline: "0",
    border: "2px solid #fff",
    boxShadow: 24,
    p: 4,
  };
  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    bgcolor: "background.paper",
    border: "2px solid #fff",
    outline: "0",
    boxShadow: 24,
    p: 4,
  };
  const token = Cookies.get("adminLogin");
  const [isLoading, setIsLoading] = useState();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpen1 = () => setOpen1(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => {
    setOpen(false);
    setCategorieId();
    setSubCategorieId();
    setProductId();
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Submitted  Successfully!");
  const [dealofweekId, setDealofweekId] = useState();
  const [categorieId, setCategorieId] = useState();
  const [subCategorieId, setSubCategorieId] = useState();
  const [productId, setProductId] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [allCategory, setAllCategory] = useState();
  const [allSubCategory, setAllSubCategory] = useState();
  const [allProduct, setAllProduct] = useState();
  const [filteredSubCategory, setFilteredSubCategory] = useState();
  const [filteredProduct, setFilteredProduct] = useState();
  const [allDealofWeek, setAllDealofWeek] = useState();
  const getAllCategoryHandle = async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/category"}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setAllCategory(data && data?.list);
  };
  const getAllSubCategoryHandle = async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/subcategory"}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setAllSubCategory(data && data?.list);
    console.log(data, "sub");
  };
  const getAllProductHandle = async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/product"}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));

    setAllProduct(data && data?.list);
  };
  const filterProductHandle = async () => {
    const filter = await allProduct?.filter((item) => {
      if (categorieId && !subCategorieId) {
        return item?.category_id?.id == categorieId;
      }
      if (categorieId && subCategorieId) {
        return (
          item?.category_id?.id == categorieId &&
          item?.sub_category_id?.id == subCategorieId
        );
      }
    });
    setFilteredProduct(filter && filter);
    console.log(filter, "product");
    return;
  };

  const getSubCategoryFiltered = (id) => {
    const filter = allSubCategory?.filter((item) => item?.category_id == id);
    setFilteredSubCategory(filter && filter);
    console.log(filter, "filter");
  };

  const addDealOfDayHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category_id", categorieId);
    formData.append("sub_category_id", subCategorieId);
    formData.append("product_id", productId);
    formData.append("startdate", startDate);
    formData.append("enddate", endDate);
    const { data } = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/admin/Deal-of-day-create"}`,
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
      getAllDealOfDay();
    }
    if (!data) {
      notify1();
    }

    console.log(data);
  };
  const getAllDealOfDay = async () => {
    const { data } = await axios
      .get(
        `${
          process.env.React_App_Base_Url + "api/admin/Deal-of-day-all-banner"
        }`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setAllDealofWeek(data && data?.Banner);
    console.log(data);
  };
  const getSingleDealofWeekHandle = async (id) => {
    const { data } = await axios
      .get(
        `${
          process.env.React_App_Base_Url + "api/admin/Get-one-deal-of-day/" + id
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
    setCategorieId(data && data?.banner?.category_id);
    setSubCategorieId(data && data?.banner?.sub_category_id);
    setProductId(data && data?.banner?.product_id);
    setStartDate(data && data?.banner?.startdate);
    setEndDate(data && data?.banner?.enddate);
    setDealofweekId(data && data?.banner?.id);

    console.log(data, "single blog");
  };
  const updateSingleDealOfWeekHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category_id", categorieId);
    formData.append("sub_category_id", subCategorieId);
    formData.append("product_id", productId);
    formData.append("startdate", startDate);
    formData.append("enddate", endDate);
    const data = await axios
      .post(
        `${
          process.env.React_App_Base_Url +
          "api/admin/deal-od-day-update/" +
          dealofweekId
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
      getAllDealOfDay();
    }
    if (!data) {
      notify1();
    }
    console.log(data);
  };
  const deleteSingleDealofWeekHandle = async () => {
    const data = await axios
      .delete(
        `${
          process.env.React_App_Base_Url +
          "api/admin/Deal-of-day-delete/" +
          dealofweekId
        }`,
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
      getAllDealOfDay();
    }
    if (!data) {
      notify1();
    }
    console.log(data);
  };
  useEffect(() => {
    getAllCategoryHandle();
    getAllSubCategoryHandle();
    getAllProductHandle();
    getAllDealOfDay();
  }, []);
  useEffect(() => {
    filterProductHandle();
  }, [categorieId, subCategorieId]);
  return (
    <div className="addbanner">
      <div className="addbanner_heading">
        <h3>Banner</h3>
        <button onClick={handleOpen}>Add Deal Of Day</button>
      </div>
      <div className="addbanner_top">
        <table id="customers">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Title</th>
              <th>Start Time</th>
              <th>Ends Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allDealofWeek?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item?.startdate}</td>
                <td>{item?.enddate}</td>

                <td>
                  <Edit
                    style={{ color: "lightgrey", cursor: "pointer" }}
                    onClick={() => [
                      getSingleDealofWeekHandle(item?.id),
                      handleOpen1(),
                    ]}
                  />
                  <Delete
                    style={{ color: "rgb(255, 141, 96)", cursor: "pointer" }}
                    onClick={() => [handleOpen2(), setDealofweekId(item?.id)]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <Box sx={style} className="dealofdayModal">
            <form onSubmit={addDealOfDayHandle}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Select Categories
              </Typography>
              <select
                onChange={(e) => [
                  setCategorieId(e.target.value),
                  getSubCategoryFiltered(e.target.value),
                  setSubCategorieId(),
                ]}
              >
                <option>Select a Category</option>
                {allCategory?.map((item) => (
                  <option value={item?.id}>{item?.title}</option>
                ))}
              </select>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Select Sub Categories
              </Typography>
              <select onChange={(e) => [setSubCategorieId(e.target.value)]}>
                <option value="">Select a SubCategory</option>
                {filteredSubCategory?.map((item) => (
                  <option value={item?.id}>{item?.title}</option>
                ))}
              </select>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Select Product
              </Typography>
              <select onChange={(e) => setProductId(e.target.value)}>
                <option>Select a Product</option>
                {filteredProduct?.map((item) => (
                  <option value={item?.id}>{item?.title}</option>
                ))}
              </select>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Time Start
              </Typography>
              <span>
                <input
                  type="date"
                  placeholder="Time Start"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </span>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Time Ends
              </Typography>
              <span>
                <input
                  type="date"
                  placeholder="Time Ends"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </span>
              <span className="dealofdayModal_span">
                <button>Add Deal Of Day</button>
              </span>
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
          <Box sx={style} className="dealofdayModal">
            <form onSubmit={updateSingleDealOfWeekHandle}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Select Categories
              </Typography>
              <select
                value={categorieId}
                onChange={(e) => [
                  setCategorieId(e.target.value),
                  getSubCategoryFiltered(e.target.value),
                  setSubCategorieId(),
                ]}
              >
                <option>Select a Category</option>
                {allCategory?.map((item) => (
                  <option value={item?.id}>{item?.title}</option>
                ))}
              </select>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Select Sub Categories
              </Typography>
              <select
                value={subCategorieId}
                onChange={(e) => [setSubCategorieId(e.target.value)]}
              >
                <option value="">Select a SubCategory</option>
                {filteredSubCategory?.map((item) => (
                  <option value={item?.id}>{item?.title}</option>
                ))}
              </select>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Select Product
              </Typography>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              >
                <option>Select a Product</option>
                {filteredProduct?.map((item) => (
                  <option value={item?.id}>{item?.title}</option>
                ))}
              </select>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Time Start
              </Typography>
              <span>
                <input
                  type="date"
                  placeholder="Time Start"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </span>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Time Ends
              </Typography>
              <span>
                <input
                  type="date"
                  placeholder="Time Ends"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </span>
              <span className="dealofdayModal_span">
                <button>Update Deal Of Day</button>
              </span>
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
          <Box sx={style1}>
            <div className="productDeleteModal">
              <p> Are You Sure ?</p>
              <span>
                <button onClick={handleClose2}>NO</button>
                <button onClick={deleteSingleDealofWeekHandle}>Yes</button>
              </span>
            </div>
          </Box>
        </Fade>
      </Modal>
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default DealOfDay;
