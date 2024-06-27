import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  product: [],
};
export const allProductData = createAsyncThunk("allProductData", async () => {
  const { data } = await axios.get(
    `${process.env.React_App_Base_Url + "api/get-all-product"}`
  );
  return data;
});
export const allProduct = createSlice({
  name: "allProduct",
  initialState,
  extraReducers: {
    [allProductData.fulfilled]: (state, action) => {
      state.product = action.payload;
    },
  },
});
export default allProduct.reducer;
