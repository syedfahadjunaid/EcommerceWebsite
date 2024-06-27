import React, { Suspense } from "react";
import "./Banner.css";
import image from "../../Images/Overlay.jpg";
import { Link } from "react-router-dom";

function Banner({ img, link }) {
  return (
    <div className="banner">
      <Suspense fallback={<p>Loading...</p>}>
        <Link to="/product">
          <img src={img ? img : image} />
        </Link>
      </Suspense>
    </div>
  );
}

export default React.memo(Banner);
