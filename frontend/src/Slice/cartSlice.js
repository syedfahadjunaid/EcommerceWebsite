import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productData from "../productData";
import axios from "axios";
const initialState = {
  cart: [],
  wishlist: localStorage.getItem("wishList")
    ? JSON.parse(localStorage.getItem("wishList"))
    : [],
  items: productData,
  totalQuantity: 0,
  totalPrice: 0,
};
export const cartDataHandle = createAsyncThunk("cartDataHandle", async (id) => {
  const { data } = await axios.get(
    `${process.env.React_App_Base_Url + "api/product-cart/" + id}`
  );
  console.log(data, "cart");
  return data;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCard: (state, action) => {
      let findIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (findIndex >= 0) {
        state.cart[findIndex].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cart));
      // console.log(action.payload)
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItem", JSON.stringify(state.cart));
    },
    increaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      }, localStorage.setItem("cartItem", JSON.stringify(state.cart)));
    },
    decreaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity === 1 ? item.quantity : item.quantity - 1,
          };
        }

        return item;
      }, localStorage.setItem("cartItem", JSON.stringify(state.cart)));
    },
    addToWishList: (state, action) => {
      state.wishlist.push(action.payload);
      localStorage.setItem("wishList", JSON.stringify(state.wishlist));
    },
    removeWishList: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("wishList", JSON.stringify(state.wishlist));
    },
  },
  extraReducers: {
    [cartDataHandle.fulfilled]: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const {
  addToCard,
  getCartTotal,
  removeItem,
  decreaseItemQuantity,
  increaseItemQuantity,
  addToWishList,
  removeWishList,
} = cartSlice.actions;
export default cartSlice.reducer;
