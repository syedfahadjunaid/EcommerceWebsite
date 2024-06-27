import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  wishList: [],
};
export const wishListData=createAsyncThunk('wishlistData',async(id)=>{
    const { data } = await axios.get(
        `${process.env.React_App_Base_Url + "api/get-product-whishlist/"+id}`
      );
      return data;
})
export const wishList=createSlice({
    name:'wishlist',
    initialState,
    extraReducers:{
        [wishListData.fulfilled]:(state,action)=>{
            state.wishList=action.payload
        }
    }
})
export default wishList.reducer