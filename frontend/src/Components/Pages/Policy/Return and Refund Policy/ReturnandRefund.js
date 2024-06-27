import React, { useEffect, useState } from "react";
import "./ReturnandRefund.css";
import SubNavBar from "../../../NavBar/SubNavBar/SubNavBar";
import MainNavBar from "../../../NavBar/MainNavBar/MainNavBar";
import Footer from "../../../Footer/Footer";
import { useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
import Header from "../../../NavBar/Header/Header";
function ReturnandRefund() {
  const [pageData, setPageData] = useState();
  const { pages } = useSelector((state) => state?.allPages);
  useEffect(() => {
    setPageData(pages && pages?.data?.[3]?.slug);
  }, [pages]);
  return (
    <div className="returnandrefund">
      <SubNavBar />
      <MainNavBar />
      <Header />
      <div className="returnandrefundheader">
        <h6>Return and Refund</h6>
      </div>
      <div className="returnandrefund_details">
        {HTMLReactParser(pageData ? pageData : "")}
      </div>
      <Footer />
    </div>
  );
}

export default ReturnandRefund;
