import React, { useEffect, useState } from "react";
import "./Categories.css";
import { useSelector } from "react-redux";
import axios from "axios";
function Categories({ setProductRange, id, categoryId }) {
  const [priceRange, setPriceRange] = useState(500000);
  const [isLoading, setIsLoading] = useState(false);

  const { category } = useSelector((state) => state.category);
  const getDataByCategoryHandle = async (id) => {
    const { data } = await axios
      .get(
        `${
          process.env.React_App_Base_Url + "api/get-product-by-category/" + id
        }`,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      )
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));

    console.log(data);
  };
  useEffect(() => {
    setProductRange(priceRange);
  }, [priceRange]);
  return (
    <div className="categories">
      <h6>Filter</h6>
      <div className="categories_range">
        <span>
          <p>Price Range</p>
          <strong>₹{priceRange}</strong>
        </span>
        <input
          type="range"
          min="100"
          max="500000"
          step="50"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        />
      </div>
      <div className="categories_discount">
        <span>
          <h6>Category</h6>
        </span>

        <div>
          {category?.searchdata?.map((item) => (
            <span className={categoryId === item?.id && "active_category"}>
              <p
                className="category_title"
                onClick={() => getDataByCategoryHandle(item?.id)}
              >
                {item?.title}
              </p>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
