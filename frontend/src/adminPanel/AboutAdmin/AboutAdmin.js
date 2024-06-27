import React, { useEffect, useState } from "react";
import "./AboutAdmin.css";
import Cookies from "js-cookie";
import axios from "axios";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
function AboutAdmin() {
  const token = Cookies.get("adminLogin");
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Submitted  Successfully!");
  const [pageTitle, setPageTitle] = useState();
  const [aboutUsData, setAboutUsData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const getPageData = async (id) => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/Pages/" + id}`, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setPageTitle(data && data?.page?.title);
    setAboutUsData(data && data?.page?.slug);
    console.log(data, "about page");
  };
  const updatePageHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", pageTitle);
    formData.append("slug", aboutUsData);

    const data = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/admin/Pages/" + 1}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    if (data) {
      notify();
      getPageData(1);
    }
    if (!data) {
      notify1();
    }
  };
  useEffect(() => {
    getPageData(1);
  }, []);
  return (
    <div className="aboutadmin">
      <div className="aboutadmin_heading">
        <h3>About Us</h3>
      </div>
      <div className="aboutadmin_update">
        <form onSubmit={updatePageHandle}>
          <JoditEditor
            className="editor"
            value={aboutUsData}
            onChange={(newContent) => setAboutUsData(newContent)}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default AboutAdmin;
