import React, { useCallback, useEffect, useState } from "react";
import "./Product.css";
import axios from "axios";
import { Delete, Edit } from "@mui/icons-material";
import { Backdrop, Box, CircularProgress, Fade, Modal } from "@mui/material";
import JoditEditor from "jodit-react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import PaginationPage from "../../Pagination/Pagination";

function Products({ setActivePage }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #fff",
    outline: "0",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
  };
  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    bgcolor: "background.paper",
    border: "2px solid #fff",
    outline: "0",
    boxShadow: 24,
    p: 4,
  };
  const style2 = {
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
  const notify1 = () => toast.warn("SomeThing Went Wrong!");
  const [loading, setLoading] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const token = Cookies.get("adminLogin");
  const [productList, setProductList] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState();
  const [mrp, setMrp] = useState();
  const [productStock, setProductStock] = useState();
  const [skuCode, setSkuCode] = useState();
  const [productTitle, setProductTitle] = useState();
  const [productShortDesc, setProductShortDesc] = useState();
  const [productLongDesc, setproductLongDesc] = useState();
  const [productUploadedImg, setProductUploadedImg] = useState([]);
  const [productCategory, setProductCategory] = useState();
  const [productSubCategory, setProductSubCategory] = useState();
  const [productCategoryId, setProductCategoryId] = useState();
  const [productSubCategoryId, setProductSubCategoryId] = useState();
  const [productId, setProductId] = useState();
  const [productSpecfication, setProductSpecfication] = useState();
  const [productImages, setProductImages] = useState([]);
  const [productStatus, setProductStatus] = useState(0);
  const [featuredProduct, setFeaturedProduct] = useState(0);
  const [newArrival, setNewArrival] = useState(0);
  const [bestSeller, setBestSeller] = useState(0);
  const [productCategoryName, setProductCategoryName] = useState();
  const [productSubCategoryName, setProductSubCategoryName] = useState();
  const [isLoading, setIsLoading] = useState();
  const [search, setSearch] = useState();
  const [searchedData, setSearchedData] = useState();
  const imageHandle = (e) => {
    const file = Array.from(e.target.files);
    console.log(file);
    setProductImages([...productImages, e.target.files[0]]);
    // setPreviewImage([...previewImage, URL.createObjectURL(e.target.files[0])]);
  };
  const productListHandle = async () => {
    const response = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/product"}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    setProductList(response?.data?.list && response?.data?.list);
    console.log(response?.data?.list);
  };
  const productViewhandle = async (id) => {
    const response = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/product/" + id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    setProductId(response?.data?.list?.id && response?.data?.list?.id);
    setSkuCode(response?.data?.list?.sku && response?.data?.list?.sku);
    setProductTitle(response?.data?.list?.title && response?.data?.list?.title);
    setProductShortDesc(
      response?.data?.list?.short_desc && response?.data?.list?.short_desc
    );
    setproductLongDesc(
      response?.data?.list?.long_desc && response?.data?.list?.long_desc
    );
    setProductUploadedImg(
      response?.data?.list?.image && response?.data?.list?.image
    );
    setProductCategoryId(
      response?.data?.list?.category_id?.id &&
        response?.data?.list?.category_id?.id
    );

    setProductSubCategoryId(
      response?.data?.list?.sub_category_id?.id &&
        response?.data?.list?.sub_category_id?.id
    );
    setProductCategoryName(
      response?.data?.list?.category_id?.title &&
        response?.data?.list?.category_id?.title
    );
    setProductSubCategoryName(
      response?.data?.list?.sub_category_id?.title &&
        response?.data?.list?.sub_category_id?.title
    );
    setBestSeller(
      response?.data?.list?.best_seller && response?.data?.list?.best_seller
    );
    setFeaturedProduct(
      response?.data?.list?.featured && response?.data?.list?.featured
    );
    setNewArrival(
      response?.data?.list?.new_arrival && response?.data?.list?.new_arrival
    );
    setProductStatus(
      response?.data?.list?.status && response?.data?.list?.status
    );
    setProductSpecfication(
      response?.data?.list && response?.data?.list?.specification
    );
    setProductStock(response?.data?.list && response?.data?.list?.stock);
    setPrice(response?.data?.list && response?.data?.list?.price);
    setMrp(response?.data?.list && response?.data?.list?.mrp);
    categorieListHandle();
    subCategorieListHandle();
  };
  const productUploadHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", productTitle);
    formData.append("category_id", productCategoryId);
    formData.append("sub_category_id", productSubCategoryId);
    formData.append("short_desc", productShortDesc);
    formData.append("long_desc", productLongDesc);
    formData.append("specification", productSpecfication);
    formData.append("status", productStatus);
    formData.append("new_arrival", newArrival);
    formData.append("featured", featuredProduct);
    formData.append("best_seller", bestSeller);
    formData.append("price", price);
    formData.append("mrp", mrp);
    formData.append("stock", productStock);
    formData.append("sku", skuCode);
    productImages.forEach((img) => {
      formData.append("images[]", img);
    });
    const response = await axios
      .post(
        `${
          process.env.React_App_Base_Url +
          "api/admin/product/update/" +
          productId
        }`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    if (response) {
      notify();
      productListHandle();
    }
    if (!response) {
      notify1();
    }
    console.log(response, "gbghh");
  };
  const categorieListHandle = async () => {
    const response = await axios
      .get(`${process.env.React_App_Base_Url + "api/admin/category"}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    setProductCategory(response?.data?.list && response?.data?.list);
  };
  const subCategorieListHandle = useCallback(async () => {
    const response = await axios
      .get(
        `${
          process.env.React_App_Base_Url +
          "api/admin/getsubcategory/" +
          productCategoryId
        }`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => response, setLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    // console.log(response, "response");
    setProductSubCategory(response?.data?.list && response?.data?.list);
  }, [productCategoryId]);
  const productDeleteHandle = async () => {
    const response = await axios
      .delete(
        `${process.env.React_App_Base_Url + "api/admin/product/" + productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => response, setLoading(true), handleClose1())
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    console.log(response);
    if (response) {
      notify();
      productListHandle();
    }
    if (!response) {
      notify1();
    }
  };
  useEffect(() => {
    setCount(Math.ceil(productList?.length / 10).toFixed(0));
  }, [productList]);
  useEffect(() => {
    productListHandle();
    categorieListHandle();
  }, []);
  useEffect(() => {
    subCategorieListHandle();
  }, [productCategoryId]);
  const searchDataHandle = async () => {
    const result = await productList?.filter((item) => {
      if (search !== "") {
        // console.log(item.productName.toLowerCase().includes(search.toLowerCase()))
        return item.title.toLowerCase().includes(search.toLowerCase());
      }
    });
    setSearchedData(result && result);
  };
  const productStatusHandle = async (id, status) => {
    const formData = new FormData();
    formData.append("status", status == 1 ? 0 : 1);
    const { data } = await axios

      .post(
        `${
          process.env.React_App_Base_Url +
          "api/admin/product/status_update/" +
          id
        }`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    if (data) {
      notify();
      productListHandle();
    }
    if (!data) {
      notify1();
    }

    console.log(data);
  };
  useEffect(() => {
    searchDataHandle();
  }, [search]);

  return (
    <div className="product">
      <div className="product_heading">
        <h3>Products</h3>
        <button onClick={() => setActivePage("Add Product")}>
          Add Product
        </button>
      </div>
      <div className="product_product">
        <div className="product_search_bar">
          <span className="order_top_search_span_input">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            {searchedData?.length === 0 && search != "" && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                No Data Found
              </span>
            )}
          </span>
          <div>
            <span>
              <select
                name="product_type"
                id="cars"
                onChange={(e) => console.log(e.target.value)}
              >
                <option value="">All Categories</option>
                {productCategory?.map((item) => (
                  <option value={item?.title}>{item?.title}</option>
                ))}
              </select>
            </span>
          </div>
        </div>
        <div className="product_cards_admin">
          <table id="customers">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Image</th>
                <th>Product Title</th>
                <th>Product Price</th>
                <th>Action</th>
                {/* <th>View</th> */}
              </tr>
            </thead>
            <tbody>
              {(searchedData?.length > 0 ? searchedData : productList)
                ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
                ?.map((item, index) => (
                  <tr key={item?.id}>
                    <td>
                      <strong>{index + 1}</strong>
                    </td>
                    <td>
                      <img
                        src={item?.image?.image[0]}
                        style={{ height: "50px", width: "50px" }}
                      />
                    </td>
                    <td>
                      <p>{item?.title}</p>
                    </td>
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={item?.status === 1 ? true : false}
                          // checked={productStatus===1?checked:''}
                          onClick={() =>
                            productStatusHandle(item?.id, item?.status)
                          }
                          name="product_type"
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>
                      <Edit
                        style={{ color: "lightgray" }}
                        onClick={() => handleOpen(productViewhandle(item?.id))}
                      />
                      <Delete
                        style={{ color: "#FF8D60" }}
                        onClick={() => handleOpen1(setProductId(item?.id))}
                      />
                    </td>
                    {/* <td>
                    <p
                      style={{
                        color: "#fff",
                        background: "#FF8D60",
                        width: "60px",
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center",
                        padding: "5px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleOpen2(productViewhandle(item?.id))}
                    >
                      View
                    </p>
                  </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="productpage_pagination" style={{ marginTop: "10px" }}>
          <PaginationPage count={count} setPage={setPage} />
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="productViewModal">
              <form onSubmit={productUploadHandle}>
                <span>
                  <p>Product Category</p>

                  <select
                    value={productCategoryId}
                    style={{ width: "100%", height: "30px" }}
                    onChange={(e) => setProductCategoryId(e.target.value)}
                  >
                    <option value="">Select One Category</option>
                    {productCategory?.map((item) => (
                      <option value={item?.id}>{item?.title}</option>
                    ))}
                  </select>
                </span>
                <span>
                  <p>Product Sub Category</p>

                  <select
                    style={{ width: "100%", height: "30px" }}
                    value={productSubCategoryId}
                    onChange={(e) => setProductSubCategoryId(e.target.value)}
                  >
                    <option value="">Select One Sub Category</option>
                    {productSubCategory?.map((item) => (
                      <option value={item?.id}>{item?.title}</option>
                    ))}
                  </select>
                </span>
                <span>
                  <p>Product Title</p>
                  <span>
                    <input
                      type="text"
                      placeholder="Product Title"
                      value={productTitle ? productTitle : ""}
                      onChange={(e) => setProductTitle(e.target.value)}
                    />
                  </span>
                </span>
                <span>
                  <p>Product Price</p>
                  <span>
                    <input
                      type="text"
                      placeholder="Product Price"
                      value={price ? price : ""}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </span>
                </span>
                <span>
                  <p>Product Mrp</p>
                  <span>
                    <input
                      type="text"
                      placeholder="Sku Code"
                      value={mrp ? mrp : ""}
                      onChange={(e) => setMrp(e.target.value)}
                    />
                  </span>
                </span>
                <span>
                  <p>Product Stock</p>
                  <span>
                    <input
                      type="text"
                      placeholder="Sku Code"
                      value={productStock ? productStock : ""}
                      onChange={(e) => setProductStock(e.target.value)}
                    />
                  </span>
                </span>
                <span>
                  <p>Sku Code</p>
                  <span>
                    <input
                      type="text"
                      placeholder="Sku Code"
                      value={skuCode ? skuCode : ""}
                      onChange={(e) => setSkuCode(e.target.value)}
                    />
                  </span>
                </span>

                <span>
                  <p>Product Image</p>
                  <span>
                    <input
                      type="file"
                      placeholder="Product File"
                      onChange={imageHandle}
                    />
                  </span>
                  <p>Uploaded Image</p>
                  <span className="productUploadedImage">
                    {/* {productUploadedImg?.map((item) => (
                      <img src={item} alt="product" />
                    ))} */}
                  </span>
                </span>
                <span>
                  <p>Product Sort Description</p>
                  <span>
                    <textarea
                      style={{ width: "100%", border: "none", outline: "none" }}
                      rows={5}
                      placeholder="Product Short Desc"
                      value={productShortDesc ? productShortDesc : ""}
                      onChange={(e) => setProductShortDesc(e.target.value)}
                    />
                  </span>
                </span>
                <span>
                  <p>Product Long Description</p>
                  <span>
                    <JoditEditor
                      value={productLongDesc ? productLongDesc : ""}
                      onChange={(newContent) => setproductLongDesc(newContent)}
                    />
                  </span>
                </span>
                <span>
                  <p>Product Specification</p>
                  <span>
                    <JoditEditor
                      value={productSpecfication}
                      onChange={(newContent) =>
                        setProductSpecfication(newContent)
                      }
                    />
                  </span>
                </span>
                <div
                  className="addproduct_form_div_checkbox"
                  style={{ marginTop: "20px" }}
                >
                  <span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          setFeaturedProduct(e.target.checked === true ? 1 : 0)
                        }
                        checked={featuredProduct === 1 ? true : false}
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
                        onChange={(e) =>
                          setBestSeller(e.target.checked === true ? 1 : 0)
                        }
                        checked={bestSeller === 1 ? true : false}
                        name="product_type"
                      />
                      <span className="slider round"></span>
                    </label>
                    <p>Best Seller</p>
                  </span>
                  <span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          setNewArrival(e.target.checked === true ? 1 : 0)
                        }
                        checked={newArrival === 1 ? true : false}
                        name="product_type"
                      />
                      <span className="slider round"></span>
                    </label>
                    <p>New Arrival</p>
                  </span>
                  <span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        onClick={(e) => [
                          setProductStatus(e.target.checked === true ? 1 : 0),
                        ]}
                        checked={productStatus === 1 ? true : false}
                        // checked={productStatus===1?checked:''}
                        name="product_type"
                      />
                      <span className="slider round"></span>
                    </label>
                    <p>Product Status</p>
                  </span>
                </div>
                <span className="updateProduct">
                  <button type="submit">Update Product</button>
                </span>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open1}>
          <Box sx={style1}>
            <div className="productDeleteModal">
              <p> Are You Sure ?</p>
              <span>
                <button>NO</button>
                <button onClick={productDeleteHandle}>Yes</button>
              </span>
            </div>
          </Box>
        </Fade>
      </Modal>

      {loading && (
        <Box sx={style2}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default Products;
