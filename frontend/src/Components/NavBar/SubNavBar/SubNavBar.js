import React from "react";
import "./SubNavBar.css";
import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";
import { useSelector } from "react-redux";
function SubNavBar() {
  const { icons, websiteData } = useSelector((state) => state?.HomePage);

  return (
    <div className="subnavbar">
      <div className="subnavbar_icon">
        {icons?.data?.map((item, index) => (
          <a href={"https://" + item?.link} target="_blank">
            <img
              src={item?.image}
              alt={item?.slug}
              className="subnavbar_icon_icon"
              key={index}
            />
          </a>
        ))}
      </div>
      <div className="subnavbar_shiping">
        <p>{websiteData?.[0]?.nev_bar_text}</p>
      </div>
      <div className="subnavbar_language">
        <p>{websiteData?.[0]?.toll_free_number}</p>
      </div>
    </div>
  );
}

export default SubNavBar;
