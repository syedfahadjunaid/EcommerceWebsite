import React, { useEffect, useState } from "react";
import "./BigCard.css";
import img from "../../Images/shampoo 1.jpg";
import { Star, StarHalf } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
function BigCard({ image, title, timer, startDate, endDate }) {
  const [expired, setExpired] = useState();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [sec, setSec] = useState(0);
  const deadline = `${timer ? timer : "December ,31,2024"}`;
  const getTime = () => {
    if (Date.parse(endDate) - Date.now() <= 0) {
      setExpired("Expired");
    } else {
      const time = Date.parse(endDate) - Date.now();
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMins(Math.floor((time / 1000 / 60) % 60));
      setSec(Math.floor((time / 1000) % 60));
    }
  };
  useEffect(() => {
    setInterval(() => {
      getTime();
    }, 1000);
  }, []);
  useEffect(() => {
    console.log(expired, "expired");
  }, [expired]);
  const history = useNavigate();
  return (
    <div className="bigcard" onClick={() => history("/singleProduct/121")}>
      <div className="bigcard_left">
        <img src={image ? image : img} alt="product img" loading="lazy" />
      </div>
      <div className="bigcard_right">
        <div className="bigcard_right_review">
          <Star style={{ color: "#FFAC4B" }} />
          <Star style={{ color: "#FFAC4B" }} />
          <Star style={{ color: "#FFAC4B" }} />
          <Star style={{ color: "#FFAC4B" }} />
          <StarHalf style={{ color: "#FFAC4B" }} />
        </div>
        <div className="bigcard_right_title">
          <p>{title ? title : "SHAMPOO, CONDITIONER & FACEWASH PACKS"}</p>
        </div>
        <div className="bigcard_right_description">
          <p>
            Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit
            amet consectetur Lorem ipsum dolor
          </p>
        </div>
        <div className="bigcard_right_price">
          <strong style={{ color: "#2874f0", marginRight: "12px" }}>
            ₹350.00
          </strong>
          <s>₹500.00</s>
        </div>
        <div className="bigcard_right_countdown">
          <div className="bigcard_right_countdown_heading">
            <p>HURRY UP! OFFER ENDS IN:</p>
          </div>
          {!expired ? (
            <div className="bigcard_right_countdown_timer">
              <span>
                <strong> {days < 10 ? "0" + days : days} </strong>
                <p>Days</p>
              </span>
              <span>
                <strong> {hours < 10 ? "0" + hours : hours} </strong>
                <p>Hr</p>
              </span>
              <span>
                <strong>{mins < 10 ? "0" + mins : mins} </strong>
                <p>Mins</p>
              </span>
              <span>
                <strong>{sec < 10 ? "0" + sec : sec}</strong>
                <p>Sec</p>
              </span>
            </div>
          ) : (
            expired
          )}
        </div>
      </div>
    </div>
  );
}

export default BigCard;
