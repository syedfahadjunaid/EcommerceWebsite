import React, { useEffect, useState } from "react";
import "./TermsAndCondition.css";
import SubNavBar from "../../../NavBar/SubNavBar/SubNavBar";
import MainNavBar from "../../../NavBar/MainNavBar/MainNavBar";
import Footer from "../../../Footer/Footer";
import HTMLReactParser from "html-react-parser";
import { useSelector } from "react-redux";
import Header from "../../../NavBar/Header/Header";
function TermsAndCondition() {
  const [pageData, setPageData] = useState();
  const { pages } = useSelector((state) => state?.allPages);
  useEffect(() => {
    setPageData(pages && pages?.data?.[2]?.slug);
  }, [pages]);
  return (
    <div className="termsandcondition">
      <SubNavBar />
      <MainNavBar />
      <Header />
      <div className="termsandcondition_header">
        <h6>Terms and Condition's</h6>
      </div>
      <div className="termsandcondition_details">
        {HTMLReactParser(pageData ? pageData : "")}
      </div>
      <Footer />
    </div>
  );
}

export default TermsAndCondition;
