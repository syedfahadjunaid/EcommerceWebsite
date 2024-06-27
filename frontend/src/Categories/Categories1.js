import React, { useState } from "react";
import "./Categories.css";
import { KeyboardArrowDown } from "@mui/icons-material";
function Categories() {
  const [priceRange,setPriceRange]=useState(500);
  const [discount,setDiscount]=useState(false);
  const [brands,setBrands]=useState(false);
  const [ram,setRam]=useState(false);
  const [interStorage,setInterStorage]=useState(false);
  return (
    <div className="categories">
      <h6>Filter</h6>
      <div className="categories_range">
        <span>
          <p>Price Range</p>
          <strong>₹{priceRange}</strong>
        </span>
        <input type="range" min='100' max='5000' step='50' value={priceRange} onChange={(e)=>setPriceRange(e.target.value)}/>
      </div>
      <div className="categories_discount">
        <span onClick={()=>setDiscount(!discount)}>
          <h6>Discount</h6>
          <KeyboardArrowDown className={discount?'transformRotate':''}/>
        </span>
       {discount && <div>
          <span>
            <input type="checkbox" />
            <p>50% or more </p>
          </span>
          <span>
            <input type="checkbox" />

            <p>60% or more </p>
          </span>
          <span>
            <input type="checkbox" />

            <p>70% or more </p>
          </span>
          <span>
            <input type="checkbox" />

            <p>80% or more </p>
          </span>
        </div>}
      </div>
      <div className="categories_brands">
      <span onClick={()=>setBrands(!brands)}>
          <h6>Brands</h6>
          <KeyboardArrowDown className={brands?'transformRotate':''}/>
        </span>
        {brands && <div>
           
            <span>
                <input type='checkbox'/>
                <p>Bare</p>
            </span>
             <span>
                <input type='checkbox'/>
                <p>Yurz</p>
            </span>
             <span>
                <input type='checkbox'/>
                <p>Gloomy</p>
            </span> 
            <span>
                <input type='checkbox'/>
                <p>Blawd</p>
            </span> 
            <span>
                <input type='checkbox'/>
                <p>Berky</p>
            </span>
        </div>}
      </div>
      <div className="categories_brands">
      <span onClick={()=>setRam(!ram)}>
          <h6>RAM</h6>
          <KeyboardArrowDown className={discount?'transformRotate':''}/>
        </span>
      {ram &&  <div>
           
            <span>
                <input type='checkbox'/>
                <p>4GB</p>
            </span>
             <span>
                <input type='checkbox'/>
                <p>6GB</p>
            </span>
             <span>
                <input type='checkbox'/>
                <p>8GB</p>
            </span> 
            <span>
                <input type='checkbox'/>
                <p>12GB</p>
            </span> 
            <span>
                <input type='checkbox'/>
                <p>16GB</p>
            </span>
        </div>}
      </div>
       <div className="categories_brands">
      <span onClick={()=>setInterStorage(!interStorage)}>
          <h6>Internal Storage</h6>
          <KeyboardArrowDown className={interStorage?'transformRotate':''}/>
        </span>
        {interStorage && <div>
           
            <span>
                <input type='checkbox'/>
                <p>16GB</p>
            </span>
             <span>
                <input type='checkbox'/>
                <p>32GB</p>
            </span>
             <span>
                <input type='checkbox'/>
                <p>64GB</p>
            </span> 
            <span>
                <input type='checkbox'/>
                <p>128GB</p>
            </span> 
            <span>
                <input type='checkbox'/>
                <p>256GB</p>
            </span>
        </div>}
      </div>
    </div>
  );
}

export default Categories;
