import React, { useEffect, useState } from "react";
import "./Policy.css";
import SubNavBar from "../../NavBar/SubNavBar/SubNavBar";
import MainNavBar from "../../NavBar/MainNavBar/MainNavBar";
import Footer from "../../Footer/Footer";
import { useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
import Header from "../../NavBar/Header/Header";
function Policy() {
  const [pageData, setPageData] = useState();
  const { pages } = useSelector((state) => state?.allPages);
  useEffect(() => {
    setPageData(pages && pages?.data?.[1]?.slug);
  }, [pages]);
  return (
    <div className="policy">
      <SubNavBar />
      <MainNavBar />
      <Header />
      <div className="policy_header">
        <h6>PRIVACY POLICY</h6>
      </div>
      <div className="policy_details">
        {HTMLReactParser(pageData ? pageData : "")}
      </div>{" "}
      <Footer />
    </div>
  );
}

export default Policy;
