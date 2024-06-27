import React, { useEffect, useState } from "react";
import "./DealOfDay.css";
import BigCard from "../../Cards/Big Card/BigCard";
import img from "../../Images/1.jpg";
import img1 from "../../Images/2.jpg";
import img2 from "../../Images/3.jpg";
import img3 from "../../Images/4.jpg";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";
import { useSelector } from "react-redux";
function DealOfDay() {
  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
  };
  const [dealOfDayData, setDealOfDayData] = useState();
  const [isLoading, setIsLoading] = useState();
  const getAllDealOfDayHandle = async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/deal_of_day"}`, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setDealOfDayData(data && data?.deal_of_day);
    console.log(data, "data?.deal_of_day");
  };
  const { dealofday } = useSelector((state) => state?.HomePage);

  useEffect(() => {
    getAllDealOfDayHandle();
  }, []);
  return (
    <div className="dealofday">
      <div className="dealofday_top">
        <h6>Deal Of The Day</h6>
      </div>
      <div className="dealofday_cards">
        <AliceCarousel
          mouseTracking
          responsive={responsive}
          disableButtonsControls
          controlsStrategy="alternate"
        >
          {dealofday?.deal_of_day?.map((item) => (
            <BigCard startDate={item?.startdate} endDate={item?.enddate} />
          ))}
        </AliceCarousel>
      </div>
    </div>
  );
}

export default DealOfDay;
