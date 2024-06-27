import React from "react";
import "./AddressNavBar.css";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
function AddressNavBar() {
  const { newarrival, searchData } = useParams();
  return (
    <div className="addressbar">
      <div className="addressbar_head">
        <p>
          <Link to="/">Home</Link> <KeyboardArrowRight />
          {newarrival ? newarrival : searchData}
        </p>
      </div>
    </div>
  );
}

export default AddressNavBar;
