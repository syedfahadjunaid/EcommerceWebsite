import axios from "axios";
const api = axios.create({
  // baseURL: process.env.React_App_Base_Url,
  headers: {
    'Content-Type': 'application/json',
    "Content-Type": "multipart/form-data"
    // Add any other headers if needed
  },
});
export const addFunctionHandle = async (url,formdata) => {
  const data = await api.post(url,formdata);
  return data
};
