import React, { Suspense, lazy } from "react";
import "./NewArrivals.css";
import Button from "../../Button/Button";
// import ProductCard from "../../Cards/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
// import HotDealCard from '../../Cards/HotDealCard/HotDealCard'
const ProductCard = lazy(() => import("../../Cards/ProductCard/ProductCard"));
function NewArrivals({ newArrival }) {
  const items = useSelector((state) => state.allCart.items);
  return (
    <div className="newarrivals">
      <div className="newarrivals_header">
        <h6>New Arrivals</h6>
        <Button color="#2874F0" link="/product/newarrival">
          View More
        </Button>
      </div>
      <div className="newarrivals_cards">
        {newArrival?.map((item) => (
          <Suspense fallback={<Skeleton />}>
            <ProductCard
              key={item.id}
              id={item?.id}
              title={item?.title}
              price={item?.price}
              image={item?.image?.image[0]}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
