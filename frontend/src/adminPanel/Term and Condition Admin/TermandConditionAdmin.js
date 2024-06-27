import React, { useEffect, useState } from 'react'
import './TermandConditionAdmin.css'
import JoditEditor from 'jodit-react'
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
function TermandConditionAdmin() {
  const [termAndCondition,setTermAndCondition]=useState('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.')
  const token = Cookies.get("adminLogin");
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Submitted  Successfully!");
  const [pageTitle, setPageTitle] = useState();
  const [termData, setTermData] = useState();
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
    setTermData(data && data?.page?.slug);
    console.log(data, "privacy page");
  };
  const updatePageHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", pageTitle);
    formData.append("slug", termData);

    const data = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/admin/Pages/" + 3}`,
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
      getPageData(3);
    }
    if (!data) {
      notify1();
    }
  };
  useEffect(() => {
    getPageData(3);
  }, []);
  return (
    <div className='termandconditionadmin'>
      <div className="termandconditionadmin_heading">
        <h3>
        Terms Conditions
        </h3>
      </div>
      <div className="termandconditionadmin_update">
      <form onSubmit={updatePageHandle}>
          <JoditEditor
            className="editor"
            value={termData}
            onChange={(newContent) => setTermData(newContent)}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  )
}

export default TermandConditionAdmin