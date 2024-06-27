import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  category: [],
};
export const allCategoryData = createAsyncThunk("allCategoryData", async () => {
  const { data } = await axios.get(
    `${process.env.React_App_Base_Url + "api/category-fillter"}`
  );
  return data;
});
export const allCategory = createSlice({
  name: "allCategory",
  initialState,
  reducers: {},
  extraReducers: {
    [allCategoryData.fulfilled]: (state, action) => {
      state.category = action.payload;
    },
  },
});
export default allCategory.reducer;
