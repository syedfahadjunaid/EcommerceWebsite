import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// import Header from './Components/NavBar/Header/Header';
// import Home from "./Components/Home/Home";
// import ProductPage from "./Components/Pages/ProductPage/ProductPage";
// import SingleProductPage from "./Components/Pages/SingleProductPage/SingleProductPage";
import GoToTop from "./GoToTop";
// import ElectronicItemPage from "./Components/Pages/Electronic Item Page/ElectronicItemPage";
// import DiscountPricePage from "./Components/Pages/DiscountPricePage/DiscountPricePage";
// import Policy from "./Components/Pages/Policy/Policy";
// import TermsAndCondition from "./Components/Pages/Policy/Terms and condition/TermsAndCondition";
// import ReturnandRefund from "./Components/Pages/Policy/Return and Refund Policy/ReturnandRefund";
// import AboutUs from "./Components/Pages/Policy/About Us/AboutUs";
// import UserProfile from "./Components/Pages/UserProfile/UserProfile";
// import Cart from "./Components/Pages/Cart/Cart";
// import CheckOut from "./Components/Pages/CheckOut/CheckOut";
// import CategoriesPage from "./CategoriesPage/CategoriesPage";
// import ForgetPassword from "./Components/Pages/Forget Password/ForgetPassword";
// import WishList from "./Components/Pages/WishList/WishList";
// import AdminLoginPage from "./adminPanel/AdminLoginPage";
// import NotFound from "./404/404";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { allPagesData } from "./Slice/pagesSlice";
import { allProductData } from "./Slice/productSlice";
import {
  deal_of_day_Data,
  getIconsData,
  getWebsiteSettingData,
  header_data,
  homepageData,
  homepagePopData,
} from "./Slice/HomeSlice";
import Cookies from "js-cookie";
import { wishListData } from "./Slice/wishListSlice";
import { cartDataHandle } from "./Slice/cartSlice";
import { allCategoryData } from "./Slice/categorySlice";
const Home = lazy(() => import("./Components/Home/Home"));
const ProductPage = lazy(() =>
  import("./Components/Pages/ProductPage/ProductPage")
);
const SingleProductPage = lazy(() =>
  import("./Components/Pages/SingleProductPage/SingleProductPage")
);
const ElectronicItemPage = lazy(() =>
  import("./Components/Pages/Electronic Item Page/ElectronicItemPage")
);
const DiscountPricePage = lazy(() =>
  import("./Components/Pages/DiscountPricePage/DiscountPricePage")
);
const Policy = lazy(() => import("./Components/Pages/Policy/Policy"));
const TermsAndCondition = lazy(() =>
  import("./Components/Pages/Policy/Terms and condition/TermsAndCondition")
);
const ReturnandRefund = lazy(() =>
  import("./Components/Pages/Policy/Return and Refund Policy/ReturnandRefund")
);
const AboutUs = lazy(() =>
  import("./Components/Pages/Policy/About Us/AboutUs")
);
const UserProfile = lazy(() =>
  import("./Components/Pages/UserProfile/UserProfile")
);
const Cart = lazy(() => import("./Components/Pages/Cart/Cart"));
const CheckOut = lazy(() => import("./Components/Pages/CheckOut/CheckOut"));
const CategoriesPage = lazy(() => import("./CategoriesPage/CategoriesPage"));
const ForgetPassword = lazy(() =>
  import("./Components/Pages/Forget Password/ForgetPassword")
);
const WishList = lazy(() => import("./Components/Pages/WishList/WishList"));
const AdminLoginPage = lazy(() => import("./adminPanel/AdminLoginPage"));
const NotFound = lazy(() => import("./404/404"));
const ContactUs = lazy(() => import("./Components/Pages/ContactUs/ContactUs"));
function App() {
  const userId = Cookies.get("userId");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allPagesData());
    dispatch(allProductData());
    dispatch(homepageData());
    dispatch(deal_of_day_Data());
    dispatch(header_data());
    dispatch(allCategoryData());
    dispatch(getIconsData());
    dispatch(getWebsiteSettingData());
  }, []);
  useEffect(() => {
    dispatch(wishListData(userId));
    dispatch(cartDataHandle(userId));
  }, [userId]);
  useEffect(() => {
    dispatch(homepagePopData(process.env.React_App_Website_Popup_id));
  }, [process.env.React_App_Website_Popup_id]);
  return (
    <BrowserRouter>
      <div className="app">
        <GoToTop />
        <Suspense fallback={<Skeleton count={50} height={30} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:newarrival" element={<ProductPage />} />
            <Route path="/product/:featuredProduct" element={<ProductPage />} />
            <Route
              path="/product/search/:searchData"
              element={<ProductPage />}
            />
            <Route path="/electronicItem" element={<ElectronicItemPage />} />
            <Route path="/discountOffer" element={<DiscountPricePage />} />
            <Route path="/singleProduct/:ID" element={<SingleProductPage />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/termandcondition" element={<TermsAndCondition />} />
            <Route path="/returnandrefund" element={<ReturnandRefund />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/catergoiespage" element={<CategoriesPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
            {/* <Route path='/adminprofile' element={<AdminProfilePage/>}/> */}
          </Routes>
        </Suspense>

        <ToastContainer
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
