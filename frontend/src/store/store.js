import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Slice/cartSlice";
import authSlice from "../Slice/authSlice";
import allPage from "../Slice/pagesSlice";
import allProduct from "../Slice/productSlice";
import wishList from "../Slice/wishListSlice";
import cartSlice from "../Slice/cartSlice";
import homePage from "../Slice/HomeSlice";
import allCategory from "../Slice/categorySlice";
export const store = configureStore({
  reducer: {
    allCart: cartReducer,
    user: authSlice,
    allPages: allPage,
    allProduct: allProduct,
    userWishlist: wishList,
    cart: cartSlice,
    HomePage: homePage,
    category: allCategory,
  },
});
