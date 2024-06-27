import React, { useEffect, useState } from "react";
import "./AboutUs.css";
import SubNavBar from "../../../NavBar/SubNavBar/SubNavBar";
import MainNavBar from "../../../NavBar/MainNavBar/MainNavBar";
import Footer from "../../../Footer/Footer";
import { useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
import Header from "../../../NavBar/Header/Header";
function AboutUs() {
  const [pageData, setPageData] = useState();
  const { pages } = useSelector((state) => state?.allPages);
  useEffect(() => {
    setPageData(pages && pages?.data?.[0]?.slug);
  }, [pages]);
  return (
    <div className="aboutUs">
      <SubNavBar />
      <MainNavBar />
      <Header />
      <div className="aboutUs_header">
        <h6>About Us</h6>
      </div>
      <div className="aboutUs_details">
        {HTMLReactParser(pageData ? pageData : "")}
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
