import React, { useEffect, useState } from "react";
import "./SubCategories.css";
import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import swal from "sweetalert";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
function SubCategories() {
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
  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    bgcolor: "transprent",
    border: "2px solid transprent",
    outline: "0",
    // boxShadow: 24,
    p: 4,
  };
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Submitted  Successfully!");
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [subCategorieList, setSubCategoriesList] = useState([]);
  const [categorieList, setCategoriesList] = useState([]);
  const [categorieId, setCategorieId] = useState();
  const [subCategoriesTitle, setSubCategoriesTitle] = useState();
  const [subCategorieDeleteId, setSubCategorieDeleteId] = useState();

  const token = Cookies.get("adminLogin");
  const subCategoriesHandle = async () => {
    const response = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/subcategory"}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    setSubCategoriesList(response?.data?.list && response?.data?.list);
    console.log(response?.data?.list);
  };

  const categorieListHandle = async () => {
    const response = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/category"}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    setCategoriesList(response?.data?.list && response?.data?.list);
    console.log(response?.data?.list);
  };
  const subCategorieAddhandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", subCategoriesTitle);
    formData.append("category_id", categorieId);
    setSubCategoriesTitle();
    const response = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/admin/subcategory"}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => response, setLoading(true), handleClose())
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));

    if (response) {
      notify();
      subCategoriesHandle();
    }
    if (!response) {
      notify1();
    }
  };
  const subCategorieEditHandle = async (id) => {
    const response = await axios
      .get(
        `${process.env.React_App_Base_Url + "api/admin/subcategory/" + id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    setSubCategorieDeleteId(id);
    setCategorieId(
      response?.data?.data?.category_id && response?.data?.data?.category_id
    );
    setSubCategoriesTitle(
      response?.data?.data?.category_id && response?.data?.data?.title
    );
    console.log(id);
    console.log(response);
    handleOpen2();
  };
  const subCategorieUpdateHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("title", subCategoriesTitle);
    formData.append("category_id", categorieId);
    const response = await axios
      .post(
        `${
          process.env.React_App_Base_Url +
          "api/admin/subcategory/" +
          subCategorieDeleteId
        }`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            " charset": "UTF-8",
          },
        }
      )
      .then((response) => response, setLoading(true), handleClose2())
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));

    if (response) {
      notify();
      subCategoriesHandle();
    }
    if (!response) {
      notify1();
    }
  };
  const subCategorieDeleteHandle = async (e) => {
    const response = await axios
      .delete(
        `${
          process.env.React_App_Base_Url +
          "api/admin/subcategory/" +
          subCategorieDeleteId
        }`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => response, setLoading(true), handleClose1())
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));

    if (response) {
      notify();
      subCategoriesHandle();
    }
    if (!response) {
      notify1();
    }
  };
  useEffect(() => {
    subCategoriesHandle();
    categorieListHandle();
  }, []);

  return (
    <div className="subcategories">
      <div className="subcategories_heading">
        <h3>SUB CATEGORY</h3>
      </div>
      <div className="subcategories_top">
        <div className="subcategories_top_search">
          <span>
            <input type="text" placeholder="Search" />
          </span>
          <button onClick={handleOpen}>Add Sub Category</button>
        </div>
        <div className="subcategories_top_table">
          <table id="customers">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subCategorieList?.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td> {item?.category?.title}</td>
                  <td> {item?.title}</td>

                  <td>
                    <Edit
                      style={{ color: "lightgrey" }}
                      onClick={() => subCategorieEditHandle(item.id)}
                    />
                    <Delete
                      onClick={() =>
                        handleOpen1(setSubCategorieDeleteId(item.id))
                      }
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
          <form onSubmit={subCategorieAddhandle}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginBottom: "10px" }}
            >
              CATEGORY
            </Typography>
            <select onChange={(e) => [setCategorieId(e.target.value)]}>
              {categorieList?.map((item) => (
                <option value={item.id}>{item.title}</option>
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
            <span>
              <input
                type="text"
                placeholder="Enter SubCategories Name"
                onChange={(e) => setSubCategoriesTitle(e.target.value)}
                required
              />
            </span>
            <span className="subcategories_modal_span">
              <button type="submit">Save</button>
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
          <form onSubmit={subCategorieUpdateHandle}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginBottom: "10px" }}
            >
              CATEGORY
            </Typography>
            <select
              value={categorieId}
              onChange={(e) => setCategorieId(e.target.value)}
              required
            >
              {categorieList?.map((item) => (
                <option value={item.id}>{item.title}</option>
              ))}
              {/* <option>Select Categorie</option>
            <option>Men's</option>
            <option>Women's</option>
            <option>Fashion</option> */}
            </select>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginBottom: "10px" }}
            >
              SUBCATEGORY NAME
            </Typography>
            <span>
              <input
                type="text"
                placeholder="Enter SubCategories Name"
                value={subCategoriesTitle}
                onChange={(e) => setSubCategoriesTitle(e.target.value)}
                required
              />
            </span>
            <span className="subcategories_modal_span">
              <button type="submit">UpDate Subategory</button>
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
            <button onClick={handleClose1}>No</button>
            <button onClick={subCategorieDeleteHandle}>Yes</button>
          </span>
        </Box>
      </Modal>
      {loading && (
        <Box sx={style1}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default SubCategories;
