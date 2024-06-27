import React, { useCallback, useEffect, useState } from "react";
import "./AddProduct.css";
// import { Editor } from "@tinymce/tinymce-react";
// import { useRef } from "react";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";

import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
function AddProduct() {
  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    bgcolor: "transprent",
    border: "2px solid transprent",
    outline: "0",
    // boxShadow: 24,
    p: 4,
  };
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Submitted  Successfully!");
  const [loading, setLoading] = useState();
  const [categorieId, setCategorieId] = useState();
  const [subCategorieId, setSubCategorieId] = useState();
  const [innerSubCategorieId, setInnerSubCategorieId] = useState();
  const [categorieList, setCategorieList] = useState();
  const [subCategorieList, setSubCategorieList] = useState();
  const [productTitle, setProductTitle] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productMrp, setProductMrp] = useState();
  const [productStock, setProductStock] = useState();
  const [productDesc, setProductDesc] = useState();
  const [productSortDesc, setProductSortDesc] = useState();
  const [productSpecfication, setProductSpecfication] = useState();
  const [productImages, setProductImages] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const [productDescription, setProductDescription] = useState();
  const [productSkuCode, setProductSkuCode] = useState();
  const [featuredProduct, setFeaturedProduct] = useState(0);
  const [bestSeller, setBestSeller] = useState(0);
  const [newArrival, setNewArrival] = useState(0);
  const [activateProduct, setActivateProduct] = useState(0);
  const [filteredSubCategory, setFilteredSubCategory] = useState();
  const [innerSubCategoryList, setInnerSubCategoryList] = useState();
  const [filteredInnerSubCategory, setFilteredInnerSubCategory] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [taxValue, setTaxValue] = useState();

  const imageHandle = (e) => {
    const file = Array.from(e.target.files);
    const imageFiles = file.map((file) => URL.createObjectURL(file));
    const imageFiles1 = file.map((file) => file);

    setProductImages((prevImages) => [...prevImages, ...imageFiles1]);

    setPreviewImage((prevImages) => [...prevImages, ...imageFiles]);
  };
  const token = Cookies.get("adminLogin");

  const getCategoryListHandle = async () => {
    const response = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/category"}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    setCategorieList(response?.data?.list && response?.data?.list);
    setCategorieId(response?.data?.list[0]?.id && response?.data?.list[0]?.id);
    console.log(response?.data?.list, "categories");
  };
  const getSubCategoryListHandle = async () => {
    const response = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/subcategory"}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    setSubCategorieList(response?.data?.list && response?.data?.list);
    // setSubCategorieId(
    //   response?.data?.list[0]?.id && response?.data?.list[0]?.id
    // );
    console.log(response, "subcat");
  };
  const getInnerSubCategoryListHandle = async () => {
    const response = await axios
      .get(
        `${process.env.React_App_Base_Url + "api/admin/all-InnerSubCategory"}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    setInnerSubCategoryList(response && response?.data?.data);

    console.log(response, "inner sub cat");
  };
  const subCategorieListHandle = (id) => {
    const filter = subCategorieList?.filter((item) => item?.category_id == id);
    setFilteredSubCategory(filter && filter);
  };
  const innerSubCategoryHandle = useCallback(() => {
    const filter = innerSubCategoryList?.filter((item) => {
      return (
        item?.categories_id == categorieId &&
        item?.sub_categorise_id == subCategorieId
      );
    });
    setFilteredInnerSubCategory(filter && filter);
  }, [categorieId, subCategorieId]);
  const addProductHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", productTitle);
    formData.append("category", categorieId);
    formData.append("subcategory", subCategorieId);
    formData.append("innersub_category_id", innerSubCategorieId);
    formData.append("sku", productSkuCode);
    formData.append("stock", productStock);
    formData.append("mrp", productMrp);
    formData.append("price", productPrice);
    formData.append("gst", taxValue);
    // for(let i=0;i<productImages.length;i++){
    productImages.forEach((img) => {
      formData.append("images[]", img);
    });
    formData.append("short_desc", productSortDesc);
    formData.append("long_desc", productDescription);
    formData.append("specification", productSpecfication);
    formData.append("new_arrival", newArrival);
    formData.append("featured", featuredProduct);
    formData.append("best_seller", bestSeller);
    formData.append("status", activateProduct);

    const response = await axios
      .post(
        `${process.env.React_App_Base_Url + "api/admin/product"}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-date",
          },
        }
      )
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));

    if (response) {
      notify();
    }
    if (!response) {
      notify1();
    }
    setProductTitle("");
    setProductDescription("");
    setProductSortDesc("");
    setProductSpecfication("");
    setProductImages([]);
    setProductMrp("");
    setProductPrice("");
    setProductSkuCode("");
    setProductStock("");
    setFeaturedProduct(0);
    setActivateProduct(0);
    setNewArrival(0);
    setBestSeller(0);
    setPreviewImage([]);

    console.log(response);
  };
  useEffect(() => {
    getCategoryListHandle();
    getSubCategoryListHandle();
    getInnerSubCategoryListHandle();
  }, []);
  useEffect(() => {
    innerSubCategoryHandle();
  }, [categorieId, subCategorieId]);
  useEffect(() => {
    console.log(taxValue, "taxValue");
  }, [taxValue]);

  return (
    <div className="addproduct">
      <div className="addproduct_heading">
        <h3>Add Product</h3>
      </div>
      <div className="addproduct_form">
        <form
          onSubmit={addProductHandle}
          encType="multipart/form-data"
          method="post"
          action="/api-endpoitn"
        >
          <div className="addproduct_form_div">
            <p>CATEGORY</p>
            <select
              onChange={(e) => [
                setCategorieId(e.target.value),
                subCategorieListHandle(e.target.value),
              ]}
              required
            >
              <option>Select a Category</option>
              {categorieList?.map((item) => (
                <option value={item.id}>{item?.title}</option>
              ))}
            </select>
          </div>
          <div className="addproduct_form_div">
            <p>SUBCATEGORY</p>
            <select
              onChange={(e) => setSubCategorieId(e.target.value)}
              required
            >
              <option>Select a SubCategory</option>
              {filteredSubCategory?.map((item) => (
                <option value={item?.id}>{item?.title}</option>
              ))}
            </select>
          </div>
          <div className="addproduct_form_div">
            <p>Inner SubCategory</p>
            <select
              onChange={(e) => setInnerSubCategorieId(e.target.value)}
              required
            >
              <option>Select a Inner SubCategory</option>
              {filteredInnerSubCategory?.map((item) => (
                <option value={item?.id}>{item?.title}</option>
              ))}
            </select>
          </div>
          <div>
            <p>Product Title</p>
            <input
              type="text"
              placeholder="Product Title"
              onChange={(e) => setProductTitle(e.target.value)}
              value={productTitle}
              required
            />
          </div>
          <div>
            <p>Product Price </p>
            <input
              type="number"
              placeholder="Product Price"
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
              required
            />
          </div>
          <div>
            <p>Product Mrp </p>
            <input
              type="number"
              placeholder="Product Mrp"
              onChange={(e) => setProductMrp(e.target.value)}
              value={productMrp}
              required
            />
          </div>
          <div>
            <p>Product Count In Stock </p>
            <input
              type="number"
              placeholder="Product Stock"
              onChange={(e) => setProductStock(e.target.value)}
              value={productStock}
              required
            />
          </div>
          <div>
            <p>Product Sku Code </p>
            <input
              type="text"
              placeholder="Product Stock"
              onChange={(e) => setProductSkuCode(e.target.value)}
              value={productSkuCode}
              required
            />
          </div>
          <div>
            <p style={{ marginBottom: "10px" }}>Product Active </p>
            <label className="switch">
              <input
                type="checkbox"
                onChange={(e) =>
                  setActivateProduct(e.target.value === "on" ? "1" : "0")
                }
                required
                name="product_type"
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div>
            <p>Product Sort Desc </p>
            <textarea
              rows={5}
              placeholder="Product Sort Desc"
              onChange={(e) => setProductSortDesc(e.target.value)}
              value={productSortDesc}
              required
            />
          </div>
          <div>
            <p>Product Description </p>
            <JoditEditor
              onChange={(newContent) => setProductDescription(newContent)}
            />
          </div>
          <div>
            <p>Product Specification </p>
            <JoditEditor
              onChange={(newContent) => setProductSpecfication(newContent)}
            />
          </div>
          <div>
            <p>Image </p>
            <input
              type="file"
              onChange={imageHandle}
              accept="image/*"
              multiple
              required
            />
            <span className="productPrevImg">
              {previewImage?.map((item) => (
                <img src={item} className="productPrevImg" />
                // console.log(item,'item')
              ))}
            </span>
          </div>
          <p>
            <input
              type="checkbox"
              onChange={(e) => setIsChecked(e.target.checked)}
            />{" "}
            Is Product Eligible For Tax
          </p>

          {isChecked && (
            <div className="addproduct_form_div">
              <p>Tex Slab</p>
              <select onChange={(e) => setTaxValue(e.target.value)}>
                <option>Select a Percentage Slab</option>
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
              </select>
            </div>
          )}
          <div className="addproduct_form_div_checkbox">
            <span>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setFeaturedProduct(e.target.value === "on" ? "1" : "0")
                  }
                  name="product_type"
                />
                <span className="slider round"></span>
              </label>
              <p>Featured Product</p>
            </span>
            <span>
              <label className="switch">
                <input
                  type="checkbox"
                  name="product_type"
                  onChange={(e) =>
                    setNewArrival(e.target.value === "on" ? "1" : "0")
                  }
                />
                <span className="slider round"></span>
              </label>
              <p>New Arrival</p>
            </span>
            <span>
              <label className="switch">
                <input
                  type="checkbox"
                  name="product_type"
                  onChange={(e) =>
                    setBestSeller(e.target.value === "on" ? "1" : "0")
                  }
                />
                <span className="slider round"></span>
              </label>
              <p>Best Seller</p>
            </span>
          </div>
          <span className="addproduct_form_button_span">
            <button className="addproduct_form_button">Add Product</button>
          </span>
        </form>
      </div>
      {loading && (
        <Box sx={style1}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default AddProduct;
