import React, { useEffect, useState } from "react";
import "./AdminWebSiteSetting.css";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Box, CircularProgress } from "@mui/material";
function AdminWebSiteSetting() {
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
  const notify1 = () => toast.warn("Something Went Wrong");
  const [websiteTitle, setWebsiteTittle] = useState();
  const [websiteTollFreeNumber, setWebsiteTollFreeNumber] = useState();
  const [websiteNavbarText, setWebsiteNavbarText] = useState();
  const token = Cookies.get("adminLogin");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [allIcons, setAllIcons] = useState([]);
  const [iconValue, setIconValue] = useState([]);
  const [websiteLogo, setWebsiteLogo] = useState();
  const [websiteSetting, setWebsiteSetting] = useState([
    {
      title: "",
      tollfreenumber: "",
      navbarText: "",
    },
  ]);
  const websiteSettingDataHandle = (event) => {
    console.log();
    let { name, value } = event.target;
    let onChangeData = [...websiteSetting];
    onChangeData[0][name] = value;
    setWebsiteSetting(onChangeData);
  };
  const addNewInputHandle = (e) => {
    // e.preventDefault();
    setIconValue([
      ...iconValue,
      { Title: "", Link: "", AltTag: "", Image: {} },
    ]);
  };
  const removeInputHandle = (index) => {
    const newArray = [...iconValue];
    newArray.splice(index, 1);
    setIconValue(newArray);
    console.log(newArray);
  };
  const handleValueChange = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...iconValue];
    onChangeValue[index][name] = value;
    setIconValue(onChangeValue);
  };
  const handleValueChange1 = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...allIcons];
    onChangeValue[index][name] = value;
    // setIconValue(onChangeValue);
    setAllIcons(onChangeValue);
  };

  const handleImageChange = (event, index) => {
    let { name } = event.target;
    const files = event.target.files;

    let onChangeValue = [...iconValue];
    onChangeValue[index][name] = files;
    console.log(onchange);
  };
  const handleImageChange1 = (event, index) => {
    let { name } = event.target;
    const files = event.target.files;

    let onChangeValue = [...allIcons];
    onChangeValue[index][name] = files;
    console.log(onChangeValue);
  };
  const getAllIconHandle = async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/all-Icons"}`, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setAllIcons(data && data?.data);
    console.log(data);
  };
  const addIconHandle = async (iconData, index) => {
    console.log(iconData, "title");
    const formData = new FormData();
    formData.append("title", iconData?.Title);
    formData.append("link", iconData?.Link);
    formData.append("slug", iconData?.AltTag);
    formData.append("image", iconData?.Image[0]);
    const { data } = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/admin/Icons-create"}`,
        formData,
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
    if (data) {
      notify();
      getAllIconHandle();
      removeInputHandle(index);
    }
    if (!data) {
      notify1();
    }

    console.log(data);
  };
  const updateIconHandle = async (id, iconData) => {
    const formData = new FormData();
    formData.append("title", iconData?.title);
    formData.append("link", iconData?.link);
    formData.append("slug", iconData?.slug);
    formData.append("image", iconData?.image[0] ? iconData?.image[0] : "");
    const { data } = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/admin/Icons-update/" + id}`,
        formData,
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
    if (data) {
      notify();
      getAllIconHandle();
    }
    if (!data) {
      notify1();
    }

    console.log(data);
  };
  const removeIconhandle = async () => {
    const data = await axios
      .delete(`${process.env.React_App_Base_Url + "api/admin/"}`, {
        headers: { "Content-type": "multipart/form-date" },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };
  const getWebsiteSettingHandle = async (id) => {
    const { data } = await axios
      .get(
        `${
          process.env.React_App_Base_Url +
          "api/admin/website-setiing-title/" +
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
    setWebsiteNavbarText(data && data?.data?.nev_bar_text);
    setWebsiteTittle(data && data?.data?.website_title);
    setWebsiteTollFreeNumber(data && data?.data?.toll_free_number);

    console.log(data?.data, "aaaa");
  };
  const updateWebsiteSettingHandle = async (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("website_title", websiteTitle);
    formData.append("toll_free_number", websiteTollFreeNumber);
    formData.append("nev_bar_text", websiteNavbarText);
    formData.append("logo", websiteLogo);

    const { data } = await axios
      .post(
        `${
          process.env.React_App_Base_Url +
          "api/admin/website-setiing-title/update/" +
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
      .then((response) => response, setIsLoading1(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading1(false));
    if (data) {
      notify();
      getWebsiteSettingHandle();
    }
    if (!data) {
      notify1();
    }

    console.log(data, "website");
  };
  useEffect(() => {
    getAllIconHandle();
  }, []);
  useEffect(() => {
    getWebsiteSettingHandle(process.env.React_App_Website_setting_Id);
  }, [process.env.React_App_Website_setting_Id]);

  return (
    <div className="addproduct">
      <div className="addproduct_heading">
        <h3>Website Settings</h3>
      </div>
      <div className="addproduct_form">
        <form
          onSubmit={(e) =>
            updateWebsiteSettingHandle(
              e,
              process.env.React_App_Website_setting_Id
            )
          }
        >
          <div className="addproduct_form_div">
            <p>Website Title</p>
            <input
              type="text"
              value={websiteTitle}
              required
              name="navbarText"
              onChange={(event) => setWebsiteTittle(event.target.value)}
            />
          </div>
          <div className="addproduct_form_div">
            <p>Website Toll Free Number</p>
            <input
              type="text"
              value={websiteTollFreeNumber}
              required
              name="tollfreenumber"
              onChange={(event) => setWebsiteTollFreeNumber(event.target.value)}
            />
          </div>
          <div className="addproduct_form_div">
            <p>Website Navbar Text</p>
            <input
              type="text"
              name="navbarText"
              value={websiteNavbarText}
              required
              onChange={(event) => setWebsiteNavbarText(event.target.value)}
            />
          </div>
          <div className="addproduct_form_div">
            <p>Website Logo</p>
            <input
              type="file"
              onChange={(e) => setWebsiteLogo(e.target.files[0])}
            />
          </div>
          <span className="addproduct_form_button_span">
            {!isLoading1 ? (
              <button className="addproduct_form_button">Save Settings</button>
            ) : (
              <button className="addproduct_form_button" disabled>
                Save...
              </button>
            )}
          </span>
          {isLoading && (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </form>
        <div className="addproduct_form_div" style={{ marginBottom: "20px" }}>
          <span
            style={{
              width: "99%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
              marginTop: "20px",
            }}
          >
            <p>Website Icons</p>
            <button
              className="addproduct_form_button"
              onClick={addNewInputHandle}
            >
              Add Icon
            </button>
          </span>
          {allIcons?.map((item, index) => (
            <div className="icons_container" key={index}>
              <input
                name="title"
                value={item?.title}
                type="text"
                placeholder="Title"
                onChange={(event) => handleValueChange1(event, index)}
              />
              <input
                name="link"
                value={item?.link}
                type="text"
                placeholder="link"
                onChange={(event) => handleValueChange1(event, index)}
              />
              <input
                name="slug"
                value={item?.slug}
                type="text"
                placeholder="Alt Tag"
                onChange={(event) => handleValueChange1(event, index)}
              />
              <input
                name="image"
                type="file"
                placeholder="Image"
                onChange={(event) => handleImageChange1(event, index)}
              />
              <button
                className="removebutton"
                type="button"
                onClick={(e) => removeInputHandle(e, index)}
              >
                Remove
              </button>

              <button
                className="savebutton"
                type="button"
                key={index}
                onClick={() =>
                  updateIconHandle(allIcons[index]?.id, allIcons[index])
                }
              >
                Update
              </button>
            </div>
          ))}
          {iconValue?.map((item, index) => (
            <div
              className="icons_container"
              key={index}
              style={{ marginTop: "10px" }}
            >
              <input
                name="Title"
                value={item?.Title}
                type="text"
                placeholder="Title"
                onChange={(event) => handleValueChange(event, index)}
              />
              <input
                name="Link"
                value={item?.Link}
                type="text"
                placeholder="link"
                onChange={(event) => handleValueChange(event, index)}
              />
              <input
                name="AltTag"
                value={item?.AltTag}
                type="text"
                placeholder="Alt Tag"
                onChange={(event) => handleValueChange(event, index)}
              />
              <input
                name="Image"
                type="file"
                placeholder="Image"
                onChange={(event) => handleImageChange(event, index)}
              />
              <button
                className="removebutton"
                type="button"
                onClick={(e) => removeInputHandle(e, index)}
              >
                Remove
              </button>
              <button
                className="savebutton"
                type="button"
                onClick={() => addIconHandle(iconValue[index], index)}
              >
                Save
              </button>
            </div>
          ))}
          {isLoading && (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminWebSiteSetting;
