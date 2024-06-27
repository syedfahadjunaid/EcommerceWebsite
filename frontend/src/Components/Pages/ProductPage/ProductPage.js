import React, { useCallback, useEffect, useState } from "react";
import "./ProductPage.css";
import Categories from "../../../Categories/Categories";
import PaginationPage from "../../../Pagination/Pagination";
import ProductCard from "../../../Cards/ProductCard/ProductCard";
import AddressNavBar from "../../NavBar/AddressNavBar/AddressNavBar";
import { useSelector } from "react-redux";
import CustomBottomNavigation from "../../../BottomNavigation/BottomNavigation";
import SubNavBar from "../../NavBar/SubNavBar/SubNavBar";
import MainNavBar from "../../NavBar/MainNavBar/MainNavBar";
import Footer from "../../Footer/Footer";
import { FormatListBulleted, GridView } from "@mui/icons-material";
import ElectronicItemCard from "../../../Cards/Electronic Item Card/ElectronicItemCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";

function ProductPage() {
  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    bgcolor: "transprent",
    border: "0px solid transprent",
    outline: "0",
    // boxShadow: 24,
    p: 4,
  };
  const { product } = useSelector((state) => state?.allProduct);
  const [products, setProducts] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [productRange, setProductRange] = useState();
  const [filteredProduct, setFilteredProduct] = useState();
  const [categoryId, setCategoryId] = useState();
  useEffect(() => {
    setCount(Math.ceil(products?.length / 12).toFixed(0));
  }, [products]);
  const [gridOn, setGridOn] = useState(true);
  const [listOn, setListOn] = useState(false);
  const gridHandle = () => {
    setGridOn(true);
    setListOn(false);
  };
  const listHandle = () => {
    setGridOn(false);
    setListOn(true);
  };
  const [isLoading, setIsLoading] = useState();
  const { newarrival, searchData } = useParams();
  const getNewArrivalDataHandle = useCallback(async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/new-arrival-product"}`, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setProducts(data && data?.Product);
    console.log(data);
  }, [newarrival]);
  const getFeatureProductHandle = useCallback(async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/featured-product"}`, {
        headers: { "Content-type": "multipart/form-date" },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setProducts(data && data?.Product);
    console.log(data, "featuredProduct");
  }, [newarrival]);
  const getBestSellerProductHandle = useCallback(async () => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/best-seller-product"}`, {
        headers: { "Content-type": "multipart/form-date" },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setProducts(data && data?.Product);

    console.log(data, "best seller");
  }, [newarrival]);
  useEffect(() => {
    newarrival === "newarrival" && getNewArrivalDataHandle();
    newarrival === "featuredProduct" && getFeatureProductHandle();
    newarrival === "bestseller" && getBestSellerProductHandle();
  }, [newarrival]);
  const filterAccordingToPriceRange = () => {
    const filter = products?.filter((item) => item?.price <= productRange);
    setFilteredProduct(filter && filter);

    if (searchData && productRange) {
      // console.log(searchData, "searchData filter searchdata", products);
      const filter = product?.Product?.filter((item) => {
        return (
          item?.price <= productRange &&
          item?.title?.toLowerCase().includes(searchData?.toLowerCase())
        );
      });
      setFilteredProduct(filter && filter);
      // console.log(filter, "filter searchdata");
    }
  };

  useEffect(() => {
    filterAccordingToPriceRange();
  }, [productRange, searchData]);
  // useEffect(() => {
  //   getDataByCategoryHandle(categoryId);
  // }, [categoryId]);

  return (
    <div className="productpage">
      <SubNavBar />
      <MainNavBar />

      <AddressNavBar />
      <div className="productpage_top">
        <div className="productpage_left">
          <Categories
            setProductRange={setProductRange}
            id={setCategoryId}
            categoryId={categoryId}
          />
        </div>
        <div className="productpage_right">
          <div className="productpage_right_sortby">
            <h6>Sort by</h6>
            <p>populaarity</p>
            <p>Price -- low to high</p>
            <p>Price -- high to low</p>
            <span className="productGridListView">
              <GridView
                className={
                  gridOn
                    ? "productGridListView_active"
                    : "productGridListView_inactive"
                }
                onClick={gridHandle}
              />{" "}
              |{" "}
              <FormatListBulleted
                className={
                  listOn
                    ? "productGridListView_active"
                    : "productGridListView_inactive"
                }
                onClick={listHandle}
              />
            </span>
          </div>
          {gridOn && (
            <div className="productpage_right_cards">
              {filteredProduct
                ? filteredProduct?.length > 0 &&
                  filteredProduct?.map((item, index) => (
                    <ProductCard
                      key={index}
                      title={item.title}
                      image={item?.image?.image?.[0]}
                      price={item.price}
                      id={item?.id}
                      sort_desc={item?.short_desc}
                    />
                  ))
                : products
                    ?.slice((page - 1) * 12, (page - 1) * 12 + 12)
                    ?.map((item, index) => (
                      <ProductCard
                        key={index}
                        title={item.title}
                        image={item?.image?.image?.[0]}
                        price={item.price}
                        id={item?.id}
                        sort_desc={item?.short_desc}
                      />
                    ))}
            </div>
          )}
          {listOn && (
            <div className="productpage_right_cards">
              {products
                ?.slice((page - 1) * 12, (page - 1) * 12 + 12)
                ?.map((item, index) => (
                  <ElectronicItemCard
                    key={index}
                    title={item.title}
                    image={item.img}
                    price={item.price}
                    item={item}
                    id={item.id}
                    mrp={item.mrp}
                  />
                ))}
            </div>
          )}
        </div>
        {isLoading && (
          <Box sx={style1}>
            <CircularProgress />
          </Box>
        )}
      </div>

      <div className="productpage_pagination">
        <PaginationPage count={count} setPage={setPage} />
      </div>
      <div className="custombottomnavigation">
        <CustomBottomNavigation />
      </div>
      <Footer />
    </div>
  );
}

export default ProductPage;
