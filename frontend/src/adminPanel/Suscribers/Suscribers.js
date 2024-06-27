import React, { useEffect, useState } from "react";
import "./Suscribers.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Box, CircularProgress } from "@mui/material";
import { Delete } from "@mui/icons-material";

function Suscribers() {
  const token = Cookies.get("adminLogin");
  const [isLoading, setIsLoading] = useState(false);
  const [allSuscribersHandle, setAllSuscribersHandle] = useState();

  const getAllSuscribersHandle = async () => {
    const { data } = await axios
      .get(
        `${
          process.env.React_App_Base_Url + "api/admin/Subscribers-all-banner"
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
    setAllSuscribersHandle(data && data?.data);
    console.log(data, "data");
  };
  useEffect(() => {
    getAllSuscribersHandle();
  }, []);
  return (
    <div className="subscribers">
      <div className="subscribers_heading">
        <h3>SUBSCRIBERS</h3>
      </div>
      <div className="subscribers_top">
        <div className="subscribers_top_search">
          <span>
            <input type="text" placeholder="Search" />
          </span>
        </div>
        <div className="subscribers_top_table">
          <table id="customers">
            <thead>
              <tr>
                <th>#</th>

                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allSuscribersHandle?.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td> {item?.email}</td>
                  <td>
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <Delete />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default Suscribers;
