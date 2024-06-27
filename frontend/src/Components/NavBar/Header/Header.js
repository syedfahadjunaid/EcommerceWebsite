import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Header() {
  const { headerData } = useSelector((state) => state?.HomePage);

  return (
    <div className="header">
      {/* {headerData?.header?.map((item) => (
        <p>{item?.title}</p>
      ))} */}

      <ul>
        {headerData?.header?.map((item) => (
          <li className="header_li">
            {item?.link !== "null" ? (
              <>
                <Link to={item?.link} className="header_p">
                  {item?.title}
                </Link>
              </>
            ) : (
              <>
                <p className="header_p">{item?.title}</p>
                <ul className="header_li_li">
                  {item?.sub_headers?.map((item) => (
                    <li className="header_sub_li">
                      <Link to={item?.sub_header_link}>{item?.sub_header}</Link>{" "}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Header;
