import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import "./Home.css";
// import Banner from "../Banner/Banner";
import img from "../../Images/banner-1 1.png";
import Header from "../NavBar/Header/Header";
import NewArrivals from "../New Arrivals/NewArrivals";
import OffersSection from "../OffersSection/OffersSection";
import DealOfDay from "../Deal Of Day/DealOfDay";
import FeatureBrands from "../Feature brands/FeatureBrands";
import FashsionBestSeller from "../OffersSection/Fashsion Best Seller/FashsionBestSeller";
import PolicySection from "../Policy Section/PolicySection";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Box, CircularProgress, Modal } from "@mui/material";
import SubNavBar from "../NavBar/SubNavBar/SubNavBar";
import MainNavBar from "../NavBar/MainNavBar/MainNavBar";
import Footer from "../Footer/Footer";
import axios from "axios";
import Featured_Product from "../Pages/Featured Product/Featured Product";
import { useSelector } from "react-redux";
const Banner = lazy(() => import("../Banner/Banner"));
function Home() {
  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
  };
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
  const [isPopup, setIsPopup] = useState(true);
  const [bannerData, setBannerData] = useState();
  const [bestSellerData, setBestSellerData] = useState();
  const [featured, setFeatured] = useState();
  const [newArrival, setNewArrival] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const homeDatahandle = useCallback(async () => {
    const response = await axios
      .get(`${process.env.React_App_Base_Url + "api/home"}`)
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setBannerData(response?.data?.data?.banner && response?.data?.data?.banner);
    setNewArrival(
      response?.data?.data?.new_arrival && response?.data?.data?.new_arrival
    );
    setBestSellerData(
      response?.data?.data?.best_seller && response?.data?.data?.best_seller
    );
    setFeatured(
      response?.data?.data?.featured && response?.data?.data?.featured
    );
    console.log("HomePage");
  }, [window.onload]);
  useEffect(() => {
    homeDatahandle();
  }, [window.onload]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #fff",
    boxShadow: 24,
    p: 4,
    outline: "0",
    borderradius: "5px",
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getPopupHandle = async (id) => {
    const { data } = await axios
      .get(`${process.env.React_App_Base_Url + "api/popup/" + id}`, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    console.log(data);
  };

  useEffect(() => {
    {
      setTimeout(() => {
        if (isPopup) {
          handleOpen();
          setIsPopup(false);
        } else {
          setIsPopup(false);
        }
      }, 10000);
    }
  }, []);
  useEffect(() => {
    getPopupHandle(process.env.React_App_Website_Popup_id);
  }, [process.env.React_App_Website_Popup_id]);
  const { Home, popup } = useSelector((state) => state.HomePage);
  useEffect(() => {
    console.log(isPopup, "isPopup");
  }, [isPopup]);

  return (
    <div className="home">
      <SubNavBar />
      <MainNavBar />
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <AliceCarousel
          mouseTracking
          responsive={responsive}
          disableButtonsControls
          disableDotsControls
          autoPlay
          infinite
          autoPlayInterval={4000}
          // controlsStrategy="alternate"
        >
          {Home?.data?.banner?.map((item) => (
            <Banner img={item?.image ? item?.image : img} />
          ))}
        </AliceCarousel>
      </Suspense>
      <NewArrivals newArrival={Home?.data?.new_arrival} />
      {/* <HotOffer /> */}
      <OffersSection />
      <DealOfDay />
      <FeatureBrands />
      <FashsionBestSeller bestSellerData={Home?.data?.best_seller} />
      {/* <FashsionBestSeller mainTitle='From ₹199' buttonText='View More'/> */}
      <Featured_Product featured={Home?.data?.featured} />
      <PolicySection />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal_pop_up"
        style={{ background: "transprent", border: "none" }}
      >
        <Box sx={style} style={{ padding: "0", border: "none" }}>
          <div className="offerpopup">
            <img
              src={
                `${process.env.React_App_Base_Url + "storage/Popup/image/"}` +
                popup?.Pop_up?.[0]?.image
              }
              alt={popup?.Pop_up?.[0]?.alttag}
              loading="lazy"
            />
          </div>
        </Box>
      </Modal>
      <Footer />
      {isLoading && (
        <Box sx={style1}>
          <CircularProgress />
        </Box>
        // <Skeleton/>
      )}
    </div>
  );
}

export default React.memo(Home);
