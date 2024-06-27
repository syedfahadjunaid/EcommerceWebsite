import React from "react";
import Button from "../../../Button/Button";
import ProductCard from "../../../Cards/ProductCard/ProductCard";

function Featured_Product({ featured }) {
  return (
    <div className="newarrivals">
      <div className="newarrivals_header">
        <h6>Featured Product</h6>
        <Button color="#2874F0" link="/product/featuredProduct">
          {" "}
          View More
        </Button>
      </div>
      <div className="newarrivals_cards">
        {featured?.map((item) => (
          <ProductCard
            title={item?.title}
            image={item?.image?.image[0]}
            sort_desc={item?.short_desc}
            id={item?.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Featured_Product;
