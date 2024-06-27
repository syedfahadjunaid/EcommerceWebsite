import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  Home: [],
  popup: [],
  dealofday: [],
  headerData: [],
  icons: [],
  websiteData: [],
};
export const homepageData = createAsyncThunk("homepageData", async () => {
  const { data } = await axios.get(
    `${process.env.React_App_Base_Url + "api/home"}`
  );
  // console.log(data, "homepageData");
  return data;
});
export const homepagePopData = createAsyncThunk(
  "homepagePopData",
  async (id) => {
    const { data } = await axios.get(
      `${process.env.React_App_Base_Url + "api/popup/" + id}`
    );
    // console.log(data, "homepage popup");
    return data;
  }
);
export const deal_of_day_Data = createAsyncThunk(
  "deal_of_day_Data",
  async () => {
    const { data } = await axios.get(
      `${process.env.React_App_Base_Url + "api/deal_of_day"}`
    );
    // console.log(data, "deal_of_day_Data");
    return data;
  }
);
export const header_data = createAsyncThunk("header_data", async () => {
  const { data } = await axios.get(
    `${process.env.React_App_Base_Url + "api/header-data"}`
  );
  // console.log(data, "header_data");
  return data;
});
export const getIconsData = createAsyncThunk("getIconsData", async () => {
  const { data } = await axios.get(
    `${process.env.React_App_Base_Url + "api/all-Icons"}`
  );
  // console.log(data, "header_dagetIconsDatata");
  return data;
});
export const getWebsiteSettingData = createAsyncThunk(
  "getWebsiteSettingData",
  async () => {
    const { data } = await axios.get(
      `${process.env.React_App_Base_Url + "api/get-website-setting"}`
    );
    // console.log(data, "header_dagetIconsDatata");
    return data;
  }
);
export const homePage = createSlice({
  name: "homePage",
  initialState,
  reducers: {},
  extraReducers: {
    [homepageData.fulfilled]: (state, action) => {
      state.Home = action.payload;
    },
    [homepagePopData.fulfilled]: (state, action) => {
      state.popup = action.payload;
    },
    [deal_of_day_Data.fulfilled]: (state, action) => {
      state.dealofday = action.payload;
    },
    [header_data.fulfilled]: (state, action) => {
      state.headerData = action.payload;
    },
    [getIconsData.fulfilled]: (state, action) => {
      state.icons = action.payload;
    },
    [getWebsiteSettingData.fulfilled]: (state, action) => {
      state.websiteData = action.payload;
    },
  },
});
export default homePage.reducer;
