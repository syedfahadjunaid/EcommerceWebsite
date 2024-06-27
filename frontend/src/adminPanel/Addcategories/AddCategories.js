import React, { useEffect, useState } from "react";
import "./AddCategories.css";

import { CircularProgress, Modal, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import swal from "sweetalert";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function AddCategories() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid transparent",
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [loading, setLoading] = useState();
  const [categoriesTitle, setCategoriesTitle] = useState();
  const [categoriesImage, setCategoriesImage] = useState();
  const [categoriesList, setCategoriesList] = useState([]);
  // const [categoriesItemId, setCategoriesItemId] = useState();
  const [categoriesEditTitle, setCategoriesEditTitle] = useState("");
  const [categoriesEditImage, setCategoriesEditImage] = useState();
  const [categoriesDeleteId, setCategoriesDeleteId] = useState();

  const token = Cookies.get("adminLogin");
  const addCategoriesHandle = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", categoriesTitle);
    formData.append("image", categoriesImage);
    const addcategories = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/admin/category"}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    // console.log(addcategories);
    handleClose();
    categoriesListHandle();
    if (addcategories?.status === 200) {
      swal({
        title: "Success",
        text: addcategories?.data?.message,
        icon: "success",
        button: true,
      });
    }
  };
  async function categoriesListHandle() {
    const request = await axios(
      `${process.env.React_App_Base_Url + "api/admin/category"}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    setCategoriesList(request?.data?.list && request?.data?.list);

    console.log(request?.data?.list, "request", categoriesList);
  }

  const categoriesEditHandle = async (id) => {
    // const formData=FormData()
    // formData.append('id',id)
    handleOpen2();
    const response = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/category/" + id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    setCategoriesDeleteId(id);
    setCategoriesEditTitle(response?.data?.data?.[0]?.title);
    setCategoriesEditImage(response?.data?.data?.[0].image);
    // categoriesListHandle();
    console.log(response?.data?.data?.[0]?.image, "response edit");
  };
  const categoriesUpdateHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("title", categoriesEditTitle);
    formData.append("image", categoriesImage);
    const response = await axios
      .post(
        `${
          process.env.React_App_Base_Url +
          "api/admin/category/" +
          categoriesDeleteId
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
      .then((response) => response, setLoading(true))
      .catch((error) =>
        swal({
          title: "UnSuccess",
          text: error?.response?.data?.errors?.message,
          icon: "warning",
          dangerMode: true,
        })
      )
      .finally(() => setLoading(false));
    handleClose2();
    categoriesListHandle();
    console.log(response);
    if (response?.status === 200) {
      swal({
        title: "Success",
        text: response?.data?.message,
        icon: "success",
        button: true,
      });
    }
  };
  const categoriesDeleteHandle = async () => {
    const response = await axios
      .delete(
        `${
          process.env.React_App_Base_Url +
          "api/admin/category/" +
          categoriesDeleteId
        }`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    console.log(response);
    handleClose1();
    categoriesListHandle();
    if (response?.status === 200) {
      swal({
        title: "Success",
        text: response?.data?.message,
        icon: "success",
        button: true,
      });
    }
  };
  const categoryStatusHandle = async (id, status) => {
    const formData = new FormData();
    formData.append("status", status == 1 ? 0 : 1);

    const { data } = await axios
      .post(
        `${
          process.env.React_App_Base_Url +
          "api/admin/update_category_status/" +
          id
        }`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    if (data) {
      notify();
      categoriesListHandle();
    }
    if (!data) {
      notify1();
    }

    console.log(data);
  };
  useEffect(() => {
    categoriesListHandle();
    // categoriesUpdateHandle();
  }, []);
  useEffect(() => {
    console.log(categoriesEditTitle);
  }, [categoriesEditTitle]);
  return (
    <div className="addcategories">
      <div className="addcategories_heading">
        <h3>Categories</h3>
        <button onClick={handleOpen}>Add Categorie</button>
      </div>
      <div className="addcategories_top">
        <div className="addcategories_left"></div>
        <div className="addcategories_right">
          <table id="customers">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th> Category name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList &&
                categoriesList?.map((item, index) => (
                  <tr key={item?.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item?.image}
                        alt="category image"
                        className="categories_img"
                      />
                    </td>
                    <td>{item?.title}</td>
                    <td>
                      {" "}
                      <label class="switch">
                        <input
                          type="checkbox"
                          checked={item?.status == 1 ? true : false}
                          onClick={() =>
                            categoryStatusHandle(item?.id, item?.status)
                          }
                        />
                        <span class="slider round"></span>
                      </label>
                    </td>
                    <td>
                      <Edit
                        style={{ color: "lightgrey" }}
                        id={item.id}
                        onClick={() => categoriesEditHandle(item.id)}
                      />
                      <Delete
                        style={{ color: "#FF8D60" }}
                        onClick={() =>
                          handleOpen1(setCategoriesDeleteId(item.id))
                        }
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
        <Box sx={style} className="modal_class">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            CATEGORY NAME
          </Typography>
          <form
            onSubmit={addCategoriesHandle}
            enctype="multipart/form-data"
            method="post"
          >
            <span>
              <label>Name</label>
              <input
                type="text"
                placeholder="Type Here"
                onChange={(e) => setCategoriesTitle(e.target.value)}
                required
              />
            </span>
            <span>
              <label>Image</label>
              <input
                type="file"
                onChange={(e) => {
                  setCategoriesImage(e.target.files[0]);
                }}
              />
            </span>

            <button type="submit">Create Category</button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal_class">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            CATEGORY NAME
          </Typography>
          <form onSubmit={categoriesUpdateHandle} method="put">
            <span>
              <label>Name</label>
              <input
                type="text"
                placeholder="Type Here"
                onChange={(e) => setCategoriesEditTitle(e.target.value)}
                value={categoriesEditTitle}
              />
            </span>
            <span>
              <label>Image</label>
              <input
                type="file"
                onChange={(e) => {
                  setCategoriesImage(e.target.files[0]);
                }}
                // value={categoriesEditImage}
              />
            </span>
            <span>
              <img
                src={`${categoriesEditImage}`}
                alt="category img"
                style={{ height: "80px", objectFit: "contain" }}
              />
            </span>

            <button type="submit">Update Category</button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal_class">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are You Sure
          </Typography>
          <span className="subcategories_modal_span">
            <button>No</button>
            <button onClick={categoriesDeleteHandle}>Yes</button>
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

export default AddCategories;
