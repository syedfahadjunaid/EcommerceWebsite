import React, { useCallback, useEffect, useState } from "react";
import "./InnerCategorie.css";
import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
function InnerCategorie() {
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
  const [categoryId, setCategoryId] = useState();
  const [allCategory, setAllCategory] = useState();
  const [allSubCategory, setAllSubCategory] = useState();
  const [selectCatSubCategory, setSelectCatSubCategory] = useState();
  const [subCategoryId, setSubCategoryId] = useState();
  const [innerCategoryTitle, setInnerCategoryTitle] = useState();
  const [innerCategoryId, setInnerCategoryId] = useState();

  const [allInnerCategory, setAllInnerCategory] = useState();
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

    console.log(data, "category");
  };
  const getAlSubcategoryHandle = async () => {
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

    console.log(data, "subcategory");
  };
  const getAllInnerCategoryData = async () => {
    const { data } = await axios
      .get(
        `${process.env.React_App_Base_Url + "api/admin/all-InnerSubCategory"}`,
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
    setAllInnerCategory(data && data?.data);
    console.log(data);
  };
  const addInnerCategoryHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", innerCategoryTitle);
    formData.append("sub_categorise_id", subCategoryId);
    formData.append("categories_id", categoryId);
    const { data } = await axios
      .post(
        `${
          process.env.React_App_Base_Url + "api/admin/InnerSubCategory-create"
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
      getAllInnerCategoryData();
    }
    if (!data) {
      notify1();
    }

    console.log(data);
  };
  const getSingleInnerCategory = async (id) => {
    const { data } = await axios
      .get(
        `${
          process.env.React_App_Base_Url +
          "api/admin/Get-one-InnerSubCategory/" +
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
    setCategoryId(data && data?.data?.categories_id);
    setSubCategoryId(data && data?.data?.sub_categorise_id);
    setInnerCategoryTitle(data && data?.data?.title);
    setInnerCategoryId(data && data?.data?.id);
    console.log(data?.data, "data", data?.data);
  };
  const updateInnerCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", innerCategoryTitle);
    formData.append("sub_categorise_id", subCategoryId);
    formData.append("categories_id", categoryId);
    const data = await axios
      .post(
        `${
          process.env.React_App_Base_Url +
          "api/admin/InnerSubCategory-update/" +
          innerCategoryId
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
      getAllInnerCategoryData();
    }
    if (!data) {
      notify1();
    }
    console.log(data);
  };
  const subCategoryFilter = useCallback(
    (id) => {
      const filter = allSubCategory?.filter((item) => item?.category_id == id);
      setSelectCatSubCategory(filter && filter);
    },
    [categoryId]
  );
  useEffect(() => {
    getAllInnerCategoryData();
    getAllCategoryHandle();
    getAlSubcategoryHandle();
  }, []);
  useEffect(() => {
    subCategoryFilter(categoryId);
  }, [categoryId]);
  return (
    <div className="subcategories">
      <div className="subcategories_heading">
        <h3>Inner SUB CATEGORY</h3>
      </div>
      <div className="subcategories_top">
        <div className="subcategories_top_search">
          <span>
            <input type="text" placeholder="Search" />
          </span>
          <button onClick={handleOpen}> Add Inner SUB CATEGORY</button>
        </div>
        <div className="subcategories_top_table">
          <table id="customers">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Subcategory</th>
                <th>Category</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allInnerCategory?.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td> {item?.title}</td>
                  <td> {item?.sub_categorise_id}</td>
                  <td> {item?.categories_id}</td>

                  <td>
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <Edit
                      style={{ color: "lightgrey" }}
                      onClick={() => [
                        handleOpen2(),
                        getSingleInnerCategory(item?.id),
                      ]}
                    />
                    <Delete
                      onClick={handleOpen1}
                      style={{ color: "#FF8D60" }}
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
        <Box sx={style} className="subcategories_modal">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: "10px" }}
          >
            CATEGORY
          </Typography>
          <form onSubmit={addInnerCategoryHandle}>
            <select
              onChange={(e) => [
                setCategoryId(e.target.value),
                subCategoryFilter(e.target.value),
              ]}
            >
              <option>Select Categorie</option>
              {allCategory?.map((item) => (
                <option value={item?.id}>{item?.title}</option>
              ))}
            </select>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginBottom: "10px" }}
            >
              SUBCATEGORY NAME
            </Typography>
            <select onChange={(e) => setSubCategoryId(e.target.value)}>
              <option>Select Sub Categorie</option>
              {selectCatSubCategory?.map((item) => (
                <option value={item?.id}>{item?.title}</option>
              ))}
            </select>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginBottom: "10px" }}
            >
              Inner SUBCATEGORY NAME
            </Typography>
            <span>
              <input
                type="text"
                placeholder="Enter SubCategories Name"
                onChange={(e) => setInnerCategoryTitle(e.target.value)}
              />
            </span>
            <span className="subcategories_modal_span">
              <button>Save</button>
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
        <Box sx={style} className="subcategories_modal">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: "10px" }}
          >
            CATEGORY
          </Typography>
          <form onSubmit={updateInnerCategory}>
            <select
              value={categoryId}
              onChange={(e) => [setCategoryId(e.target.value)]}
            >
              <option>Select Categorie</option>
              {allCategory?.map((item) => (
                <option value={item?.id}>{item?.title}</option>
              ))}
            </select>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginBottom: "10px" }}
            >
              SUBCATEGORY NAME
            </Typography>
            <select
              value={subCategoryId}
              onChange={(e) => setSubCategoryId(e.target.value)}
            >
              <option>Select Sub Categorie</option>
              {selectCatSubCategory?.map((item) => (
                <option value={item?.id}>{item?.title}</option>
              ))}
            </select>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginBottom: "10px" }}
            >
              Inner SUBCATEGORY NAME
            </Typography>
            <span>
              <input
                type="text"
                placeholder="Enter SubCategories Name"
                value={innerCategoryTitle}
                onChange={(e) => setInnerCategoryTitle(e.target.value)}
              />
            </span>
            <span className="subcategories_modal_span">
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
        <Box sx={style} className="subcategories_modal">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: "10px" }}
          >
            Are You Sure
          </Typography>

          <span className="subcategories_modal_span">
            <button>No</button>
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

export default InnerCategorie;
