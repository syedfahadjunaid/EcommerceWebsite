import React from "react";
import "./FashsionBestSeller.css";
import Button from "../../../Button/Button";
import ProductCard from "../../../Cards/ProductCard/ProductCard";
function FashsionBestSeller({ mainTitle, buttonText, bestSellerData }) {
  return (
    <div className="fashsionbestseller">
      <div className="fashsionbestseller_header">
        <h6>{mainTitle ? mainTitle : "Best Sellers"}</h6>
        <Button color="#2874F0" link="/product/bestseller">
          {buttonText ? buttonText : "View More"}
        </Button>
      </div>
      <div className="fashsionbestseller_cards newarrivals_cards">
        {bestSellerData?.map((item) => (
          <ProductCard
            id={item?.id}
            image={item?.image?.image[0]}
            title={item?.title}
            mrp={item?.mrp}
            price={item?.price}
          />
        ))}

        {/* <HotDealCard color='#2874F0' image={img1} title='Sparx, Bata, Paragon...' price='₹299' price_tag='Under' description='Mens Footwear'/>
        <HotDealCard color='#2874F0' image={img2} title='Top Rated Dress Materials' price='₹299' price_tag='Under' description='Lowest Prices Ever!'/>
        <HotDealCard color='#2874F0' image={img3} title='Backpacks' price='₹299' price_tag='Under' description='Backpacks'/> */}
      </div>
    </div>
  );
}

export default FashsionBestSeller;
