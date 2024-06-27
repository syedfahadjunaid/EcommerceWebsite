import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  pages: [],
};
export const allPagesData = createAsyncThunk("allPagesData", async () => {
  const {data} = await axios.get(
    `${process.env.React_App_Base_Url + "api/pages-title"}`
  );
  console.log(data,'pages')
  return data
});
export const allPage = createSlice({
  name: "allPage",
  initialState,
  reducers: {},
  extraReducers:{
    [allPagesData.fulfilled]:(state,action)=>{
        state.pages=(action.payload)
    }
  }
});

export default allPage.reducer;
