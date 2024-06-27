import React from "react";
import "./RatingCard.css";
import { Done, Star, ThumbDown, ThumbUp } from "@mui/icons-material";
function RatingCard({ product_review, rating }) {
  return (
    <div className="ratingcard">
      <div className="ratingcard_header">
        <span>
          <p>{rating}</p>
          <Star style={{ color: "#FFE600", fontSize: "16px" }} />
        </span>
        <p>{product_review}</p>
      </div>
    </div>
  );
}

export default RatingCard;
